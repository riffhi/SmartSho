// smartsho-backend/src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  greenBitsBalance: {
    type: Number,
    default: 0,
    min: 0,
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  recyclingScore: {
    type: Number,
    default: 0,
    min: 0,
  },
  totalPackagesRecycled: {
    type: Number,
    default: 0,
  },
  totalGreenBitsEarned: {
    type: Number,
    default: 0,
  },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for user's recycling level
userSchema.virtual('recyclingLevel').get(function() {
  if (this.totalPackagesRecycled >= 100) return 'Gold';
  if (this.totalPackagesRecycled >= 50) return 'Silver';
  if (this.totalPackagesRecycled >= 10) return 'Bronze';
  return 'Beginner';
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ 'address.pincode': 1 });

export default mongoose.model('User', userSchema);