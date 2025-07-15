// smartsho-backend/src/config/db.js
// Database connection configuration
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true, // Deprecated in Mongoose 6.0+
            // useUnifiedTopology: true, // Deprecated in Mongoose 6.0+
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = { connectDB };

