const DepartmentalContact = require('../models/DepartmentalContact');

// Get all departmental contacts (admin)
exports.getAllDepartmentalContacts = async (req, res) => {
    try {
        const contacts = await DepartmentalContact.find()
            .sort({ displayOrder: 1, createdAt: 1 });

        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching departmental contacts', error: error.message });
    }
};

// Get active departmental contacts (client)
exports.getActiveDepartmentalContacts = async (req, res) => {
    try {
        const contacts = await DepartmentalContact.find({ isActive: true })
            .sort({ displayOrder: 1, createdAt: 1 })
            .select('-__v');

        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching departmental contacts', error: error.message });
    }
};

// Create departmental contact (admin)
exports.createDepartmentalContact = async (req, res) => {
    try {
        const contact = new DepartmentalContact(req.body);
        await contact.save();

        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: 'Error creating departmental contact', error: error.message });
    }
};

// Update departmental contact (admin)
exports.updateDepartmentalContact = async (req, res) => {
    try {
        const contact = await DepartmentalContact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({ message: 'Departmental contact not found' });
        }

        res.json(contact);
    } catch (error) {
        res.status(400).json({ message: 'Error updating departmental contact', error: error.message });
    }
};

// Delete departmental contact (admin)
exports.deleteDepartmentalContact = async (req, res) => {
    try {
        const contact = await DepartmentalContact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: 'Departmental contact not found' });
        }

        res.json({ message: 'Departmental contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting departmental contact', error: error.message });
    }
};
