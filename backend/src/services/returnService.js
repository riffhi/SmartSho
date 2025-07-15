// smartsho-backend/src/services/returnService.js
// Business logic for return requests
const Return = require('../models/Return');
const User = require('../models/User'); // Import User model to update greenBitsBalance
const GreenbitsTransaction = require('../models/GreenbitsTransaction');
const { PICKUP_THRESHOLD, GREENBITS_PER_PACKAGE, AREA_GRANULARITY } = require('../config');
const { triggerPickupScheduling } = require('./schedulingService'); // Import scheduling service

class ReturnService {
    /**
     * Handles a new packaging return request from a buyer.
     * @param {Object} returnData - Data for the return request (userId, packageId, orderId, pickupLocation)
     * @returns {Promise<Return>} The created return document.
     */
    async createReturnRequest(returnData) {
        // Basic validation
        if (!returnData.userId || !returnData.packageId || !returnData.orderId || !returnData.pickupLocation || !returnData.pickupLocation.address || !returnData.pickupLocation.pincode) {
            throw new Error('Missing required return data.');
        }

        // Check if a return request for this packageId already exists
        const existingReturn = await Return.findOne({ packageId: returnData.packageId });
        if (existingReturn) {
            throw new Error('Return request for this package already exists.');
        }

        const newReturn = new Return(returnData);
        await newReturn.save();

        // After a new request, check if the area threshold is met
        await this.checkAndTriggerPickupScheduling(newReturn.pickupLocation[AREA_GRANULARITY]);

        return newReturn;
    }

    /**
     * Retrieves the status of a specific return request.
     * @param {string} returnId - The ID of the return request.
     * @param {string} userId - The ID of the user requesting the status (for authorization).
     * @returns {Promise<Return>} The return document.
     */
    async getReturnStatus(returnId, userId) {
        const returnDoc = await Return.findById(returnId);
        if (!returnDoc) {
            throw new Error('Return request not found.');
        }
        // Ensure the user is authorized to view this return status
        if (returnDoc.userId.toString() !== userId) {
            throw new Error('Unauthorized access to return status.');
        }
        return returnDoc;
    }

    /**
     * Checks the number of 'requested' returns in an area and triggers pickup scheduling if threshold is met.
     * This method is called after a new return request is created or can be called by a scheduled job.
     * @param {string} areaIdentifier - The identifier for the geographical area (e.g., pincode).
     */
    async checkAndTriggerPickupScheduling(areaIdentifier) {
        // Count pending returns in the specified area
        const pendingReturnsCount = await Return.countDocuments({
            status: 'requested',
            [`pickupLocation.${AREA_GRANULARITY}`]: areaIdentifier,
        });

        console.log(`Area ${areaIdentifier}: ${pendingReturnsCount} pending returns.`);

        if (pendingReturnsCount >= PICKUP_THRESHOLD) {
            console.log(`Threshold met for area ${areaIdentifier}. Triggering pickup scheduling.`);
            // Fetch all 'requested' returns for this area
            const returnsToSchedule = await Return.find({
                status: 'requested',
                [`pickupLocation.${AREA_GRANULARITY}`]: areaIdentifier,
            });
            // Call the scheduling service to handle the actual scheduling and delivery partner integration
            await triggerPickupScheduling(returnsToSchedule);
        }
    }

    /**
     * Updates the status of a return to 'collected' by a delivery partner.
     * This is an internal/admin API call.
     * @param {string} packageId - The unique ID of the package collected.
     * @param {string} deliveryPartnerId - The ID of the delivery partner.
     * @param {boolean} qualityVerified - Whether the package quality was verified.
     * @param {string} [verificationNotes] - Optional notes on verification.
     * @returns {Promise<Return>} The updated return document.
     */
    async markPackageCollected(packageId, deliveryPartnerId, qualityVerified, verificationNotes) {
        const returnDoc = await Return.findOne({ packageId: packageId });
        if (!returnDoc) {
            throw new Error('Return request not found for this package ID.');
        }
        if (returnDoc.status !== 'scheduled') {
            throw new Error(`Package status is ${returnDoc.status}, cannot mark as collected.`);
        }

        returnDoc.status = 'collected';
        returnDoc.collectedTimestamp = new Date();
        returnDoc.deliveryPartnerId = deliveryPartnerId;
        returnDoc.qualityVerified = qualityVerified;
        returnDoc.verificationNotes = verificationNotes;
        await returnDoc.save();
        console.log(`Package ${packageId} marked as collected by ${deliveryPartnerId}.`);
        return returnDoc;
    }

    /**
     * Updates the status of a return to 'recycled' and issues GreenBits.
     * This is an internal/admin API call, typically from the recycling center.
     * @param {string} packageId - The unique ID of the package recycled.
     * @returns {Promise<Return>} The updated return document.
     */
    async markPackageRecycled(packageId) {
        const returnDoc = await Return.findOne({ packageId: packageId });
        if (!returnDoc) {
            throw new Error('Return request not found for this package ID.');
        }
        if (returnDoc.status !== 'collected') {
            throw new Error(`Package status is ${returnDoc.status}, cannot mark as recycled.`);
        }

        returnDoc.status = 'recycled';
        returnDoc.recycledTimestamp = new Date();
        returnDoc.greenBitsEarned = GREENBITS_PER_PACKAGE; // Assign GreenBits

        await returnDoc.save();

        // Issue GreenBits to the user
        await User.findByIdAndUpdate(
            returnDoc.userId,
            { $inc: { greenBitsBalance: GREENBITS_PER_PACKAGE } },
            { new: true } // Return the updated document
        );

        // Record the GreenBits transaction
        const greenbitsTransaction = new GreenbitsTransaction({
            userId: returnDoc.userId,
            type: 'earned',
            amount: GREENBITS_PER_PACKAGE,
            referenceId: returnDoc._id.toString(),
            description: `Earned ${GREENBITS_PER_PACKAGE} GreenBits for recycling package ${packageId}`,
        });
        await greenbitsTransaction.save();

        console.log(`Package ${packageId} marked as recycled. ${GREENBITS_PER_PACKAGE} GreenBits issued to user ${returnDoc.userId}.`);
        return returnDoc;
    }

    /**
     * Placeholder: Implements logic to track and apply "Recycling Score Boost" to sellers.
     * This would involve counting returns associated with a seller's products.
     * @param {string} sellerId - The ID of the seller.
     */
    async applySellerRecyclingScoreBoost(sellerId) {
        // TODO: Implement logic to count recycled packages linked to seller's products
        // This would require linking Return documents to Seller documents or product documents
        // and then updating a 'recyclingScore' field on the Seller model.
        console.log(`TODO: Implement seller recycling score boost for seller: ${sellerId}`);
    }
}

module.exports = new ReturnService();

