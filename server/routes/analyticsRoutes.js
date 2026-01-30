const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

// Public route - track page view
router.post('/track', analyticsController.trackPageView);

// Admin routes - require authentication
router.get('/dashboard-stats', protect, analyticsController.getDashboardStats);
router.get('/visitors', protect, analyticsController.getVisitors);
router.get('/trends', protect, analyticsController.getVisitorTrends);

module.exports = router;
