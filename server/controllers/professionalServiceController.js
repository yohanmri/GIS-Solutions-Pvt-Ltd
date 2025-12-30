const ProfessionalService = require('../models/ProfessionalService');

// Get all professional services
exports.getAllServices = async (req, res) => {
    try {
        const services = await ProfessionalService.find({ isActive: true })
            .sort({ createdAt: -1 });

        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error: error.message });
    }
};

// Get single professional service
exports.getServiceById = async (req, res) => {
    try {
        const service = await ProfessionalService.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service', error: error.message });
    }
};

// Create professional service
exports.createService = async (req, res) => {
    try {
        const serviceData = {
            ...req.body,
            createdBy: 'admin' // Default for now, no auth
        };

        const service = new ProfessionalService(serviceData);
        await service.save();

        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ message: 'Error creating service', error: error.message });
    }
};

// Update professional service
exports.updateService = async (req, res) => {
    try {
        const service = await ProfessionalService.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json(service);
    } catch (error) {
        res.status(400).json({ message: 'Error updating service', error: error.message });
    }
};

// Delete professional service
exports.deleteService = async (req, res) => {
    try {
        const service = await ProfessionalService.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service', error: error.message });
    }
};
