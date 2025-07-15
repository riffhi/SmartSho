// smartsho-backend/src/controllers/adminController.js
// Controller for internal/admin APIs (e.g., delivery partner updates, recycling center updates)
const returnService = require('../services/returnService');

class AdminController {
    /**
     * Handles the POST /api/admin/package-collected endpoint.
     * Used by delivery partners to mark a package as collected.
     */
    async markPackageCollected(req, res, next) {
        try {
            // In a real app, this endpoint would be secured (e.g., API key, IP whitelisting)
            // and the deliveryPartnerId would be derived from the authenticated request.
            const { packageId, deliveryPartnerId, qualityVerified, verificationNotes } = req.body;

            if (!packageId || !deliveryPartnerId || typeof qualityVerified !== 'boolean') {
                return res.status(400).json({ success: false, message: 'Missing required fields for package collection.' });
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

    /**
     * Handles the POST /api/admin/package-recycled endpoint.
     * Used by recycling centers to mark a package as recycled and trigger GreenBits issuance.
     */
    async markPackageRecycled(req, res, next) {
        try {
            // In a real app, this endpoint would also be highly secured.
            const { packageId } = req.body;

            if (!packageId) {
                return res.status(400).json({ success: false, message: 'Missing packageId for recycling confirmation.' });
            }

            const updatedReturn = await returnService.markPackageRecycled(packageId);

            // You might want to trigger seller score boost here as well
            // await returnService.applySellerRecyclingScoreBoost(updatedReturn.sellerId); // Assuming sellerId is linked

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

module.exports = new AdminController();

