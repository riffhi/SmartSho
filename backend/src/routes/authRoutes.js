// smartsho-backend/src/routes/authRoutes.js
import express from 'express';
import SellerLogin from '../models/SellerLogin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Seller signup route
router.post('/seller-signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const existingSeller = await SellerLogin.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new seller
    const newSeller = new SellerLogin({
      name,
      email,
      password: hashedPassword
    });

    await newSeller.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        sellerId: newSeller._id, 
        email: newSeller.email
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Seller registered successfully',
      token,
      seller: {
        id: newSeller._id,
        name: newSeller.name,
        email: newSeller.email
      }
    });
  } catch (error) {
    console.error('Seller signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Seller login route
router.post('/seller-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find seller by email
    const seller = await SellerLogin.findOne({ email });
    if (!seller) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password - updated to use bcrypt
    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        sellerId: seller._id, 
        email: seller.email
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      seller: {
        id: seller._id,
        name: seller.name,
        email: seller.email
      }
    });
  } catch (error) {
    console.error('Seller login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;