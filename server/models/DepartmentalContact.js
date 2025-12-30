const mongoose = require('mongoose');

const departmentalContactSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true,
        trim: true
    },
    icon: {
        type: String,
        required: true,
        default: 'organization'
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: true
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

module.exports = mongoose.model('DepartmentalContact', departmentalContactSchema);
