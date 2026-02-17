const EmailConfig = require('../models/EmailConfig');

// Get active email configuration
exports.getEmailConfig = async (req, res) => {
    try {
        let emailConfig = await EmailConfig.findOne({ isActive: true });

        // If no config exists, create default one
        if (!emailConfig) {
            emailConfig = new EmailConfig({
                recipientEmail: 'info@gislk.com',
                ccEmails: [],
                isActive: true
            });
            await emailConfig.save();
        }

        res.json(emailConfig);
    } catch (error) {
        console.error('Error fetching email config:', error);
        res.status(500).json({
            message: 'Error fetching email configuration',
            error: error.message
        });
    }
};

// Update email configuration (recipient email and description)
exports.updateEmailConfig = async (req, res) => {
    try {
        const { recipientEmail, description } = req.body;

        let emailConfig = await EmailConfig.findOne({ isActive: true });

        if (!emailConfig) {
            emailConfig = new EmailConfig({
                recipientEmail,
                description,
                isActive: true
            });
        } else {
            if (recipientEmail) emailConfig.recipientEmail = recipientEmail;
            if (description !== undefined) emailConfig.description = description;
        }

        await emailConfig.save();
        res.json(emailConfig);
    } catch (error) {
        console.error('Error updating email config:', error);
        res.status(400).json({
            message: 'Error updating email configuration',
            error: error.message
        });
    }
};

// Add CC email address
exports.addCcEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email address is required' });
        }

        // Validate email format
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email address format' });
        }

        let emailConfig = await EmailConfig.findOne({ isActive: true });

        if (!emailConfig) {
            emailConfig = new EmailConfig({
                recipientEmail: 'info@gislk.com',
                ccEmails: [email.toLowerCase().trim()],
                isActive: true
            });
        } else {
            // Check if email already exists in CC list
            const normalizedEmail = email.toLowerCase().trim();
            if (emailConfig.ccEmails.includes(normalizedEmail)) {
                return res.status(400).json({ message: 'Email already exists in CC list' });
            }

            emailConfig.ccEmails.push(normalizedEmail);
        }

        await emailConfig.save();
        res.json(emailConfig);
    } catch (error) {
        console.error('Error adding CC email:', error);
        res.status(400).json({
            message: 'Error adding CC email',
            error: error.message
        });
    }
};

// Remove CC email address
exports.removeCcEmail = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: 'Email address is required' });
        }

        let emailConfig = await EmailConfig.findOne({ isActive: true });

        if (!emailConfig) {
            return res.status(404).json({ message: 'Email configuration not found' });
        }

        const normalizedEmail = email.toLowerCase().trim();
        emailConfig.ccEmails = emailConfig.ccEmails.filter(
            ccEmail => ccEmail !== normalizedEmail
        );

        await emailConfig.save();
        res.json(emailConfig);
    } catch (error) {
        console.error('Error removing CC email:', error);
        res.status(400).json({
            message: 'Error removing CC email',
            error: error.message
        });
    }
};

// Delete entire email configuration (reset to default)
exports.deleteEmailConfig = async (req, res) => {
    try {
        await EmailConfig.deleteMany({});

        // Create new default configuration
        const defaultConfig = new EmailConfig({
            recipientEmail: 'info@gislk.com',
            ccEmails: [],
            isActive: true
        });
        await defaultConfig.save();

        res.json({
            message: 'Email configuration reset to default',
            config: defaultConfig
        });
    } catch (error) {
        console.error('Error deleting email config:', error);
        res.status(500).json({
            message: 'Error deleting email configuration',
            error: error.message
        });
    }
};
