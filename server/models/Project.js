const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    client: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    challenge: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    impact: {
        type: [String],
        default: []
    },
    image: {
        type: String,
        required: true
    },
    dashboardImage: {
        type: String
    },
    technologies: {
        type: [String],
        default: []
    },
    year: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Government', 'Municipal', 'Utilities', 'Agriculture', 'Private', 'NGO', 'Other']
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

module.exports = mongoose.model('Project', projectSchema);
