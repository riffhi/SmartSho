// smartsho-backend/src/config/index.js
// Central configuration file (can be used for other global settings)
module.exports = {
    // Define the threshold for auto-pickup scheduling
    PICKUP_THRESHOLD: 50,
    // Define the GreenBits earned per recycled package
    GREENBITS_PER_PACKAGE: 10,
    // Define geographical area granularity for pickup threshold (e.g., 'pincode', 'city', 'zone')
    // This will determine how you group returns for the 50+ threshold.
    AREA_GRANULARITY: 'pincode',
    // Mock delivery partner API URL (replace with actual URL in production)
    DELIVERY_PARTNER_API_URL: 'https://mock-delivery-partner.com/api',
    // Add other configurations as needed
};

