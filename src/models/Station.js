import mongoose from 'mongoose';

const stationSchema = new mongoose.Schema({
    installation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Installation',
        required: [true, 'La instalación es requerida']
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Station', stationSchema);