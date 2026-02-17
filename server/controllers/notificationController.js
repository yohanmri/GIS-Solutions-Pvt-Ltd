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
        // Parse JSON fields if they were sent as strings (from FormData)
        const parsedBody = { ...req.body };

        // Handle buttons - check if it's already an object or needs parsing
        if (parsedBody.buttons) {
            if (typeof parsedBody.buttons === 'string') {
                try {
                    parsedBody.buttons = JSON.parse(parsedBody.buttons);
                } catch (e) {
                    console.error('Error parsing buttons:', e);
                    parsedBody.buttons = [];
                }
            }
        }

        // Handle displayTimes - check if it's already an array or needs parsing
        if (parsedBody.displayTimes) {
            if (typeof parsedBody.displayTimes === 'string') {
                try {
                    parsedBody.displayTimes = JSON.parse(parsedBody.displayTimes);
                } catch (e) {
                    console.error('Error parsing displayTimes:', e);
                    parsedBody.displayTimes = [];
                }
            }
        }

        // Map serviceType to serviceModel
        const serviceModelMap = {
            'professional': 'ProfessionalService',
            'event': 'Event'
        };

        const notificationData = {
            ...parsedBody,
            serviceModel: serviceModelMap[parsedBody.serviceType]
        };

        // Handle image upload
        if (req.file) {
            notificationData.image = `/uploads/${req.file.filename}`;
        }

        // Only add createdBy if admin is authenticated
        if (req.admin && req.admin._id) {
            notificationData.createdBy = req.admin._id;
        }

        // If serviceType is event, set eventId and navigateTo
        if (parsedBody.serviceType === 'event' && parsedBody.serviceId) {
            notificationData.eventId = parsedBody.serviceId;
            notificationData.navigateTo = `/services?event=${parsedBody.serviceId}`;
        }

        const notification = new Notification(notificationData);
        await notification.save();

        res.status(201).json(notification);
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(400).json({ message: 'Error creating notification', error: error.message });
    }
};

// Update notification
exports.updateNotification = async (req, res) => {
    try {
        // Parse JSON fields if they were sent as strings (from FormData)
        const parsedBody = { ...req.body };

        // Handle buttons - check if it's already an object or needs parsing
        if (parsedBody.buttons) {
            if (typeof parsedBody.buttons === 'string') {
                try {
                    parsedBody.buttons = JSON.parse(parsedBody.buttons);
                } catch (e) {
                    console.error('Error parsing buttons:', e);
                    parsedBody.buttons = [];
                }
            }
        }

        // Handle displayTimes - check if it's already an array or needs parsing
        if (parsedBody.displayTimes) {
            if (typeof parsedBody.displayTimes === 'string') {
                try {
                    parsedBody.displayTimes = JSON.parse(parsedBody.displayTimes);
                } catch (e) {
                    console.error('Error parsing displayTimes:', e);
                    parsedBody.displayTimes = [];
                }
            }
        }

        // Map serviceType to serviceModel if serviceType is being updated
        if (parsedBody.serviceType) {
            const serviceModelMap = {
                'professional': 'ProfessionalService',
                'event': 'Event'
            };
            parsedBody.serviceModel = serviceModelMap[parsedBody.serviceType];

            // If serviceType is event, set eventId and navigateTo
            if (parsedBody.serviceType === 'event' && parsedBody.serviceId) {
                parsedBody.eventId = parsedBody.serviceId;
                parsedBody.navigateTo = `/services?event=${parsedBody.serviceId}`;
            }
        }

        // Handle image upload
        if (req.file) {
            parsedBody.image = `/uploads/${req.file.filename}`;
        }

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            parsedBody,
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
