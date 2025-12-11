const TrainingProgram = require('../models/TrainingProgram');

// Get all training programs
exports.getAllPrograms = async (req, res) => {
    try {
        const { level } = req.query;
        const query = { isActive: true };

        if (level && level !== 'all') {
            query.level = level;
        }

        const programs = await TrainingProgram.find(query)
            .sort({ createdAt: -1 });

        res.json(programs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching programs', error: error.message });
    }
};

// Get single training program
exports.getProgramById = async (req, res) => {
    try {
        const program = await TrainingProgram.findById(req.params.id);

        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }

        res.json(program);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching program', error: error.message });
    }
};

// Create training program
exports.createProgram = async (req, res) => {
    try {
        const programData = {
            ...req.body,
            createdBy: req.admin._id
        };

        const program = new TrainingProgram(programData);
        await program.save();

        res.status(201).json(program);
    } catch (error) {
        res.status(400).json({ message: 'Error creating program', error: error.message });
    }
};

// Update training program
exports.updateProgram = async (req, res) => {
    try {
        const program = await TrainingProgram.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }

        res.json(program);
    } catch (error) {
        res.status(400).json({ message: 'Error updating program', error: error.message });
    }
};

// Delete training program
exports.deleteProgram = async (req, res) => {
    try {
        const program = await TrainingProgram.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }

        res.json({ message: 'Program deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting program', error: error.message });
    }
};
