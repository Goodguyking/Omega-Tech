import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const prisma = new PrismaClient();

// Configure multer for file uploads
// Create a new product
// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  const { productName, description, price, userID } = req.body;
  const photo = req.file?.filename; // The filename of the uploaded image

  if (!productName || !description || !price || !photo || !userID) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        productName,
        description,
        price: parseFloat(price),
        photo, // Save only the filename of the photo
        userID: parseInt(req.body.userID) // Ensure userID is an integer
      }
    });
    

    return res.status(201).json(newProduct);
  } catch (error: any) {
    console.error('Error creating product:', error); // Log the error here
    return res.status(500).json({ error: 'An internal server error occurred', details: error.message });
  }
};





export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const skip = (page - 1) * limit;

  try {
    const products = await prisma.product.findMany({
      skip,
      take: limit,
    });

    const totalCount = await prisma.product.count();

    return res.status(200).json({
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'An internal server error occurred' });
  }
};

// Fetch a single product by ID
export const getProductById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({ where: { productID: parseInt(id, 10) } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ error: 'An internal server error occurred' });
  }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { productName, description, price, photo } = req.body;

  if (price && (isNaN(price) || parseFloat(price) <= 0)) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: { productID: parseInt(id, 10) },
      data: { productName, description, price: price ? parseFloat(price) : undefined, photo },
    });

    return res.status(200).json(updatedProduct);
  } catch (error: any) {
    console.error('Error updating product:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(500).json({ error: 'An internal server error occurred' });
  }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    await prisma.product.delete({ where: { productID: parseInt(id, 10) } });
    return res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting product:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(500).json({ error: 'An internal server error occurred' });
  }
};

// In your controller (e.g., productController.ts)

// Fetch products by userID
export const getProductsByUserID = async (req: Request, res: Response, userID: number): Promise<Response> => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userID: userID,
      },
    });
    return res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products by userID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
