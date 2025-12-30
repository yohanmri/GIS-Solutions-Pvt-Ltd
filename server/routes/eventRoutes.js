const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const upload = require('../middleware/upload');

// Admin routes (no auth for now)
router.post('/', upload.single('posterImage'), eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', upload.single('posterImage'), eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
