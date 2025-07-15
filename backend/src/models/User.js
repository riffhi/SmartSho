// smartsho-backend/src/models/User.js
// Mongoose schema for User (assuming you might need to update an existing one)
// If you already have a User model, just ensure it includes greenBitsBalance.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Existing user fields (e.g., name, email, password, etc.)
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // New field for GreenBits balance
    greenBitsBalance: {
        type: Number,
        default: 0,
    },
    // Add other user-related fields as needed
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

