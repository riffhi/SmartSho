// smartsho-backend/src/app.js
import express from 'express';
import cors from 'cors';

import errorHandler from './middleware/errorHandler.js';
import returnRoutes from './routes/returnRoutes.js';
import greenbitsRoutes from './routes/greenbitsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js'; 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/returns', returnRoutes);
app.use('/api/greenbits', greenbitsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('SmartSho Recycling Backend is running!');
});

app.use(errorHandler);

export default app;
