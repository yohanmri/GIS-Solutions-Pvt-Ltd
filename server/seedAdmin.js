const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gis-solutions', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

async function seedAdmin() {
    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'yohanm.ranasingha@gmail.com' });

        if (existingAdmin) {
            console.log('Admin user already exists');
            console.log('Email:', existingAdmin.email);
            console.log('Name:', existingAdmin.name);
            process.exit(0);
        }

        // Create new admin
        const admin = await Admin.create({
            name: 'Yohan Maharanasingha',
            email: 'yohanm.ranasingha@gmail.com',
            password: 'yohan@123',
            role: 'super-admin',
            isTemporaryPassword: false
        });

        console.log('✅ Admin user created successfully!');
        console.log('Email:', admin.email);
        console.log('Name:', admin.name);
        console.log('Role:', admin.role);
        console.log('\nYou can now login with:');
        console.log('Email: yohanm.ranasingha@gmail.com');
        console.log('Password: yohan@123');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
}

seedAdmin();
