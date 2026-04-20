import express from 'express';
import Restaurant from '../models/Restaurant.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Protected Routes (Admin only)
router.post('/', protect, async (req, res) => {
    try {
        const newRestaurant = await Restaurant.create(req.body);
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', protect, async (req, res) => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedRestaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.status(204).json({ message: 'Restaurant deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
