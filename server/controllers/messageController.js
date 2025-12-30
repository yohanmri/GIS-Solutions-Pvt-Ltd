const Message = require('../models/Message');
const emailService = require('../services/emailService');

// Get all messages (admin)
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({ isActive: true })
            .sort({ createdAt: -1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
};

// Get single message (admin)
exports.getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.json(message);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching message', error: error.message });
    }
};

// Create message (client) - with email notification
exports.createMessage = async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();

        // Send notification email to admin
        try {
            await emailService.sendNewMessageNotification(req.body);
            // Send confirmation email to user
            await emailService.sendConfirmationEmail(req.body);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the request if email fails
        }

        res.status(201).json({
            message: 'Message sent successfully',
            data: message
        });
    } catch (error) {
        res.status(400).json({ message: 'Error sending message', error: error.message });
    }
};

// Update message status (admin)
exports.updateMessageStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.json(message);
    } catch (error) {
        res.status(400).json({ message: 'Error updating message status', error: error.message });
    }
};

// Reply to message (admin) - with email sending
exports.replyToMessage = async (req, res) => {
    try {
        const { replyContent } = req.body;

        console.log('Reply request received:', {
            messageId: req.params.id,
            replyContent: replyContent,
            bodyKeys: Object.keys(req.body)
        });

        // Validation
        if (!replyContent || !replyContent.trim()) {
            return res.status(400).json({
                message: 'Reply content is required',
                error: 'replyContent field is empty or missing'
            });
        }

        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        console.log('Sending reply email to:', message.email);

        // Send reply email
        await emailService.sendReplyEmail(message, replyContent);

        // Update message with reply
        message.reply = {
            content: replyContent,
            sentAt: new Date(),
            sentBy: 'admin' // TODO: Use actual admin user when auth is implemented
        };
        message.status = 'replied';
        await message.save();

        console.log('Reply sent successfully');

        res.json({
            message: 'Reply sent successfully',
            data: message
        });
    } catch (error) {
        console.error('Error in replyToMessage:', error);
        res.status(400).json({ message: 'Error sending reply', error: error.message });
    }
};

// Delete message (admin)
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting message', error: error.message });
    }
};
