const express = require('express');
const router = express.Router();
const professionalServiceController = require('../controllers/professionalServiceController');

// Admin routes (no auth for now)
router.post('/', professionalServiceController.createService);
router.get('/', professionalServiceController.getAllServices);
router.get('/:id', professionalServiceController.getServiceById);
router.put('/:id', professionalServiceController.updateService);
router.delete('/:id', professionalServiceController.deleteService);

module.exports = router;
