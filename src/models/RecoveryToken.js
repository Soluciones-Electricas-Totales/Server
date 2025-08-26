import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const recoveryTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} no es un email válido.`,
        },
    },
    token: {
        type: String,
        required: true,
        /*minlength: 6,
        maxlength: 6,
        validate: {
            validator: function (v) {
                return /^\d{6}$/.test(v); // Solo 6 dígitos
            },
            message: props => `${props.value} no es un token válido de 6 dígitos.`,
        },*/
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 30 * 60 * 1000) // 30 minutos
    },
    used: {
        type: Boolean,
        default: false
    },
    attempts: {
        type: Number,
        default: 0,
        max: 5 // Límite de 5 intentos
    }
});

recoveryTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
recoveryTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 60 }); // Doble expiración

recoveryTokenSchema.pre('save', async function (next) {
    if (this.isModified('token')) {
        this.token = await bcrypt.hash(this.token, 10);
    }
    next();
});

recoveryTokenSchema.methods.isValid = function () {
    return !this.used && this.expiresAt > new Date() && this.attempts < 5;
};

recoveryTokenSchema.methods.incrementAttempts = async function () {
    this.attempts += 1;
    if (this.attempts >= 5) {
        this.used = true; // Bloquear después de 5 intentos
    }
    await this.save();
};

// Add method to compare passwords
recoveryTokenSchema.methods.compareToken = async function (candidateToken) {
    return bcrypt.compare(candidateToken, this.token);
};

recoveryTokenSchema.methods.markAsUsed = async function () {
    this.used = true;
    await this.save();
};

const RecoveryToken = mongoose.model("RecoveryToken", recoveryTokenSchema);

export default RecoveryToken;