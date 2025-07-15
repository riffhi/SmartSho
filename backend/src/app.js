// smartsho-backend/src/app.js
// Main Express application setup
const express = require('express');
const cors = require('cors'); 
// For handling Cross-Origin Resource Sharing
const errorHandler = require('./middleware/errorHandler'); // Custom error handling middleware

// Import routes
const returnRoutes = require('./routes/returnRoutes');
const greenbitsRoutes = require('./routes/greenbitsRoutes');
const adminRoutes = require('./routes/adminRoutes'); // For internal/delivery partner APIs

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes (adjust as needed for production)
app.use(express.json()); // Parse JSON request bodies

// Route registration
app.use('/api/returns', returnRoutes);
app.use('/api/greenbits', greenbitsRoutes);
app.use('/api/admin', adminRoutes); // Admin routes (e.g., for delivery partner updates)

// Basic route for testing
app.get('/', (req, res) => {
    res.send('SmartSho Recycling Backend is running!');
});

// Global error handler middleware (should be last middleware)
app.use(errorHandler);

module.exports = app;

