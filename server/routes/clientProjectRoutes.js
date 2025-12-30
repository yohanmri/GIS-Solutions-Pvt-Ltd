const express = require('express');
const router = express.Router();
const clientProjectController = require('../controllers/clientProjectController');

// Public routes for client-side (no authentication required)
router.get('/', clientProjectController.getProjects);

module.exports = router;
