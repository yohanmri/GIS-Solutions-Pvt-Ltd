const mongoose = require('mongoose');

const professionalServiceSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['mapping', 'analysis', 'remote-sensing', 'consulting', 'development', 'data']
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
        match: /^#[0-9A-F]{6}$/i
    },
    features: [String],
    benefits: [String],
    applications: [String],
    technologies: [String],
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: String  // Store admin ID as string instead of ObjectId reference
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ProfessionalService', professionalServiceSchema);
