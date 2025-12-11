const Event = require('../models/Event');

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({ isActive: true })
            .sort({ eventDate: -1 });

        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
};

// Get single event
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error: error.message });
    }
};

// Create event
exports.createEvent = async (req, res) => {
    try {
        const eventData = {
            ...req.body,
            createdBy: req.admin._id
        };

        const event = new Event(eventData);
        await event.save();

        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: 'Error creating event', error: error.message });
    }
};

// Update event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        res.status(400).json({ message: 'Error updating event', error: error.message });
    }
};

// Delete event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
};
