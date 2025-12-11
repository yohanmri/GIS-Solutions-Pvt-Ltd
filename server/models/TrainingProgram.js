const mongoose = require('mongoose');

const trainingProgramSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['WEB COURSE', 'INSTRUCTOR-LED', 'TRAINING SEMINAR', 'ARCGIS LAB']
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    color: {
        type: String,
        required: true,
        match: /^#[0-9A-F]{6}$/i
    },
    isFree: {
        type: Boolean,
        default: false
    },
    requiresMaintenance: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model('TrainingProgram', trainingProgramSchema);
