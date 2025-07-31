import mongoose from 'mongoose';

const installationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la instalación es requerido'],
        trim: true,
        maxlength: [100, 'El nombre no puede exceder 100 caracteres']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Organization owner is required']
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, 'La organización es requerida']
    },
    location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: {
            type: [Number], // [longitud, latitud]
            required: true,
            validate: {
                validator: function (coords) {
                    return coords.length === 2 &&
                        coords[0] >= -180 && coords[0] <= 180 &&
                        coords[1] >= -90 && coords[1] <= 90;
                },
                message: 'Coordenadas inválidas. Formato: [longitud, latitud]'
            }
        }
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

// Índice geospacial para búsquedas por ubicación
installationSchema.index({ location: '2dsphere' });

export default mongoose.model('Installation', installationSchema);