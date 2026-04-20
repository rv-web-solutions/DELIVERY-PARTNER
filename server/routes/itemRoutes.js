import express from 'express';
import Item from '../models/Item.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.get('/', async (req, res) => {
    try {
        const items = await Item.find().populate('restaurantId');
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/restaurant/:restaurantId', async (req, res) => {
    try {
        const items = await Item.find({ restaurantId: req.params.restaurantId });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Protected Routes (Admin only)
router.post('/', protect, async (req, res) => {
    try {
        const newItem = await Item.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', protect, async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(204).json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
