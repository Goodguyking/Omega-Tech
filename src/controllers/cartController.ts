import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();





// Check if the product already exists in the user's cart
export const checkIfProductInCart = async (req, res) => {
  const { userID, productID } = req.body;

  try {
    const existingItem = await prisma.cart.findFirst({
      where: {
        userID,
        productID,
      },
    });

    if (existingItem) {
      return res.status(200).json(existingItem); // Product already exists, return it
    } else {
      return res.status(404).json({ message: 'Product not found in cart' }); // No product found
    }
  } catch (error) {
    console.error('Error checking if product exists in cart:', error);
    res.status(500).json({ error: 'Failed to check product in cart' });
  }
};

// Add or update cart item
export const addOrUpdateCartItem = async (req, res) => {
  const { userID, productID, quantity } = req.body;

  try {
    // Check if the product already exists in the user's cart
    const existingItem = await prisma.cart.findFirst({
      where: {
        userID,
        productID,
      },
    });

    if (existingItem) {
      // If product exists, update the quantity
      const updatedItem = await prisma.cart.update({
        where: {
          cartID: existingItem.cartID,
        },
        data: {
          quantity: existingItem.quantity + quantity, // Add the quantity to the existing one
        },
      });

      return res.status(200).json(updatedItem);
    } else {
      // If product doesn't exist, add it to the cart
      const newItem = await prisma.cart.create({
        data: {
          userID,
          productID,
          quantity,
          dateAdded: new Date(),
        },
      });

      return res.status(201).json(newItem);
    }
  } catch (error) {
    console.error('Error adding/updating cart item:', error);
    res.status(500).json({ error: 'Failed to add/update cart item' });
  }
};





export const getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await prisma.cart.findMany({
      where: { userID: Number(userId) },
      include: { product: true },
      // Explicitly remove limit (fetch all)
      take: undefined, 
    });

    return res.status(200).json(cartItems); // Return all cart items
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Remove item from cart
export const removeFromCart = async (req: Request, res: Response) => {
  const { cartID } = req.params;

  try {
    await prisma.cart.delete({
      where: { cartID: parseInt(cartID, 10) },
    });

    return res.status(204).send();
  } catch (error) {
    console.error('Error removing cart item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const updateCartItem = async (req, res) => {
  const { cartId } = req.params;
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).json({ error: 'Quantity is required' });
  }

  try {
    const updatedCartItem = await prisma.cart.update({
      where: { cartID: Number(cartId) },
      data: { quantity },
    });

    return res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const deleteCartItem = async (req, res) => {
  const { cartId } = req.params; // Extract the cart ID from route params

  try {
    // Ensure cartId is valid
    if (!cartId || isNaN(Number(cartId))) {
      return res.status(400).json({ error: 'Invalid cart ID provided.' });
    }

    // Perform the delete operation
    await prisma.cart.delete({
      where: { cartID: Number(cartId) },
    });

    // Return a successful response
    return res.status(204).send(); // 204: No Content
  } catch (error) {
    console.error('Error deleting cart item:', error);

    // Handle specific Prisma errors (e.g., if item not found)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Cart item not found.' });
    }

    // Generic server error
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const checkoutItems = async (req, res) => {
  const { items, paymentMethod, address, phoneNumber, contactPerson } = req.body; // Extract cart item IDs and new fields from request body

  if (!items || !items.length) {
    return res.status(400).json({ error: 'No items provided for checkout.' });
  }

  if (!paymentMethod || !address || !phoneNumber || !contactPerson) {
    return res.status(400).json({
      error: 'Payment method, address, phone number, and contact person are required.',
    });
  }

  try {
    // Fetch cart items based on provided cart IDs
    const cartItems = await prisma.cart.findMany({
      where: {
        cartID: { in: items },
      },
    });

    if (!cartItems.length) {
      return res.status(404).json({ error: 'No matching cart items found.' });
    }

    // Map cart items to Checkout table format, including the new fields
    const checkoutData = cartItems.map((item) => ({
      userID: item.userID,
      productID: item.productID,
      quantity: item.quantity,
      dateAdded: item.dateAdded,
      receiveDate: new Date(),
      paymentMethod: paymentMethod,
      address: address,
      phoneNumber: phoneNumber,
      contactPerson: contactPerson,
    }));

    // Insert items into the Checkout table
    await prisma.checkout.createMany({
      data: checkoutData,
    });

    // Remove transferred items from the Cart table
    await prisma.cart.deleteMany({
      where: {
        cartID: { in: items },
      },
    });

    return res.status(200).json({ message: 'Items checked out successfully.' });
  } catch (error) {
    console.error('Error during checkout:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};




