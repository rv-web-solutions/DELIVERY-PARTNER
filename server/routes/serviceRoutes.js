import express from 'express';
import Service from '../models/Service.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all services (Public)
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE service status (Admin Only)
router.patch('/:key', protect, async (req, res) => {
    try {
        const { isEnabled } = req.body;
        const service = await Service.findOneAndUpdate(
            { key: req.params.key },
            { isEnabled },
            { new: true }
        );

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
