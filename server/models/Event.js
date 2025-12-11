const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    theme: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    celebrationHeader: {
        type: String,
        default: 'Upcoming Event'
    },
    eventDate: {
        type: Date,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    prizes: {
        type: String,
        required: true
    },
    posterImage: {
        type: String,
        required: true
    },
    registrationLink: {
        type: String
    },
    websiteLink: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
