import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getCheckoutItemsByUserId = async (req, res) => {
    const { userId } = req.params; // Get userId from route parameters
  
    try {
      // Query the checkout table for items belonging to the given userId
      const checkoutItems = await prisma.checkout.findMany({
        where: {
          userID: Number(userId), // Ensure userId is a number
        },
        include: {
          product: true, // Include related product details (if needed)
        },
      });
  
      // Check if there are any checkout items
      if (checkoutItems.length === 0) {
        return res.status(404).json({ message: 'No checkout items found for this user.' });
      }
  
      // Return the checkout items
      return res.status(200).json(checkoutItems);
    } catch (error) {
      console.error('Error fetching checkout items:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  