const express = require('express');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const { createTransporter, emailTemplates } = require('../config/email');
const db = require('../db/sqlite');
const { nanoid } = require('nanoid');

const router = express.Router();

// Multer configuration for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
    // Ensure uploads directory exists
    const fs = require('fs');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `resume-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed!'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Validation rules for career form
const careerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must be between 10 and 15 characters')
    .matches(/^[\+]?[0-9\s\-\(\)]+$/)
    .withMessage('Please provide a valid phone number'),
  
  body('position')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Position must be between 2 and 100 characters')
    .escape(),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message must not exceed 1000 characters')
    .escape()
];

// POST /api/career/apply
router.post('/apply', upload.single('resume'), careerValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Please check your input data',
        details: errors.array()
      });
    }

    const { name, email, phone, position, message } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({
        error: 'File Required',
        message: 'Resume file is required for job applications'
      });
    }

    // Save application to database
    const applicationId = nanoid();
    const createdAt = new Date().toISOString();
    const resumePath = `/uploads/${resumeFile.filename}`;
    
    try {
      db.prepare(`
        INSERT INTO career_applications (
          id, name, email, phone, position, message, 
          resumePath, resumeFileName, resumeFileSize, resumeMimeType,
          status, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        applicationId,
        name.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        position.trim(),
        message ? message.trim() : null,
        resumePath,
        resumeFile.originalname,
        resumeFile.size,
        resumeFile.mimetype,
        'New',
        createdAt,
        createdAt
      );
    } catch (dbError) {
      console.error('Database error saving career application:', dbError);
      // Continue with email even if DB save fails
    }

    // Create email transporter
    const transporter = createTransporter();

    // Send notification email to HR team
    const notificationEmail = emailTemplates.careerNotification(
      name, email, phone, position, message, resumeFile
    );
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: notificationEmail.subject,
      html: notificationEmail.html,
      attachments: [
        {
          filename: resumeFile.originalname,
          path: resumeFile.path
        }
      ]
    });

    // Send confirmation email to applicant
    const confirmationEmail = emailTemplates.careerConfirmation(name, position);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
    });

    res.status(200).json({
      success: true,
      message: 'Application submitted successfully! You will receive a confirmation email shortly.',
      applicationId: applicationId,
      timestamp: createdAt
    });

  } catch (error) {
    console.error('Career form error:', error);
    
    let errorMessage = 'Failed to submit application. Please try again later.';
    let statusCode = 500;

    if (error.code === 'LIMIT_FILE_SIZE') {
      errorMessage = 'File size too large. Please upload a file smaller than 5MB.';
      statusCode = 400;
    } else if (error.message && error.message.includes('Only PDF, DOC, and DOCX files are allowed')) {
      errorMessage = 'Invalid file type. Please upload a PDF, DOC, or DOCX file.';
      statusCode = 400;
    } else if (error.code === 'EAUTH') {
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
      error: 'Application Error',
      message: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/career/status - Check if career service is available
router.get('/status', (req, res) => {
  res.status(200).json({
    service: 'Career API',
    status: 'Available',
    features: [
      'Job application submission',
      'Resume file upload (PDF, DOC, DOCX)',
      'Email notifications',
      'Input validation',
      'File size limits (5MB max)'
    ],
    supportedFormats: ['PDF', 'DOC', 'DOCX'],
    maxFileSize: '5MB',
    timestamp: new Date().toISOString()
  });
});

// GET /api/career/positions - Get available positions (placeholder for future expansion)
router.get('/positions', (req, res) => {
  res.status(200).json({
    positions: [
      'Software Developer',
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'UI/UX Designer',
      'DevOps Engineer',
      'Data Scientist',
      'AI/ML Engineer',
      'Project Manager',
      'Business Analyst'
    ],
    timestamp: new Date().toISOString()
  });
});

// GET /api/career/applications - Get all career applications (Admin only)
router.get('/applications', (req, res) => {
  try {
    const adminToken = process.env.ADMIN_TOKEN;
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.substring(7).trim() : '';
    
    if (!adminToken) {
      console.error('ADMIN_TOKEN environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error: ADMIN_TOKEN not set' });
    }
    
    if (!token || token !== adminToken) {
      return res.status(401).json({ error: 'Unauthorized: Invalid admin token' });
    }

    // Get query parameters
    const status = req.query.status || '';
    const page = Math.max(parseInt(req.query.page || '1', 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || '20', 10) || 20, 1), 100);
    const offset = (page - 1) * limit;

    // Build query
    let whereClause = '';
    let params = [];
    
    if (status) {
      whereClause = 'WHERE status = ?';
      params.push(status);
    }

    // Get total count
    const countResult = db.prepare(`SELECT COUNT(*) as count FROM career_applications ${whereClause}`).get(...params);
    const total = countResult.count || 0;

    // Get applications
    const applications = db.prepare(`
      SELECT * FROM career_applications 
      ${whereClause}
      ORDER BY createdAt DESC 
      LIMIT ? OFFSET ?
    `).all(...params, limit, offset);

    res.json({
      applications,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// GET /api/career/applications/:id - Get single application
router.get('/applications/:id', (req, res) => {
  try {
    const adminToken = process.env.ADMIN_TOKEN;
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.substring(7).trim() : '';
    
    if (!adminToken || !token || token !== adminToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const application = db.prepare('SELECT * FROM career_applications WHERE id = ?').get(id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
});

// PUT /api/career/applications/:id/status - Update application status
router.put('/applications/:id/status', express.json(), (req, res) => {
  try {
    const adminToken = process.env.ADMIN_TOKEN;
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.substring(7).trim() : '';
    
    if (!adminToken || !token || token !== adminToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['New', 'Reviewed', 'Contacted', 'Rejected', 'Hired'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updatedAt = new Date().toISOString();
    db.prepare('UPDATE career_applications SET status = ?, updatedAt = ? WHERE id = ?').run(status, updatedAt, id);
    
    const updated = db.prepare('SELECT * FROM career_applications WHERE id = ?').get(id);
    res.json(updated);
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Failed to update application status' });
  }
});

// DELETE /api/career/applications/:id - Delete application
router.delete('/applications/:id', (req, res) => {
  try {
    const adminToken = process.env.ADMIN_TOKEN;
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.substring(7).trim() : '';
    
    if (!adminToken || !token || token !== adminToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const application = db.prepare('SELECT * FROM career_applications WHERE id = ?').get(id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Delete from database
    db.prepare('DELETE FROM career_applications WHERE id = ?').run(id);

    // Optionally delete file (uncomment if you want to delete files too)
    // const fs = require('fs');
    // const filePath = path.join(__dirname, '..', '..', application.resumePath.replace('/uploads/', ''));
    // if (fs.existsSync(filePath)) {
    //   fs.unlinkSync(filePath);
    // }

    res.json({ success: true, message: 'Application deleted' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

module.exports = router;
