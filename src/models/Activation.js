import mongoose from 'mongoose';

const activationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    purchase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchase',
        required: [true, 'La compra es requerida'],
        index: true
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: [true, 'La estación es requerida'],
        index: true
    },
    startTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    endTime: {
        type: Date,
        validate: {
            validator: function (value) {
                return !value || value > this.startTime;
            },
            message: 'La fecha de fin debe ser posterior a la de inicio'
        }
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    }
}, {
    timestamps: true, // Crea createdAt y updatedAt automáticamente
    toJSON: { virtuals: true }
});

// Índice compuesto para búsquedas frecuentes
activationSchema.index({ purchase: 1, station: 1 });

// Virtual para duración en minutos
activationSchema.virtual('durationMinutes').get(function () {
    if (!this.endTime) return null;
    return Math.round((this.endTime - this.startTime) / (1000 * 60));
});

export default mongoose.model('Activation', activationSchema);