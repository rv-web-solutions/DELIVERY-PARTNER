import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';


import Restaurant from './models/Restaurant.js';
import Item from './models/Item.js';
import Admin from './models/Admin.js';
import Service from './models/Service.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/services', serviceRoutes);

app.get('/', (req, res) => {
    res.send('Ring4Delivery API is running...');
});

// Connect to MongoDB
const seedData = async () => {
    try {
        await Restaurant.deleteMany({});
        await Item.deleteMany({});
        await Admin.deleteMany({});
        await Service.deleteMany({});

        console.log('Seeding initial data (1 Admin, 2 restaurants, 5 items each, 4 services)...');
        
        // Default Admin
        await Admin.create({
            email: 'admin@ring4delivery.com',
            password: 'admin123456'
        });

        // Restaurant 1: Italian Delights
        const r1 = await Restaurant.create({
            name: 'Italian Delights',
            cuisine: 'Italian',
            rating: 4.8,
            deliveryTime: '30-40 mins',
            imageUrl: 'https://images.unsplash.com/photo-1564379694568-e70de7e196e3?w=800&fit=crop',
            deliveryFee: 40,
            address: '123 Pizza Street'
        });

        const items1 = [
            { name: 'Margherita Pizza', category: 'Main Course', price: 299, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=400&fit=crop' },
            { name: 'Garlic Bread', category: 'Appetizers', price: 120, imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&fit=crop' },
            { name: 'Pasta Carbonara', category: 'Main Course', price: 349, imageUrl: 'https://images.unsplash.com/photo-1612459284970-e8f027596582?w=400&fit=crop' },
            { name: 'Bruschetta', category: 'Appetizers', price: 150, imageUrl: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?w=400&fit=crop' },
            { name: 'Tiramisu', category: 'Dessert', price: 199, imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&fit=crop' }
        ];

        for (const item of items1) {
            await Item.create({ ...item, restaurantId: r1._id });
        }

        // Restaurant 2: Dragon Palace
        const r2 = await Restaurant.create({
            name: 'Dragon Palace',
            cuisine: 'Chinese',
            rating: 4.6,
            deliveryTime: '25-35 mins',
            imageUrl: 'https://images.unsplash.com/photo-1513818416499-51765355672f?w=800&fit=crop',
            deliveryFee: 50,
            address: '456 Noodle Lane'
        });

        const items2 = [
            { name: 'Kung Pao Chicken', category: 'Main Course', price: 279, imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&fit=crop' },
            { name: 'Spring Rolls', category: 'Appetizers', price: 99, imageUrl: 'https://images.unsplash.com/photo-1606525437679-037adc74a3e9?w=400&fit=crop' },
            { name: 'Veg Hakka Noodles', category: 'Main Course', price: 189, imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&fit=crop' },
            { name: 'Dim Sums', category: 'Appetizers', price: 149, imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&fit=crop' },
            { name: 'Fried Rice', category: 'Main Course', price: 169, imageUrl: 'https://images.unsplash.com/photo-1512058560366-cd2427ff5a63?w=400&fit=crop' }
        ];

        for (const item of items2) {
            await Item.create({ ...item, restaurantId: r2._id });
        }

        // Default Services
        const services = [
            { name: "Restaurants", key: "restaurants", isEnabled: true },
            { name: "Medicines", key: "medicines", isEnabled: true },
            { name: "Groceries and other items", key: "groceries", isEnabled: true },
            { name: "Pick up and Drop", key: "pick-up-and-drop", isEnabled: true }
        ];

        for (const service of services) {
            await Service.create(service);
        }

        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Seeding error:', error.message);
    }
};

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');

        // Seed only if collections are empty
        const restaurantCount = await Restaurant.countDocuments();
        const adminCount = await Admin.countDocuments();
        const serviceCount = await Service.countDocuments();

        if (restaurantCount === 0 || adminCount === 0 || serviceCount === 0) {
            await seedData();
        } else {
            console.log(`Found ${restaurantCount} restaurants, ${adminCount} admin(s), and ${serviceCount} services in DB. Skipping seed.`);
        }

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server startup error:', error.message);
        process.exit(1);
    }
};

startServer();
