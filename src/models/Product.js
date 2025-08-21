import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true, // Elimina espacios en blanco al inicio/final
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
        //unique: false // permite duplicados
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'La descripción no puede exceder 500 caracteres'],
        default: null // Valor por defecto (opcional)
    },
    time: {
        type: Number,
        required: true,
        min: [1, 'El tiempo mínimo es 1 minuto'],
        max: [1440, 'El tiempo máximo es 1440 minutos (24h)'],
        validate: {
            validator: Number.isInteger,
            message: 'El tiempo debe ser un número entero'
        }
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo'],
        set: v => parseFloat(v.toFixed(2)) // Guarda siempre con 2 decimales
    },
    available: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Fecha automática al crear
    },
    deleted: {
        type: Boolean,
        default: false
    },
    belongsTo: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        type: {
            type: String,
            enum: ['Organization', 'Installation'],
            required: true
        }
    }
}, {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
    versionKey: false // Elimina el campo __v
});

// Índices para búsquedas rápidas
productSchema.index({ nombre: 1 }); // Índice ascendente
productSchema.index({ precio: 1, tiempo: 1 });

// Método personalizado
productSchema.methods.toJSON = function () {
    const product = this.toObject();
    delete product.createdAt; // Opcional: ocultar en responses
    return product;
};

export default mongoose.model('Product', productSchema);