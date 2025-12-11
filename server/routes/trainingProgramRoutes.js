const express = require('express');
const router = express.Router();
const trainingProgramController = require('../controllers/trainingProgramController');
const { protect } = require('../middleware/auth');

// Admin routes (protected)
router.post('/', protect, trainingProgramController.createProgram);
router.get('/', trainingProgramController.getAllPrograms);
router.get('/:id', trainingProgramController.getProgramById);
router.put('/:id', protect, trainingProgramController.updateProgram);
router.delete('/:id', protect, trainingProgramController.deleteProgram);

module.exports = router;
