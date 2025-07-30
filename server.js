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

// ===== Multer Config for Resume Upload ===== //
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

// ===== Nodemailer Config ===== //
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter error:', error);
  } else {
    console.log('✅ Email transporter is ready');
  }
});

// ===== Contact Form API ===== //
app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields (name, email, message) are required.' });
  }

  try {
    // 1. Mail to Admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // 2. Mail to Sender
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Tanasvi Technologies: Your Message Has Been Received',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to us. We received your message:</p>
        <blockquote>${message.replace(/\n/g, '<br>')}</blockquote>
        <p>We'll get back to you shortly.</p>
        <p>Regards,<br/>Tanasvi Technologies Team</p>
      `,
    });

    res.status(200).json({ message: 'Message sent successfully! Confirmation email sent.' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Authentication error: Check EMAIL_USER and EMAIL_PASS.' });
  }
});

// ===== Career Form API ===== //
app.post('/career', upload.single('resume'), async (req, res) => {
  const { name, email, phone, position, message } = req.body;
  const resumeFile = req.file;

  if (!name || !email || !phone || !position || !resumeFile) {
    return res.status(400).json({ message: 'All fields (name, email, phone, position, resume) are required.' });
  }

  try {
    // 1. Mail to Admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Job Application: ${position} - ${name}`,
      html: `
        <h3>New Job Application</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Position:</strong> ${position}</p>
        ${message ? `<p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>` : ''}
      `,
      attachments: [
        {
          filename: resumeFile.originalname,
          path: resumeFile.path
        }
      ]
    });

    // 2. Mail to Applicant
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Tanasvi Technologies: Your Job Application Has Been Received',
      html: `
        <p>Hi ${name},</p>
        <p>We have received your application for the position of <strong>${position}</strong>.</p>
        <p>Our team will review your profile and get back to you shortly.</p>
        <p>Thank you for your interest in Tanasvi Technologies.</p>
      `,
    });

    res.status(200).json({ message: 'Application submitted successfully! Confirmation email sent.' });
  } catch (error) {
    console.error('Career form error:', error);
    res.status(500).json({ message: 'Failed to submit application. Please check email config or internet connection.' });
  }
});

// ===== Health Check ===== //
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server running fine' });
});

// ===== Start Server ===== //
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
