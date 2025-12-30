const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        default: 'GIS Solutions (Pvt) Ltd'
    },
    address: {
        type: String,
        required: true,
        default: '370 Galle - Colombo Rd, Colombo 00300'
    },
    hotline: {
        type: String,
        required: true,
        default: '+0112 575 297'
    },
    mobile: {
        type: String,
        required: true,
        default: '+94 77 525 5133'
    },
    email: {
        type: String,
        required: true,
        default: 'info@gislk.com'
    },
    website: {
        type: String,
        required: true,
        default: 'https://www.gislk.com'
    },
    mapUrl: {
        type: String,
        default: 'https://maps.app.goo.gl/example'
    },
    businessHours: {
        weekdays: {
            type: String,
            default: '8:30 AM - 5:00 PM'
        },
        saturday: {
            type: String,
            default: '8:30 AM - 1:00 PM'
        },
        sunday: {
            type: String,
            default: 'Closed'
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
