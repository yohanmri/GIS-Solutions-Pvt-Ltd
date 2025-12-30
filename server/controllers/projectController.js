const Project = require('../models/Project');

// Get all projects (admin - includes inactive)
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .sort({ createdAt: -1 });

        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error: error.message });
    }
};

// Get single project
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project', error: error.message });
    }
};

// Create project
exports.createProject = async (req, res) => {
    try {
        const projectData = {
            ...req.body,
            createdBy: 'admin' // Default for now, no auth
        };

        // If file was uploaded, add the file path
        if (req.file) {
            projectData.image = `/uploads/projects/${req.file.filename}`;
        }

        const project = new Project(projectData);
        await project.save();

        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: 'Error creating project', error: error.message });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    try {
        const updateData = { ...req.body };

        // If file was uploaded, add the file path
        if (req.file) {
            updateData.image = `/uploads/projects/${req.file.filename}`;
        }

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        res.status(400).json({ message: 'Error updating project', error: error.message });
    }
};

// Delete project (soft delete)
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error: error.message });
    }
};
