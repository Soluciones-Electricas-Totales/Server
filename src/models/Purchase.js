import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    usageDate: {
        type: Date,
        validate: {
            validator: function (value) {
                console.log("usage purchase");

                console.log(value)
                console.log(this.purchaseDate);

                return value > this.purchaseDate;
            },
            message: 'Usage date must be after purchase date'
        }
    },
    status: {
        type: String,
        enum: {
            values: ['used', 'unused', 'cancelled'],
            message: 'Invalid status. Use: used, unused, or cancelled'
        },
        default: 'unused'
    },
    purchasePrice: { // Historical price record
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

// Pre-save hook to record product price at purchase time
purchaseSchema.pre('save', async function (next) {
    if (!this.purchasePrice) {
        const product = await mongoose.model('Product').findById(this.product);
        this.purchasePrice = product.price;
    }
    next();
});

// Virtual property: days since purchase
purchaseSchema.virtual('daysSincePurchase').get(function () {
    return Math.floor((Date.now() - this.purchaseDate) / (1000 * 60 * 60 * 24));
});

export default mongoose.model('Purchase', purchaseSchema);