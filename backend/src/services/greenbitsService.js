// smartsho-backend/src/services/greenbitsService.js
// Business logic for GreenBits management (fetching balance, redemption)
const User = require('../models/User');
const GreenbitsTransaction = require('../models/GreenbitsTransaction');
const { GREENBITS_PER_PACKAGE } = require('../config'); // Re-using config value for consistency

class GreenbitsService {
    /**
     * Retrieves a user's current GreenBits balance and transaction history.
     * @param {string} userId - The ID of the user.
     * @returns {Promise<{balance: number, history: Array<GreenbitsTransaction>}>}
     */
    async getUserGreenbits(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found.');
        }

        const history = await GreenbitsTransaction.find({ userId: userId }).sort({ timestamp: -1 });

        return {
            balance: user.greenBitsBalance,
            history: history,
        };
    }

    /**
     * Handles the redemption of GreenBits for a user.
     * @param {string} userId - The ID of the user redeeming GreenBits.
     * @param {number} amount - The amount of GreenBits to redeem.
     * @param {string} redemptionType - E.g., 'discount', 'coupon', 'donation'.
     * @param {string} [reference] - Optional reference (e.g., coupon code generated).
     * @returns {Promise<Object>} Updated user balance and transaction details.
     */
    async redeemGreenbits(userId, amount, redemptionType, reference = 'N/A') {
        if (amount <= 0) {
            throw new Error('Redemption amount must be positive.');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found.');
        }

        if (user.greenBitsBalance < amount) {
            throw new Error('Insufficient GreenBits balance.');
        }

        // Deduct GreenBits from user's balance
        user.greenBitsBalance -= amount;
        await user.save();

        // Record the redemption transaction
        const greenbitsTransaction = new GreenbitsTransaction({
            userId: userId,
            type: 'redeemed',
            amount: amount,
            referenceId: reference,
            description: `Redeemed ${amount} GreenBits for ${redemptionType}`,
        });
        await greenbitsTransaction.save();

        // TODO: Integrate with actual coupon/discount generation system here
        // For now, we'll just log it.
        console.log(`User ${userId} redeemed ${amount} GreenBits for ${redemptionType}.`);

        return {
            newBalance: user.greenBitsBalance,
            transaction: greenbitsTransaction,
        };
    }
}

module.exports = new GreenbitsService();

