// smartsho-backend/src/routes/returnRoutes.js
// Routes for buyer-initiated return actions

import express from 'express';
import returnController from '../controllers/returnController.js';

const router = express.Router();

// POST /api/returns/request - Buyer requests to return packaging
router.post('/request', returnController.requestReturn);

// GET /api/returns/status/:id - Buyer checks status of a specific return
router.get('/status/:id', returnController.getReturnStatus);

router.get('/history/:userId', returnController.getReturnHistory);

// ✅ Export the router as default
export default router;
