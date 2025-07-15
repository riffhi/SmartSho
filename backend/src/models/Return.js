// smartsho-backend/src/models/Return.js
import mongoose from 'mongoose';

const returnSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  packageId: {
    type: String,
    required: true,
    unique: true,
  },
  orderId: {
    type: String,
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
  pickupScheduledTimestamp: Date,
  collectedTimestamp: Date,
  recycledTimestamp: Date,
  pickupLocation: {
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    lat: Number,
    lon: Number,
  },
  greenBitsEarned: {
    type: Number,
    default: 0,
  },
  deliveryPartnerId: String,
  qualityVerified: {
    type: Boolean,
    default: false,
  },
  verificationNotes: String,
}, { timestamps: true });

export default mongoose.model('Return', returnSchema);
