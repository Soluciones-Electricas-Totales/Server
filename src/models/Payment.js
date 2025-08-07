import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    purchase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchase',
        required: [true, 'La compra es requerida']
    },
    status: {
        type: String,
        enum: ['approved', 'pending', 'cancelled', 'declined', 'refunded', 'error'],
        default: 'pending',
        required: true
    },
    paymentGateway: {
        type: String,
        enum: ['stripe', 'paypal', 'mercadopago', 'wompi', 'other'],
        required: true
    },
    gatewayData: {
        type: mongoose.Schema.Types.Mixed, // Para almacenar respuesta cruda de la pasarela
        required: false
    },
    amount: {
        type: Number,
        required: [true, 'El monto es requerido'],
        min: [0, 'El monto no puede ser negativo']
    },
    currency: {
        type: String,
        default: 'COP',
        uppercase: true,
        trim: true,
        minlength: 3,
        maxlength: 3
    },
    processedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.gatewayData; // No mostrar datos sensibles por defecto
            return ret;
        }
    }
});

// Índices para búsquedas rápidas
paymentSchema.index({ purchase: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ paymentGateway: 1 });

export default mongoose.model('Payment', paymentSchema);