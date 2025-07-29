import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // No se pueden repetir emails en la base de datos
        trim: true, // Elimina espacios en blanco al inicio y final
        lowercase: true, // Convierte el email a minúsculas
        validate: {
            validator: function (v) {
                // Valida el formato del email
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} no es un email válido.`,
        },
    },
    nombre: {
        type: String,
        required: true, // Obligatorio
        trim: true, // Elimina espacios en blanco al inicio y final
        maxlength: 50, // Longitud máxima de 50 caracteres
    },
    apellido: {
        type: String,
        required: true, // Obligatorio
        trim: true, // Elimina espacios en blanco al inicio y final
        maxlength: 50, // Longitud máxima de 50 caracteres
    },
    createdAt: {
        type: Date,
        default: Date.now, // Fecha y hora actuales
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

// Add password hashing pre-save middleware
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Add method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const UserSchema = mongoose.model("User", userSchema);

export default UserSchema;