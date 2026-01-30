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
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
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
    showRegisterButton: {
        type: Boolean,
        default: true
    },
    showWebsiteButton: {
        type: Boolean,
        default: true
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
