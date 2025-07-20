// smartsho-backend/src/config/index.js
// Central configuration file (can be used for other global settings)

// Change module.exports to named exports
export const PICKUP_THRESHOLD = 1;
export const GREENBITS_PER_PACKAGE = 10;
export const AREA_GRANULARITY = 'pincode';
export const DELIVERY_PARTNER_API_URL = 'https://mock-delivery-partner.com/api';
// Add other configurations as needed

// If you had other configurations that you wanted to group and export as a single object,
// you could also do something like:
/*
const config = {
    PICKUP_THRESHOLD: 50,
    GREENBITS_PER_PACKAGE: 10,
    AREA_GRANULARITY: 'pincode',
    DELIVERY_PARTNER_API_URL: 'https://mock-delivery-partner.com/api',
};
export default config; // Then import as: import config from '../config/index.js';
*/
// But for individual constants, named exports (as above) are generally preferred for clarity.