// smartsho-backend/src/services/returnService.js
// Business logic for return requests

import Return from '../models/Return.js';
import User from '../models/User.js';
import GreenbitsTransaction from '../models/GreenbitsTransaction.js';
import { PICKUP_THRESHOLD, GREENBITS_PER_PACKAGE, AREA_GRANULARITY } from '../config/index.js';
import { triggerPickupScheduling } from './schedulingService.js';

class ReturnService {
  async createReturnRequest(returnData) {
    if (
      !returnData.userId ||
      !returnData.packageId ||
      !returnData.orderId ||
      !returnData.pickupLocation ||
      !returnData.pickupLocation.address ||
      !returnData.pickupLocation.pincode
    ) {
      throw new Error('Missing required return data.');
    }

    const existingReturn = await Return.findOne({ packageId: returnData.packageId });
    if (existingReturn) {
      throw new Error('Return request for this package already exists.');
    }

    const newReturn = new Return(returnData);
    await newReturn.save();

    await this.checkAndTriggerPickupScheduling(newReturn.pickupLocation[AREA_GRANULARITY]);

    return newReturn;
  }

  async getReturnStatus(returnId, userId) {
    const returnDoc = await Return.findById(returnId);
    if (!returnDoc) throw new Error('Return request not found.');

    if (returnDoc.userId.toString() !== userId) {
      throw new Error('Unauthorized access to return status.');
    }

    return returnDoc;
  }

  async checkAndTriggerPickupScheduling(areaIdentifier) {
    const pendingReturnsCount = await Return.countDocuments({
      status: 'requested',
      [`pickupLocation.${AREA_GRANULARITY}`]: areaIdentifier,
    });

    console.log(`Area ${areaIdentifier}: ${pendingReturnsCount} pending returns.`);

    if (pendingReturnsCount >= PICKUP_THRESHOLD) {
      console.log(`Threshold met for area ${areaIdentifier}. Triggering pickup scheduling.`);

      const returnsToSchedule = await Return.find({
        status: 'requested',
        [`pickupLocation.${AREA_GRANULARITY}`]: areaIdentifier,
      });

      await triggerPickupScheduling(returnsToSchedule);
    }
  }

  async markPackageCollected(packageId, deliveryPartnerId, qualityVerified, verificationNotes) {
    const returnDoc = await Return.findOne({ packageId });
    if (!returnDoc) throw new Error('Return request not found for this package ID.');

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

  async markPackageRecycled(packageId) {
    const returnDoc = await Return.findOne({ packageId });
    if (!returnDoc) throw new Error('Return request not found for this package ID.');

    if (returnDoc.status !== 'collected') {
      throw new Error(`Package status is ${returnDoc.status}, cannot mark as recycled.`);
    }

    returnDoc.status = 'recycled';
    returnDoc.recycledTimestamp = new Date();
    returnDoc.greenBitsEarned = GREENBITS_PER_PACKAGE;
    await returnDoc.save();

    await User.findByIdAndUpdate(
      returnDoc.userId,
      { $inc: { greenBitsBalance: GREENBITS_PER_PACKAGE } },
      { new: true }
    );

    const greenbitsTransaction = new GreenbitsTransaction({
      userId: returnDoc.userId,
      type: 'earned',
      amount: GREENBITS_PER_PACKAGE,
      referenceId: returnDoc._id.toString(),
      description: `Earned ${GREENBITS_PER_PACKAGE} GreenBits for recycling package ${packageId}`,
    });

    await greenbitsTransaction.save();

    console.log(
      `Package ${packageId} marked as recycled. ${GREENBITS_PER_PACKAGE} GreenBits issued to user ${returnDoc.userId}.`
    );
    return returnDoc;
  }

  async applySellerRecyclingScoreBoost(sellerId) {
    console.log(`TODO: Implement seller recycling score boost for seller: ${sellerId}`);
  }
}

// ✅ ESM Export
const returnService = new ReturnService();
export default returnService;
