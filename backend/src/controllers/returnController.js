// smartsho-backend/src/controllers/returnController.js
// Controller for handling packaging return requests from buyers

import returnService from '../services/returnService.js';
import Return from '../models/Return.js'; // Add this import

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

    /**
     * Handles the GET /api/returns/history/:userId endpoint.
     * Retrieves all return history for a specific user.
     */
    async getReturnHistory(req, res, next) {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'User ID is required.' 
                });
            }

            // Fetch all returns for the given userId, sorted by most recent first
            const returns = await Return.find({ userId })
                .sort({ requestTimestamp: -1 })
                .select({
                    _id: 1,
                    packageId: 1,
                    orderId: 1,
                    status: 1,
                    requestTimestamp: 1,
                    pickupScheduledTimestamp: 1,
                    collectedTimestamp: 1,
                    recycledTimestamp: 1,
                    greenBitsEarned: 1,
                    pickupLocation: 1
                });

            res.status(200).json({
                success: true,
                message: `Found ${returns.length} return records for user.`,
                returns: returns,
                totalReturns: returns.length
            });

        } catch (error) {
            console.error('Error fetching return history:', error);
            next(error); // Pass to error middleware instead of manual error response
        }
    }

    /**
     * Alternative method using returnService if you prefer service layer approach
     */
    async getReturnHistoryViaService(req, res, next) {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'User ID is required.' 
                });
            }

            const returns = await returnService.getUserReturnHistory(userId);

            res.status(200).json({
                success: true,
                message: `Found ${returns.length} return records for user.`,
                returns: returns,
                totalReturns: returns.length
            });

        } catch (error) {
            next(error);
        }
    }
}

// ✅ Export using ES Module syntax
const returnController = new ReturnController();
export default returnController;