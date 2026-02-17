const mongoose = require('mongoose');

const emailConfigSchema = new mongoose.Schema({
    recipientEmail: {
        type: String,
        required: true,
        default: 'info@gislk.com',
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    ccEmails: [{
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        default: 'Email configuration for contact form submissions'
    }
}, {
    timestamps: true
});

// Ensure only one active configuration exists
emailConfigSchema.pre('save', async function (next) {
    if (this.isActive) {
        await this.constructor.updateMany(
            { _id: { $ne: this._id } },
            { isActive: false }
        );
    }
    next();
});

module.exports = mongoose.model('EmailConfig', emailConfigSchema);
