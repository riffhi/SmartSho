// smartsho-backend/src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
  greenBitsBalance: {
    type: Number,
    default: 0,
  },
  // Add any other fields you need
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
