// smartsho-backend/src/controllers/returnController.js
// Controller for handling packaging return requests from buyers
const returnService = require('../services/returnService');

class ReturnController {
    /**
     * Handles the POST /api/returns/request endpoint.
     * Allows a buyer to request a packaging return.
     */
    async requestReturn(req, res, next) {
        try {
            // In a real app, userId would come from authenticated user session/token
            const { userId, packageId, orderId, pickupLocation } = req.body;

            // Basic input validation
            if (!userId || !packageId || !orderId || !pickupLocation || !pickupLocation.address || !pickupLocation.pincode) {
                return res.status(400).json({ success: false, message: 'Missing required fields for return request.' });
            }

            const newReturn = await returnService.createReturnRequest({
                userId,
                packageId,
                orderId,
                pickupLocation,
            });

            res.status(201).json({
                success: true,
                message: 'Return request submitted successfully.',
                returnId: newReturn._id,
                status: newReturn.status,
            });
        } catch (error) {
            next(error); // Pass error to the global error handler
        }
    }

    /**
     * Handles the GET /api/returns/status/:id endpoint.
     * Allows a buyer to check the status of their return request.
     */
    async getReturnStatus(req, res, next) {
        try {
            const { id } = req.params;
            // In a real app, userId would come from authenticated user session/token
            // For now, let's assume userId is passed in query or body for simplicity in this example
            // In production, you'd get this from req.user.id after authentication middleware
            const userId = req.query.userId || req.body.userId; // Example: get from query for testing

            if (!userId) {
                return res.status(401).json({ success: false, message: 'Authentication required to view return status.' });
            }

            const returnDoc = await returnService.getReturnStatus(id, userId);

            res.status(200).json({
                success: true,
                data: {
                    returnId: returnDoc._id,
                    status: returnDoc.status,
                    requestTimestamp: returnDoc.requestTimestamp,
                    pickupScheduledTimestamp: returnDoc.pickupScheduledTimestamp,
                    collectedTimestamp: returnDoc.collectedTimestamp,
                    recycledTimestamp: returnDoc.recycledTimestamp,
                    greenBitsEarned: returnDoc.greenBitsEarned,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ReturnController();

