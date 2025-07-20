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


// smartsho-backend/src/app.js or server.js

// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());

// // 🔍 Health check
// app.get('/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     message: 'Backend server is running',
//     timestamp: new Date().toISOString(),
//     port: PORT
//   });
// });

// // 🔧 Test route
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'API is working!' });
// });

// // 🧪 Mock database
// const mockReturns = [
//   {
//     id: 'ret_001',
//     userId: '60d0fe4f3b4d5a001c8e0d1d',
//     packageId: 'PKG_ABC_12345',
//     orderId: 'ORD_XYZ_67890',
//     status: 'Pending',
//     greenBitsAwarded: 0,
//     createdAt: new Date('2024-01-15'),
//     pickupLocation: {
//       address: '123 Main St, Anytown',
//       pincode: '123456'
//     }
//   }
// ];

// const mockGreenBits = {
//   '60d0fe4f3b4d5a001c8e0d1d': {
//     balance: 150,
//     transactions: [
//       {
//         id: 'txn_001',
//         type: 'earned',
//         amount: 50,
//         description: 'Return packaging - PKG_ABC_12345',
//         createdAt: new Date('2024-01-15')
//       },
//       {
//         id: 'txn_002',
//         type: 'earned',
//         amount: 100,
//         description: 'Return packaging - PKG_DEF_67890',
//         createdAt: new Date('2024-01-10')
//       }
//     ]
//   }
// };

// // ➕ Create Return Request
// app.post('/api/returns/request', (req, res) => {
//   console.log('Received return request:', req.body);

//   try {
//     const { userId, packageId, orderId, pickupLocation } = req.body;

//     if (!userId || !packageId || !orderId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: userId, packageId, orderId'
//       });
//     }

//     const newReturn = {
//       id: `ret_${Date.now()}`,
//       userId,
//       packageId,
//       orderId,
//       status: 'Pending',
//       greenBitsAwarded: 0,
//       createdAt: new Date(),
//       pickupLocation
//     };

//     mockReturns.push(newReturn);

//     setTimeout(() => {
//       newReturn.status = 'Collected';
//       newReturn.greenBitsAwarded = 25;

//       if (!mockGreenBits[userId]) {
//         mockGreenBits[userId] = { balance: 0, transactions: [] };
//       }

//       mockGreenBits[userId].balance += 25;
//       mockGreenBits[userId].transactions.unshift({
//         id: `txn_${Date.now()}`,
//         type: 'earned',
//         amount: 25,
//         description: `Return packaging - ${packageId}`,
//         createdAt: new Date()
//       });
//     }, 2000);

//     res.json({
//       success: true,
//       message: 'Return request submitted successfully! You will earn 25 GreenBits once processed.',
//       returnId: newReturn.id,
//       estimatedGreenBits: 25
//     });

//   } catch (error) {
//     console.error('Error processing return request:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // 📦 Get Returns by User
// app.get('/api/returns/user/:userId', (req, res) => {
//   const { userId } = req.params;
//   console.log('Fetching returns for user:', userId);

//   try {
//     const userReturns = mockReturns.filter(ret => ret.userId === userId);

//     res.json({
//       success: true,
//       returns: userReturns.map(ret => ({
//         id: ret.id,
//         orderId: ret.orderId,
//         date: ret.createdAt.toISOString().split('T')[0],
//         status: ret.status,
//         greenBits: ret.greenBitsAwarded
//       }))
//     });
//   } catch (error) {
//     console.error('Error fetching returns:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // 💰 Get GreenBits Balance
// app.get('/api/greenbits/balance/:userId', (req, res) => {
//   const { userId } = req.params;
//   console.log('Fetching GreenBits balance for user:', userId);

//   try {
//     const userGreenBits = mockGreenBits[userId] || { balance: 0, transactions: [] };

//     res.json({ success: true, balance: userGreenBits.balance });
//   } catch (error) {
//     console.error('Error fetching balance:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // 🧾 Get GreenBits Transactions
// app.get('/api/greenbits/transactions/:userId', (req, res) => {
//   const { userId } = req.params;
//   console.log('Fetching transactions for user:', userId);

//   try {
//     const userGreenBits = mockGreenBits[userId] || { balance: 0, transactions: [] };

//     res.json({ success: true, transactions: userGreenBits.transactions });
//   } catch (error) {
//     console.error('Error fetching transactions:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // 🎁 Redeem GreenBits
// app.post('/api/greenbits/redeem', (req, res) => {
//   const { userId, amount, rewardType } = req.body;
//   console.log('Processing redemption:', req.body);

//   try {
//     if (!userId || !amount || !rewardType) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields'
//       });
//     }

//     const userGreenBits = mockGreenBits[userId];

//     if (!userGreenBits || userGreenBits.balance < amount) {
//       return res.status(400).json({
//         success: false,
//         message: 'Insufficient GreenBits balance'
//       });
//     }

//     userGreenBits.balance -= amount;
//     userGreenBits.transactions.unshift({
//       id: `txn_${Date.now()}`,
//       type: 'redeemed',
//       amount: -amount,
//       description: `Redeemed: ${rewardType}`,
//       createdAt: new Date()
//     });

//     res.json({
//       success: true,
//       message: `Successfully redeemed ${rewardType}!`,
//       newBalance: userGreenBits.balance
//     });

//   } catch (error) {
//     console.error('Error processing redemption:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // 🔥 Error handler
// app.use((err, req, res, next) => {
//   console.error('Unhandled error:', err);
//   res.status(500).json({ success: false, message: 'Internal server error' });
// });

// // ❌ 404 fallback
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.originalUrl} not found`
//   });
// });

// // ✅ Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Backend server running on http://localhost:${PORT}`);
//   console.log(`📊 Health check: http://localhost:${PORT}/health`);
//   console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
// });

// export default app;
