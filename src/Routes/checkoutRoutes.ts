import express from 'express';
import {
  addOrUpdateCartItem, // This is the function to add or update the cart item
  getCartItems,
  deleteCartItem,
  checkoutItems,
  checkIfProductInCart,
  updateCartItem, // Function to check if a product exists in the cart
} from '../controllers/cartController';
import { getCheckoutItemsByUserId } from '../controllers/checkoutController';
const router = express.Router();


router.get('/:userId', async (req, res) => {
    try {
      await getCheckoutItemsByUserId(req, res);
    } catch (error) {
      console.error('Error in get checkout items route:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  export default router;