const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middleware/upload');

// Admin routes (no auth for now)
router.post('/', upload.single('projectImage'), projectController.createProject);
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', upload.single('projectImage'), projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
