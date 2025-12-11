const express = require('express');
const router = express.Router();
const professionalServiceController = require('../controllers/professionalServiceController');
const { protect } = require('../middleware/auth');

// Admin routes (protected)
router.post('/', protect, professionalServiceController.createService);
router.get('/', professionalServiceController.getAllServices);
router.get('/:id', professionalServiceController.getServiceById);
router.put('/:id', protect, professionalServiceController.updateService);
router.delete('/:id', protect, professionalServiceController.deleteService);

module.exports = router;
