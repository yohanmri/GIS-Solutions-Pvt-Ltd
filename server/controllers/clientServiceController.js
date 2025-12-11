const ProfessionalService = require('../models/ProfessionalService');
const TrainingProgram = require('../models/TrainingProgram');
const Event = require('../models/Event');

// Get all active professional services (public)
exports.getProfessionalServices = async (req, res) => {
    try {
        const services = await ProfessionalService.find({ isActive: true })
            .sort({ createdAt: -1 })
            .select('-createdBy -__v');

        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error: error.message });
    }
};

// Get all active training programs (public)
exports.getTrainingPrograms = async (req, res) => {
    try {
        const { level } = req.query;
        const query = { isActive: true };

        if (level && level !== 'all') {
            query.level = level;
        }

        const programs = await TrainingProgram.find(query)
            .sort({ createdAt: -1 })
            .select('-createdBy -__v');

        res.json(programs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching programs', error: error.message });
    }
};

// Get all active events (public)
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ isActive: true })
            .sort({ eventDate: -1 })
            .select('-createdBy -__v');

        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
};
