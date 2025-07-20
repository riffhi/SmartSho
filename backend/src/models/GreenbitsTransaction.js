import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['earned', 'spent', 'redeemed'], // Added 'redeemed' to enum
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  referenceId: String,
  description: String,
}, { timestamps: true });

export default mongoose.model('GreenbitsTransaction', transactionSchema);