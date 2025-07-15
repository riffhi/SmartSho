// smartsho-backend/src/routes/adminRoutes.js
// Routes for internal/admin actions (e.g., delivery partner and recycling center updates)
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// POST /api/admin/package-collected - Delivery partner marks package as collected
router.post('/package-collected', adminController.markPackageCollected);

// POST /api/admin/package-recycled - Recycling center marks package as recycled
router.post('/package-recycled', adminController.markPackageRecycled);

module.exports = router;

