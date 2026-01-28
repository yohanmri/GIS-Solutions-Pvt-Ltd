const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/login', authController.login);

// Protected routes
router.post('/register', protect, authController.register);
router.put('/change-password', protect, authController.changePassword);
router.get('/me', protect, authController.getMe);

module.exports = router;
