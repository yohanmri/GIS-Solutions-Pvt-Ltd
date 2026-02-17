const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

const upload = require('../middleware/upload');

// Client route (public) - must be before /:id route
router.get('/current', notificationController.getCurrentNotifications);

// Admin routes (temporarily no auth to match other pages)
router.post('/', upload.single('image'), notificationController.createNotification);
router.get('/admin/all', notificationController.getAllNotifications);
router.get('/:id', notificationController.getNotificationById);
router.put('/:id', upload.single('image'), notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;

