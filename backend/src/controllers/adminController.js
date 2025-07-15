// smartsho-backend/src/controllers/adminController.js
// Controller for internal/admin APIs (e.g., delivery partner updates, recycling center updates)

import returnService from '../services/returnService.js';

class AdminController {
  async markPackageCollected(req, res, next) {
    try {
      const { packageId, deliveryPartnerId, qualityVerified, verificationNotes } = req.body;

      if (!packageId || !deliveryPartnerId || typeof qualityVerified !== 'boolean') {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields for package collection.',
        });
      }

      const updatedReturn = await returnService.markPackageCollected(
        packageId,
        deliveryPartnerId,
        qualityVerified,
        verificationNotes
      );

      res.status(200).json({
        success: true,
        message: `Package ${packageId} marked as collected.`,
        returnId: updatedReturn._id,
        status: updatedReturn.status,
      });
    } catch (error) {
      next(error);
    }
  }

  async markPackageRecycled(req, res, next) {
    try {
      const { packageId } = req.body;

      if (!packageId) {
        return res.status(400).json({
          success: false,
          message: 'Missing packageId for recycling confirmation.',
        });
      }

      const updatedReturn = await returnService.markPackageRecycled(packageId);

      res.status(200).json({
        success: true,
        message: `Package ${packageId} marked as recycled and GreenBits issued.`,
        returnId: updatedReturn._id,
        status: updatedReturn.status,
        greenBitsEarned: updatedReturn.greenBitsEarned,
      });
    } catch (error) {
      next(error);
    }
  }
}

const adminController = new AdminController();
export default adminController;
