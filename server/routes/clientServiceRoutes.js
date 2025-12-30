const express = require('express');
const router = express.Router();
const clientServiceController = require('../controllers/clientServiceController');

// Public routes for client-side (no authentication required)
router.get('/professional', clientServiceController.getProfessionalServices);
router.get('/events', clientServiceController.getEvents);

module.exports = router;
