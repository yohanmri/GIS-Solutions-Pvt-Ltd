const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gis-solutions', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
// Authentication routes (public)
app.use('/api/auth', require('./routes/authRoutes'));

// Public client-side routes (no authentication)
app.use('/api/client/services', require('./routes/clientServiceRoutes'));
app.use('/api/client/projects', require('./routes/clientProjectRoutes'));
app.use('/api/client/contact', require('./routes/clientContactRoutes'));
app.use('/api/notifications/current', require('./routes/notificationRoutes'));

// Analytics routes (public tracking, protected stats)
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Admin routes (protected)
app.use('/api/services/professional', require('./routes/professionalServiceRoutes'));
app.use('/api/services/events', require('./routes/eventRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
