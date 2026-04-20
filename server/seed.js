import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from './models/Restaurant.js';
import Item from './models/Item.js';

dotenv.config();

const restaurantsData = [
    {
        name: 'Italian Delights',
        cuisine: 'Italian',
        rating: 4.8,
        deliveryTime: '30-40 mins',
        imageUrl: 'https://images.unsplash.com/photo-1564379694568-e70de7e196e3?w=800&fit=crop',
        deliveryFee: 40,
        address: '123 Pizza Street'
    },
    {
        name: 'Dragon Palace',
        cuisine: 'Chinese',
        rating: 4.6,
        deliveryTime: '25-35 mins',
        imageUrl: 'https://images.unsplash.com/photo-1513818416499-51765355672f?w=800&fit=crop',
        deliveryFee: 50,
        address: '456 Noodle Lane'
    }
];

const itemsData = [
    // Italian Delights
    { restaurantName: 'Italian Delights', name: 'Margherita Pizza', category: 'Main Course', price: 299, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=400&fit=crop' },
    { restaurantName: 'Italian Delights', name: 'Garlic Bread', category: 'Appetizers', price: 120, imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&fit=crop' },
    { restaurantName: 'Italian Delights', name: 'Pasta Carbonara', category: 'Main Course', price: 349, imageUrl: 'https://images.unsplash.com/photo-1612459284970-e8f027596582?w=400&fit=crop' },
    { restaurantName: 'Italian Delights', name: 'Bruschetta', category: 'Appetizers', price: 150, imageUrl: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?w=400&fit=crop' },
    { restaurantName: 'Italian Delights', name: 'Tiramisu', category: 'Dessert', price: 199, imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&fit=crop' },
    // Dragon Palace
    { restaurantName: 'Dragon Palace', name: 'Kung Pao Chicken', category: 'Main Course', price: 279, imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&fit=crop' },
    { restaurantName: 'Dragon Palace', name: 'Spring Rolls', category: 'Appetizers', price: 99, imageUrl: 'https://images.unsplash.com/photo-1606525437679-037adc74a3e9?w=400&fit=crop' },
    { restaurantName: 'Dragon Palace', name: 'Veg Hakka Noodles', category: 'Main Course', price: 189, imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&fit=crop' },
    { restaurantName: 'Dragon Palace', name: 'Dim Sums', category: 'Appetizers', price: 149, imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&fit=crop' },
    { restaurantName: 'Dragon Palace', name: 'Fried Rice', category: 'Main Course', price: 169, imageUrl: 'https://images.unsplash.com/photo-1512058560366-cd2427ff5a63?w=400&fit=crop' }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        await Restaurant.deleteMany({});
        await Item.deleteMany({});

        const createdRestaurants = await Restaurant.insertMany(restaurantsData);
        console.log(`Seeded ${createdRestaurants.length} restaurants.`);

        const finalItems = itemsData.map(item => {
            const restaurant = createdRestaurants.find(r => r.name === item.restaurantName);
            return {
                ...item,
                restaurantId: restaurant._id
            };
        });

        await Item.insertMany(finalItems);
        console.log(`Seeded ${finalItems.length} menu items.`);

        console.log('Database seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
