import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a service name'],
        trim: true
    },
    key: {
        type: String,
        required: [true, 'Please provide a service key'],
        unique: true,
        lowercase: true,
        trim: true
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
