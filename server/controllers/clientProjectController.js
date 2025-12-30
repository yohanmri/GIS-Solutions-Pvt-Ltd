const Project = require('../models/Project');

// Get all active projects (public)
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ isActive: true })
            .sort({ year: -1, createdAt: -1 })
            .select('-createdBy -__v');

        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error: error.message });
    }
};
