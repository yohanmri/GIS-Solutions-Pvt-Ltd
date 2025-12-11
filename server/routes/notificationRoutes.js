const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

// Admin routes (protected)
router.post('/', protect, notificationController.createNotification);
router.get('/admin/all', protect, notificationController.getAllNotifications);
router.get('/:id', protect, notificationController.getNotificationById);
router.put('/:id', protect, notificationController.updateNotification);
router.delete('/:id', protect, notificationController.deleteNotification);

// Client route (public)
router.get('/current', notificationController.getCurrentNotifications);

module.exports = router;
