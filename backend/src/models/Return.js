// smartsho-backend/src/models/Return.js
// Mongoose schema for packaging return requests
const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming users are stored in a separate collection
        ref: 'User', // Reference to the User model
        required: true,
    },
    packageId: {
        type: String, // A unique identifier for the specific package being returned
        required: true,
        unique: true, // Ensure each package return request is unique
    },
    orderId: {
        type: String, // The order associated with this package
        required: true,
    },
    requestTimestamp: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['requested', 'scheduled', 'collected', 'recycled', 'cancelled'],
        default: 'requested',
    },
    pickupScheduledTimestamp: {
        type: Date,
    },
    collectedTimestamp: {
        type: Date,
    },
    recycledTimestamp: {
        type: Date,
    },
    pickupLocation: {
        // Store location details for pickup
        address: { type: String, required: true },
        pincode: { type: String, required: true }, // Crucial for area-based threshold
        lat: { type: Number },
        lon: { type: Number },
    },
    greenBitsEarned: {
        type: Number,
        default: 0,
    },
    deliveryPartnerId: {
        type: String, // Identifier for the delivery partner assigned to this pickup
    },
    // Optional: Add fields for package quality verification
    qualityVerified: {
        type: Boolean,
        default: false,
    },
    verificationNotes: {
        type: String,
    },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

module.exports = mongoose.model('Return', returnSchema);

