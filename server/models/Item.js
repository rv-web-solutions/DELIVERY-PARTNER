import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'Item must belong to a restaurant']
    },
    name: {
        type: String,
        required: [true, 'Please provide an item name'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number
    },
    hasPortions: {
        type: Boolean,
        default: false
    },
    singlePrice: {
        type: Number
    },
    fullPrice: {
        type: Number
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image URL']
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
