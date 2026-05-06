import express from 'express';
import OrderCounter from '../models/OrderCounter.js';

const router = express.Router();

// Get and increment the next serial number for today
router.post('/next-serial', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        
        const counter = await OrderCounter.findOneAndUpdate(
            { date: today },
            { $inc: { count: 1 } },
            { new: true, upsert: true }
        );

        res.status(200).json({ serialNumber: counter.count });
    } catch (error) {
        console.error('Error fetching serial number:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
