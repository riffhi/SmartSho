// smartsho-backend/src/routes/adminRoutes.js
// Routes for internal/admin actions (e.g., delivery partner and recycling center updates)
import express from 'express';
import adminController from '../controllers/adminController.js';

const router = express.Router();

// POST /api/admin/package-collected - Delivery partner marks package as collected
router.post('/package-collected', adminController.markPackageCollected);

// POST /api/admin/package-recycled - Recycling center marks package as recycled
router.post('/package-recycled', adminController.markPackageRecycled);

export default router;
