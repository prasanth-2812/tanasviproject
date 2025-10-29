const nodemailer = require('nodemailer');

// Email configuration
const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Verify transporter configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ Email configuration error:', error.message);
      console.error('Please check your EMAIL_USER, EMAIL_PASS, and EMAIL_HOST environment variables');
    } else {
      console.log('✅ Email service is ready to send emails');
    }
  });

  return transporter;
};

// Email templates
const emailTemplates = {
  contactNotification: (name, email, message) => ({
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3c72fc;">New Contact Form Submission</h2>
        <p>You have received a new message from your website contact form.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 10px 0;"><strong>Name:</strong> ${name}</li>
            <li style="margin: 10px 0;"><strong>Email:</strong> ${email}</li>
          </ul>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #3c72fc; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #888; font-size: 12px;">
          This email was sent from your website's backend API.<br>
          Timestamp: ${new Date().toLocaleString()}
        </p>
      </div>
    `
  }),

  contactConfirmation: (name, message) => ({
    subject: 'Tanasvi Technologies: Your Message Has Been Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3c72fc; margin: 0;">Tanasvi Technologies</h1>
          <p style="color: #666; margin: 5px 0;">Innovative IT Solutions</p>
        </div>
        
        <h2 style="color: #333;">Thank You for Contacting Us!</h2>
        
        <p>Dear ${name},</p>
        
        <p>Thank you for contacting Tanasvi Technologies Pvt Ltd. We have received your message and appreciate you reaching out. Our team will review your inquiry and get back to you as soon as possible.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
          <blockquote style="border-left: 4px solid #3c72fc; margin: 0; padding: 0 1em; color: #666; font-style: italic;">
            <p>${message.replace(/\n/g, '<br>')}</p>
          </blockquote>
        </div>
        
        <p>We typically respond within 24 hours during business days. If you have any urgent inquiries, please feel free to call us at <strong>+91-9392562193</strong>.</p>
        
        <div style="background-color: #3c72fc; color: white; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
          <h3 style="margin: 0 0 10px 0;">Ready to Transform Your Business?</h3>
          <p style="margin: 0;">Visit our website to learn more about our services</p>
        </div>
        
        <p>Best regards,<br>
        <strong>The Tanasvi Technologies Team</strong></p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #888; font-size: 12px; text-align: center;">
          Tanasvi Technologies Pvt Ltd<br>
          Sunrise Startup Towers, Madhurawada, IT SEZ, Hill No:3<br>
          Visakhapatnam-48, Andhra Pradesh, India<br>
          Email: info@tanasvi.com | Phone: +91-9392562193
        </p>
      </div>
    `
  }),

  careerNotification: (name, email, phone, position, message, resumeFile) => ({
    subject: `New Job Application: ${position} - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3c72fc;">New Job Application Received</h2>
        <p>You have received a new job application from your website.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Applicant Details:</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 10px 0;"><strong>Name:</strong> ${name}</li>
            <li style="margin: 10px 0;"><strong>Email:</strong> ${email}</li>
            <li style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</li>
            <li style="margin: 10px 0;"><strong>Position:</strong> ${position}</li>
            <li style="margin: 10px 0;"><strong>Resume:</strong> ${resumeFile ? resumeFile.originalname : 'No resume attached'}</li>
          </ul>
        </div>
        
        ${message ? `
        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #3c72fc; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Additional Message:</h3>
          <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #888; font-size: 12px;">
          This application was submitted through your website's career form.<br>
          Timestamp: ${new Date().toLocaleString()}
        </p>
      </div>
    `
  }),

  careerConfirmation: (name, position) => ({
    subject: 'Tanasvi Technologies: Your Job Application Has Been Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3c72fc; margin: 0;">Tanasvi Technologies</h1>
          <p style="color: #666; margin: 5px 0;">Join Our Innovative Team</p>
        </div>
        
        <h2 style="color: #333;">Application Received Successfully!</h2>
        
        <p>Dear ${name},</p>
        
        <p>Thank you for applying for the <strong>${position}</strong> position at Tanasvi Technologies Pvt Ltd. We have received your application and appreciate your interest in joining our team.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">What's Next?</h3>
          <ul style="color: #555; line-height: 1.6;">
            <li>Our HR team will review your resume and qualifications</li>
            <li>If your profile matches our requirements, we'll contact you for the next steps</li>
            <li>We typically review applications within 5-7 business days</li>
            <li>You'll receive updates via email or phone</li>
          </ul>
        </div>
        
        <p><strong>Application Details:</strong></p>
        <ul style="color: #555;">
          <li>Position Applied: ${position}</li>
          <li>Submitted on: ${new Date().toLocaleDateString()}</li>
          <li>Application ID: #${Date.now().toString().slice(-6)}</li>
        </ul>
        
        <div style="background-color: #3c72fc; color: white; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
          <h3 style="margin: 0 0 10px 0;">Why Choose Tanasvi?</h3>
          <p style="margin: 0;">Innovative projects, growth opportunities, and a collaborative work environment</p>
        </div>
        
        <p>Best regards,<br>
        <strong>The Tanasvi HR Team</strong></p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #888; font-size: 12px; text-align: center;">
          Tanasvi Technologies Pvt Ltd<br>
          Sunrise Startup Towers, Madhurawada, IT SEZ, Hill No:3<br>
          Visakhapatnam-48, Andhra Pradesh, India<br>
          Email: careers@tanasvi.com | Phone: +91-9392562193
        </p>
      </div>
    `
  })
};

module.exports = {
  createTransporter,
  emailTemplates
};
