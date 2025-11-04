const express = require('express');
const db = require('../db/sqlite');
const { nanoid } = require('nanoid');

const router = express.Router();

// POST /api/track - Track page views
router.post('/', (req, res) => {
  try {
    const { page } = req.body;
    
    if (!page || typeof page !== 'string') {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Page name is required'
      });
    }

    // Get client IP address
    const ip = req.ip || 
               req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
               req.connection?.remoteAddress || 
               'unknown';
    
    // Get user agent
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Insert visit record
    const visitId = nanoid();
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO visits (id, page, ip, userAgent, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `).run(visitId, page, ip, userAgent, createdAt);

    res.status(200).json({
      success: true,
      message: 'Page view tracked',
      timestamp: createdAt
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to track page view'
    });
  }
});

module.exports = router;

