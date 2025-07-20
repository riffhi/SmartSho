// smartsho-backend/src/routes/greenbitsRoutes.js
// Routes for GreenBits related actions

import express from 'express';
import greenbitsController from '../controllers/greenbitsController.js';

const router = express.Router();

// GET /api/greenbits/:userId - Get a user's GreenBits balance and history
router.get('/:userId', greenbitsController.getUserGreenbits);

// POST /api/greenbits/redeem - Redeem GreenBits for discounts/rewards
router.post('/redeem', greenbitsController.redeemGreenbits);

router.post('/add', greenbitsController.addGreenbits);

export default router;
