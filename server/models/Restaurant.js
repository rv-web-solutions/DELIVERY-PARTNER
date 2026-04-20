import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a restaurant name'],
        trim: true
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image URL']
    },
    deliveryFee: {
        type: Number,
        required: [true, 'Please provide a delivery fee'],
        default: 40
    },
    cuisine: {
        type: String,
        trim: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    deliveryTime: {
        type: String,
        default: '30-40 mins'
    },
    address: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
