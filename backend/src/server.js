// smartsho-backend/src/server.js
// This is the entry point of your Express application.
const app = require('./app');
const { connectDB } = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB and then start the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
        process.exit(1); // Exit process with failure
    });

