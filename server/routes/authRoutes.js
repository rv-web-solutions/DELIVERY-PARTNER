import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const router = express.Router();

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const admin = await Admin.findOne({ email }).select('+password');

        if (!admin || !(await admin.correctPassword(password, admin.password))) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const token = signToken(admin._id);
        res.status(200).json({
            status: 'success',
            token,
            admin: {
                id: admin._id,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Initial admin setup (only use once or in development)
router.post('/setup', async (req, res) => {
    try {
        const adminExists = await Admin.findOne();
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const { email, password } = req.body;
        const newAdmin = await Admin.create({ email, password });

        const token = signToken(newAdmin._id);
        res.status(201).json({
            status: 'success',
            token,
            admin: {
                id: newAdmin._id,
                email: newAdmin.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
