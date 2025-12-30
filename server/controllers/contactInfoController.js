const ContactInfo = require('../models/ContactInfo');

// Get contact information
exports.getContactInfo = async (req, res) => {
    try {
        let contactInfo = await ContactInfo.findOne({ isActive: true });

        // If no contact info exists, create default one
        if (!contactInfo) {
            contactInfo = new ContactInfo({});
            await contactInfo.save();
        }

        res.json(contactInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contact information', error: error.message });
    }
};

// Update contact information
exports.updateContactInfo = async (req, res) => {
    try {
        let contactInfo = await ContactInfo.findOne({ isActive: true });

        if (!contactInfo) {
            contactInfo = new ContactInfo(req.body);
        } else {
            Object.assign(contactInfo, req.body);
        }

        await contactInfo.save();
        res.json(contactInfo);
    } catch (error) {
        res.status(400).json({ message: 'Error updating contact information', error: error.message });
    }
};
