const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true,
        trim: true
    },
    icon: {
        type: String,
        required: true,
        default: 'share'
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        required: true,
        default: '#2d5f8d'
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SocialLink', socialLinkSchema);
