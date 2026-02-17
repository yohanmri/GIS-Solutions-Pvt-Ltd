const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    badge: {
        type: String,
        default: 'Upcoming Event'
    },
    image: {
        type: String,
        required: false
    },

    // Service Linking
    serviceType: {
        type: String,
        required: true,
        enum: ['professional', 'event']
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        refPath: 'serviceModel'
    },
    serviceModel: {
        type: String,
        required: false,
        enum: ['ProfessionalService', 'Event']
    },

    // Direct Event Reference (for easier querying)
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },

    // Navigation path when notification is clicked
    navigateTo: {
        type: String,
        default: '/services'
    },

    // Date/Time Configuration
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    displayTimes: [{
        startTime: {
            type: String,
            required: true,
            match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        },
        endTime: {
            type: String,
            required: true,
            match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        }
    }],

    // Action Buttons
    buttons: [{
        label: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: true,
            enum: ['internal', 'external']
        }
    }],

    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
}, {
    timestamps: true
});

// Method to check if notification should be displayed
notificationSchema.methods.shouldDisplay = function () {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Check if current date is within range
    if (now < this.startDate || now > this.endDate) {
        return false;
    }

    // If no time restrictions, show all day
    if (!this.displayTimes || this.displayTimes.length === 0) {
        return true;
    }

    // Check if current time is within any of the display time ranges
    return this.displayTimes.some(timeRange => {
        return currentTime >= timeRange.startTime && currentTime <= timeRange.endTime;
    });
};

module.exports = mongoose.model('Notification', notificationSchema);
