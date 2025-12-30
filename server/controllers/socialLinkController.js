const SocialLink = require('../models/SocialLink');

// Get all social links (admin)
exports.getAllSocialLinks = async (req, res) => {
    try {
        const links = await SocialLink.find()
            .sort({ displayOrder: 1, createdAt: 1 });

        res.json(links);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching social links', error: error.message });
    }
};

// Get active social links (client)
exports.getActiveSocialLinks = async (req, res) => {
    try {
        const links = await SocialLink.find({ isActive: true })
            .sort({ displayOrder: 1, createdAt: 1 })
            .select('-__v');

        res.json(links);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching social links', error: error.message });
    }
};

// Create social link (admin)
exports.createSocialLink = async (req, res) => {
    try {
        const link = new SocialLink(req.body);
        await link.save();

        res.status(201).json(link);
    } catch (error) {
        res.status(400).json({ message: 'Error creating social link', error: error.message });
    }
};

// Update social link (admin)
exports.updateSocialLink = async (req, res) => {
    try {
        const link = await SocialLink.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!link) {
            return res.status(404).json({ message: 'Social link not found' });
        }

        res.json(link);
    } catch (error) {
        res.status(400).json({ message: 'Error updating social link', error: error.message });
    }
};

// Delete social link (admin)
exports.deleteSocialLink = async (req, res) => {
    try {
        const link = await SocialLink.findByIdAndDelete(req.params.id);

        if (!link) {
            return res.status(404).json({ message: 'Social link not found' });
        }

        res.json({ message: 'Social link deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting social link', error: error.message });
    }
};
