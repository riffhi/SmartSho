// // smartsho-backend/src/routes/adminRoutes.js
// // Routes for internal/admin actions (e.g., delivery partner and recycling center updates)
// import express from 'express';
// import adminController from '../controllers/adminController.js';

// const router = express.Router();

// // POST /api/admin/package-collected - Delivery partner marks package as collected
// router.post('/package-collected', adminController.markPackageCollected);

// // POST /api/admin/package-recycled - Recycling center marks package as recycled
// router.post('/package-recycled', adminController.markPackageRecycled);



// export default router;


// smartsho-backend/src/routes/adminRoutes.js
import express from 'express';
import adminController from '../controllers/adminController.js';
import Return from '../models/Return.js'; // Import Return model

const router = express.Router();

// POST /api/admin/package-collected - Delivery partner marks package as collected
router.post('/package-collected', adminController.markPackageCollected);

// POST /api/admin/package-recycled - Recycling center marks package as recycled
router.post('/package-recycled', adminController.markPackageRecycled);

// POST /api/admin/update-status - Update package status (for testing)
router.post('/update-status', async (req, res, next) => {
  try {
    const { packageId, newStatus } = req.body;
    
    if (!packageId || !newStatus) {
      return res.status(400).json({ 
        success: false, 
        message: 'packageId and newStatus are required.' 
      });
    }
    
    const validStatuses = ['requested', 'scheduled', 'collected', 'recycled', 'cancelled'];
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    const updated = await Return.findOneAndUpdate(
      { packageId },
      { 
        status: newStatus,
        ...(newStatus === 'scheduled' && { pickupScheduledTimestamp: new Date() })
      },
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        message: 'Return not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: `Status updated to ${newStatus}`, 
      return: updated 
    });
  } catch (error) {
    next(error);
  }
});

export default router;