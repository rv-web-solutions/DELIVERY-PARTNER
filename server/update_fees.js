import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from './models/Restaurant.js';

dotenv.config();

const updateFees = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for fee update...');

        const result = await Restaurant.updateMany(
            { deliveryFee: 40 },
            { $set: { deliveryFee: 50 } }
        );

        console.log(`Updated ${result.modifiedCount} restaurants from ₹40 to ₹50.`);
        
        // Also update any other restaurants that might not be 40 but should be 50?
        // The user said "should replace with 50", implying they want 50 everywhere.
        // Let's just update ALL restaurants to 50 if they want it global.
        // const resultAll = await Restaurant.updateMany({}, { $set: { deliveryFee: 50 } });

        console.log('Fee update completed successfully!');
        process.exit();
    } catch (error) {
        console.error('Error updating fees:', error);
        process.exit(1);
    }
};

updateFees();
