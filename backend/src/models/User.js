const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    subscription: {
        status: {
            type: String,
            enum: ['trialing', 'active', 'canceled', 'past_due', 'inactive'],
            default: 'inactive'
        },
        plan: {
            type: String,
            enum: ['free', 'monthly', 'yearly', 'monthly-pro', 'yearly-pro'],
            default: 'free'
        },
        stripeCustomerId: String,
        stripeSubscriptionId: String,
        currentPeriodEnd: Date,
        trialEnd: Date
    },
    analysisCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = mongoose.model('User', userSchema);