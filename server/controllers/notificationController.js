const Notification = require('../models/Notification');

// Get all notifications (admin)
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find()
            .sort({ createdAt: -1 })
            .populate('serviceId')
            .populate('createdBy', 'name email');

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
};

// Get current active notifications (client-side)
exports.getCurrentNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ isActive: true })
            .populate('serviceId');

        // Filter notifications that should be displayed based on date/time
        const activeNotifications = notifications.filter(notification =>
            notification.shouldDisplay()
        );

        res.json(activeNotifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching current notifications', error: error.message });
    }
};

// Get single notification
exports.getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id)
            .populate('serviceId')
            .populate('createdBy', 'name email');

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notification', error: error.message });
    }
};

// Create notification
exports.createNotification = async (req, res) => {
    try {
        // Map serviceType to serviceModel
        const serviceModelMap = {
            'professional': 'ProfessionalService',
            'event': 'Event'
        };

        const notificationData = {
            ...req.body,
            serviceModel: serviceModelMap[req.body.serviceType],
            createdBy: req.admin._id
        };

        const notification = new Notification(notificationData);
        await notification.save();

        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: 'Error creating notification', error: error.message });
    }
};

// Update notification
exports.updateNotification = async (req, res) => {
    try {
        // Map serviceType to serviceModel if serviceType is being updated
        if (req.body.serviceType) {
            const serviceModelMap = {
                'professional': 'ProfessionalService',
                'event': 'Event'
            };
            req.body.serviceModel = serviceModelMap[req.body.serviceType];
        }

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.json(notification);
    } catch (error) {
        res.status(400).json({ message: 'Error updating notification', error: error.message });
    }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notification', error: error.message });
    }
};
