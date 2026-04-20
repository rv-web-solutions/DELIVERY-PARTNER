import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const currentAdmin = await Admin.findById(decoded.id);
        if (!currentAdmin) {
            return res.status(401).json({ message: 'The admin belonging to this token no longer exists.' });
        }

        req.user = currentAdmin;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token or session expired' });
    }
};
