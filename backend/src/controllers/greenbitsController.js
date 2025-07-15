// smartsho-backend/src/controllers/greenbitsController.js
// Controller for handling GreenBits related requests
const greenbitsService = require('../services/greenbitsService');

class GreenbitsController {
    /**
     * Handles the GET /api/greenbits/:userId endpoint.
     * Retrieves a user's GreenBits balance and transaction history.
     */
    async getUserGreenbits(req, res, next) {
        try {
            const { userId } = req.params;
            // In a real app, ensure userId from params matches authenticated user's ID
            // For simplicity in this example, we'll just use the param.

            const { balance, history } = await greenbitsService.getUserGreenbits(userId);

            res.status(200).json({
                success: true,
                data: {
                    balance,
                    history,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Handles the POST /api/greenbits/redeem endpoint.
     * Allows a user to redeem GreenBits.
     */
    async redeemGreenbits(req, res, next) {
        try {
            // In a real app, userId would come from authenticated user session/token
            const { userId, amount, redemptionType, reference } = req.body;

            if (!userId || !amount || amount <= 0 || !redemptionType) {
                return res.status(400).json({ success: false, message: 'Missing required fields for redemption.' });
            }

            const result = await greenbitsService.redeemGreenbits(userId, amount, redemptionType, reference);

            res.status(200).json({
                success: true,
                message: 'GreenBits redeemed successfully.',
                newBalance: result.newBalance,
                transactionId: result.transaction._id,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new GreenbitsController();

