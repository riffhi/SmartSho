// smartsho-backend/src/controllers/returnController.js
// Controller for handling packaging return requests from buyers

import returnService from '../services/returnService.js';

class ReturnController {
    /**
     * Handles the POST /api/returns/request endpoint.
     * Allows a buyer to request a packaging return.
     */
    async requestReturn(req, res, next) {
        try {
            const { userId, packageId, orderId, pickupLocation } = req.body;

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
            next(error);
        }
    }

    /**
     * Handles the GET /api/returns/status/:id endpoint.
     * Allows a buyer to check the status of their return request.
     */
    async getReturnStatus(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.query.userId || req.body.userId;

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

// ✅ Export using ES Module syntax
const returnController = new ReturnController();
export default returnController;
