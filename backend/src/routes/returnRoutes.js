// smartsho-backend/src/routes/returnRoutes.js
// Routes for buyer-initiated return actions
const express = require('express');
const router = express.Router();
const returnController = require('../controllers/returnController');

// POST /api/returns/request - Buyer requests to return packaging
router.post('/request', returnController.requestReturn);

// GET /api/returns/status/:id - Buyer checks status of a specific return
router.get('/status/:id', returnController.getReturnStatus);

module.exports = router;

