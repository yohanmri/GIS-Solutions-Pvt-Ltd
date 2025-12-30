const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    company: {
        type: String,
        trim: true
    },
    service: {
        type: String,
        enum: ['mapping', 'analysis', 'remote', 'consulting', 'development', 'data', 'training', 'other', ''],
        default: ''
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied'],
        default: 'new'
    },
    reply: {
        content: String,
        sentAt: Date,
        sentBy: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
