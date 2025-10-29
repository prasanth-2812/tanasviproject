const express = require('express');
const { body, validationResult } = require('express-validator');
const { createTransporter, emailTemplates } = require('../config/email');

const router = express.Router();

// Validation rules for contact form
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z0-9\s\-\'\.]+$/)
    .withMessage('Name can only contain letters, numbers, spaces, hyphens, apostrophes, and periods'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
    .escape()
];

// POST /api/contact/send
router.post('/send', contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Get the first error message for better user experience
      const firstError = errors.array()[0];
      return res.status(400).json({
        error: 'Validation Error',
        message: firstError.msg || 'Please check your input data',
        details: errors.array()
      });
    }

    const { name, email, message } = req.body;

    // Create email transporter
    const transporter = createTransporter();

    // Send notification email to company
    const notificationEmail = emailTemplates.contactNotification(name, email, message);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: notificationEmail.subject,
      html: notificationEmail.html,
    });

    // Send confirmation email to user
    const confirmationEmail = emailTemplates.contactConfirmation(name, message);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
    });

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! You will receive a confirmation email shortly.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    let errorMessage = 'Failed to send message. Please try again later.';
    let statusCode = 500;

    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please contact support.';
      statusCode = 503;
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKET') {
      errorMessage = 'Email service temporarily unavailable. Please try again later.';
      statusCode = 503;
    } else if (error.code === 'EENVELOPE' || error.responseCode === 550) {
      errorMessage = 'Invalid email address. Please check your email and try again.';
      statusCode = 400;
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(statusCode).json({
      error: 'Email Service Error',
      message: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/contact/status - Check if contact service is available
router.get('/status', (req, res) => {
  res.status(200).json({
    service: 'Contact API',
    status: 'Available',
    features: [
      'Contact form submission',
      'Email notifications',
      'Input validation',
      'Rate limiting'
    ],
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
