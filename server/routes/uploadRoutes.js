import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', protect, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        const stream = cloudinary.uploader.upload_stream(
            { folder: 'ring4delivery' },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({ message: 'Image upload failed' });
                }
                res.status(200).json({ imageUrl: result.secure_url });
            }
        );

        stream.end(req.file.buffer);
    } catch (error) {
        console.error('Upload route error:', error);
        res.status(500).json({ message: 'Internal server error during upload' });
    }
});

export default router;
