import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const existingAdmin = await Admin.findOne({ email: 'admin@ring4delivery.com' });
        if (existingAdmin) {
            console.log('Admin already exists with email: admin@ring4delivery.com');
            process.exit();
        }

        const admin = await Admin.create({
            email: 'admin@ring4delivery.com',
            password: 'admin123'
        });

        console.log('Admin created successfully!');
        console.log('Email: admin@ring4delivery.com');
        console.log('Password: admin123');
        process.exit();
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
