// smartsho-backend/src/controllers/greenbitsController.js
import greenbitsService from '../services/greenbitsService.js';

class GreenbitsController {
  async getUserGreenbits(req, res, next) {
    try {
      const { userId } = req.params;
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

  async redeemGreenbits(req, res, next) {
    try {
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

const greenbitsController = new GreenbitsController();
export default greenbitsController;
