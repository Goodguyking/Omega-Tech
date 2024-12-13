import express from 'express';
import {
  addOrUpdateCartItem, // This is the function to add or update the cart item
  getCartItems,
  deleteCartItem,
  checkoutItems,
  checkIfProductInCart,
  updateCartItem, // Function to check if a product exists in the cart
} from '../controllers/cartController';

const router = express.Router();

// Route to check if the product exists in the cart
// This route will check if a product is already in the user's cart.
router.post('/check', async (req, res) => {
  try {
    await checkIfProductInCart(req, res);
  } catch (error) {
    console.error('Error in check if product in cart route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to add or update an item in the cart
// This will either add a new item or update the quantity of an existing item.
router.post('/', async (req, res) => {
  try {
    await addOrUpdateCartItem(req, res);
  } catch (error) {
    console.error('Error in add or update cart item route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch all cart items for a specific user
router.get('/:userId', async (req, res) => {
  try {
    await getCartItems(req, res);
  } catch (error) {
    console.error('Error in get cart items route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete a cart item
router.delete('/:cartId', async (req, res) => {
  try {
    await deleteCartItem(req, res);
  } catch (error) {
    console.error('Error in delete cart item route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to perform checkout
router.post('/checkout', async (req, res) => {
  try {
    await checkoutItems(req, res);
  } catch (error) {
    console.error('Error in checkout route:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.put('/:cartId', async (req, res) => {
  try {
    await updateCartItem(req, res);
  } catch (error) {
    console.error('Error in update cart item route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






export default router;
