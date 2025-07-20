// smartsho-backend/src/server.js
import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';

// Change PORT from 3000 to 5000
const PORT = process.env.PORT || 5000; // <-- CHANGE THIS LINE

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});