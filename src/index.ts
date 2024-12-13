// src/index.ts

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './Routes/authRoutes';
import productRoutes from './Routes/productRoutes';
import cartRoutes from './Routes/cartRoutes';
import checkoutRoutes from './Routes/checkoutRoutes';
dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes


app.use('/api', productRoutes);
app.use('/auth', authRoutes); // Use auth routes

app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
// Root endpoint
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
