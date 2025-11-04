const express = require('express');
const db = require('../db/sqlite');

const router = express.Router();

// GET /api/analytics - Get all visits (mounted at /api/analytics)
router.get('/', (req, res) => {
  try {
    const visits = db.prepare(`
      SELECT id, page, ip, userAgent, createdAt
      FROM visits
      ORDER BY createdAt DESC
      LIMIT 1000
    `).all();

    // Map id to _id for frontend compatibility
    const mappedVisits = visits.map(visit => ({
      _id: visit.id,
      page: visit.page,
      ip: visit.ip,
      userAgent: visit.userAgent,
      createdAt: visit.createdAt
    }));

    res.status(200).json({
      success: true,
      items: mappedVisits,
      count: mappedVisits.length
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch analytics data'
    });
  }
});

// GET /api/analytics/summary - Get analytics summary
router.get('/summary', (req, res) => {
  try {
    // Get total visits
    const totalResult = db.prepare('SELECT COUNT(*) as count FROM visits').get();
    const total = totalResult?.count || 0;

    // Get top pages
    const topPages = db.prepare(`
      SELECT page as _id, COUNT(*) as count
      FROM visits
      GROUP BY page
      ORDER BY count DESC
      LIMIT 10
    `).all();

    res.status(200).json({
      success: true,
      total,
      topPages
    });
  } catch (error) {
    console.error('Analytics summary error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch analytics summary'
    });
  }
});

module.exports = router;

