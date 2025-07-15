// smartsho-backend/src/services/schedulingService.js
import Return from '../models/Return.js';
import { DELIVERY_PARTNER_API_URL } from '../config/index.js';
import axios from 'axios';

/**
 * Orchestrates the scheduling of pickups for a batch of returns.
 * @param {Array<Return>} returnsToSchedule - An array of Return documents with status 'requested'.
 */
export async function triggerPickupScheduling(returnsToSchedule) {
    if (!returnsToSchedule || returnsToSchedule.length === 0) {
        console.log('No returns to schedule.');
        return;
    }

    console.log(`Attempting to schedule pickups for ${returnsToSchedule.length} returns.`);

    const pickupPoints = returnsToSchedule.map(ret => ({
        returnId: ret._id.toString(),
        packageId: ret.packageId,
        address: ret.pickupLocation.address,
        pincode: ret.pickupLocation.pincode,
        lat: ret.pickupLocation.lat,
        lon: ret.pickupLocation.lon,
    }));

    const assignedDeliveryPartnerId = 'DP_MOCK_001';
    const scheduledTime = new Date();
    scheduledTime.setDate(scheduledTime.getDate() + 1);

    try {
        const deliveryPartnerResponse = await axios.post(`${DELIVERY_PARTNER_API_URL}/schedule-pickups`, {
            pickups: pickupPoints,
            assignedPartner: assignedDeliveryPartnerId,
            scheduledTime: scheduledTime.toISOString(),
        });

        if (deliveryPartnerResponse.status === 200) {
            console.log('Successfully sent pickup schedule to delivery partner.');

            for (const ret of returnsToSchedule) {
                ret.status = 'scheduled';
                ret.pickupScheduledTimestamp = scheduledTime;
                ret.deliveryPartnerId = assignedDeliveryPartnerId;
                await ret.save();
            }

            console.log(`Updated ${returnsToSchedule.length} returns to 'scheduled' status.`);
        } else {
            console.error('Failed to schedule with delivery partner:', deliveryPartnerResponse.data);
        }
    } catch (error) {
        console.error('Error during pickup scheduling:', error.message);
    }
}
