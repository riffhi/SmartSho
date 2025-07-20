// smartsho-backend/src/services/greenbitsService.js

import User from '../models/User.js';
import GreenbitsTransaction from '../models/GreenbitsTransaction.js';

class GreenbitsService {
    async getUserGreenbits(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found.');
        }

        const history = await GreenbitsTransaction.find({ userId }).sort({ timestamp: -1 });

        return {
            balance: user.greenBitsBalance,
            history: history,
        };
    }

    async redeemGreenbits(userId, amount, redemptionType, reference = 'N/A') {
        if (amount <= 0) {
            throw new Error('Redemption amount must be positive.');
        }

        // Check user exists and has sufficient balance
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found.');
        }

        if (user.greenBitsBalance < amount) {
            throw new Error('Insufficient GreenBits balance.');
        }

        // Use findByIdAndUpdate to avoid validation issues
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $inc: { greenBitsBalance: -amount } },
            { new: true, runValidators: false }
        );

        const greenbitsTransaction = new GreenbitsTransaction({
            userId: userId,
            type: 'spent', // Changed from 'redeemed' to 'spent'
            amount: amount,
            referenceId: reference,
            description: `Redeemed ${amount} GreenBits for ${redemptionType}`,
        });
        await greenbitsTransaction.save();

        return {
            newBalance: updatedUser.greenBitsBalance,
            transaction: greenbitsTransaction,
        };
    }

    // Fixed: Changed parameter order to match controller call
    async addGreenbits(userId, amount, description) {
        if (!userId || !amount || amount <= 0) {
            throw new Error('Invalid input.');
        }

        // Fixed: Use findByIdAndUpdate to avoid validation issues
        const user = await User.findByIdAndUpdate(
            userId,
            { $inc: { greenBitsBalance: amount } },
            { new: true, runValidators: false } // Skip validation to avoid password requirement
        );

        if (!user) {
            throw new Error('User not found.');
        }

        const greenbitsTransaction = new GreenbitsTransaction({
            userId: userId,
            type: 'earned',
            amount: amount,
            referenceId: description || 'N/A',
            description: description || `Earned ${amount} GreenBits`,
        });

        await greenbitsTransaction.save();

        return {
            newBalance: user.greenBitsBalance,
            transaction: greenbitsTransaction,
        };
    }
}

const greenbitsService = new GreenbitsService();
export default greenbitsService;