// smartsho-backend/src/routes/greenbitsRoutes.js
// Routes for GreenBits related actions
const express = require('express');
const router = express.Router();
const greenbitsController = require('../controllers/greenbitsController');

// GET /api/greenbits/:userId - Get a user's GreenBits balance and history
router.get('/:userId', greenbitsController.getUserGreenbits);

// POST /api/greenbits/redeem - Redeem GreenBits for discounts/rewards
router.post('/redeem', greenbitsController.redeemGreenbits);

module.exports = router;

