import mongoose from 'mongoose';

const orderCounterSchema = new mongoose.Schema({
    date: {
        type: String, // Format: YYYY-MM-DD
        required: true,
        unique: true
    },
    count: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const OrderCounter = mongoose.model('OrderCounter', orderCounterSchema);

export default OrderCounter;
