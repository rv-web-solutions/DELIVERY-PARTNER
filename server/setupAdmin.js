import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const setupAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas...');

        // Always remove old admin and create fresh
        await Admin.deleteMany({});
        console.log('Cleared old admin accounts.');

        const admin = await Admin.create({
            email: 'admin@ring4delivery.com',
            password: 'admin123456'
        });

        console.log(`\n✅ Admin created successfully!`);
        console.log(`   Email   : ${admin.email}`);
        console.log(`   Password: admin123456`);
        console.log(`\nYou can now log in at /admin/login`);
        process.exit();
    } catch (error) {
        console.error('Error setting up admin:', error.message);
        process.exit(1);
    }
};

setupAdmin();
