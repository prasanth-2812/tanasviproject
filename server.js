require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ===== Multer Config for /career form resume upload ===== //
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) && allowedTypes.test(file.mimetype);
    isValid ? cb(null, true) : cb(new Error('Only PDF, DOC, and DOCX files are allowed!'));
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// ===== Nodemailer Transporter ===== //
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transport
transporter.verify((error, success) => {
  if (error) console.error('Nodemailer error:', error);
  else console.log('Nodemailer is ready to send emails.');
});

// ===== Contact Form: POST /send ===== //
app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields (name, email, message) are required.' });
  }

  try {
    // 1. Mail to Website Owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <p>You have received a new message from your website contact form.</p>
        <h3>Contact Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <br>
        <small>This email was sent from your website's backend.</small>
      `,
    });

    // 2. Confirmation Mail to User
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Tanasvi Technologies: Your Message Has Been Received',
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for contacting Tanasvi Technologies Pvt Ltd. We have received your message and appreciate you reaching out. We will get back to you as soon as possible.</p>
        <p>Here is a copy of your message:</p>
        <blockquote style="border-left: 4px solid #ccc; margin: 0; padding: 0 1em; color: #666;">
          <p>${message.replace(/\n/g, '<br>')}</p>
        </blockquote>
        <p>Best regards,<br/>The Tanasvi Technologies Team</p>
      `,
    });

    res.status(200).json({ message: 'Message sent successfully! You will receive a confirmation email shortly.' });
  } catch (error) {
    console.error('Email error:', error);
    let errorMessage = 'Failed to send message. Please try again later.';

    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication error: Check EMAIL_USER and EMAIL_PASS.';
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKET') {
      errorMessage = 'Connection issue with email server.';
    } else if (error.code === 'EENVELOPE' || error.responseCode === 550) {
      errorMessage = 'Invalid sender/recipient email address.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(500).json({ message: errorMessage });
  }
});

// ===== Career Form: POST /career ===== //
app.post('/career', upload.single('resume'), async (req, res) => {
  const { name, email, phone, position, message } = req.body;
  const resumeFile = req.file;

  if (!name || !email || !phone || !position || !resumeFile) {
    return res.status(400).json({ message: 'All fields (name, email, phone, position, resume) are required.' });
  }

  try {
    // 1. Mail to Owner with Attachment
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Job Application: ${position} - ${name}`,
      html: `
        <p>You have received a new job application from your website.</p>
        <h3>Applicant Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Position:</strong> ${position}</li>
        </ul>
        ${message ? `<h3>Message:</h3><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
        <br><small>This application was submitted through your website's career form.</small>
      `,
      attachments: [
        {
          filename: resumeFile.originalname,
          path: resumeFile.path
        }
      ]
    });

    // 2. Confirmation Mail to Applicant
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Tanasvi Technologies: Your Job Application Has Been Received',
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for applying for the <strong>${position}</strong> position at Tanasvi Technologies Pvt Ltd. We have received your application and appreciate your interest.</p>
        <p>Our HR team will review your resume and contact you if your profile matches our requirements.</p>
        <p>Submitted on: <strong>${new Date().toLocaleDateString()}</strong></p>
        <p>Best regards,<br/>The Tanasvi HR Team</p>
      `,
    });

    res.status(200).json({ message: 'Application submitted successfully! You will receive a confirmation email shortly.' });
  } catch (error) {
    console.error('Career form email error:', error);
    let errorMessage = 'Failed to submit application. Please try again later.';

    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication error: Invalid credentials.';
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKET') {
      errorMessage = 'Email server timeout.';
    } else if (error.code === 'EENVELOPE' || error.responseCode === 550) {
      errorMessage = 'Invalid email address.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(500).json({ message: errorMessage });
  }
});

// ===== Health Check Endpoint ===== //
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// ===== Start Server ===== //
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health Check: http://localhost:${PORT}/health`);
});
