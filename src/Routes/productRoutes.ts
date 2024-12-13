import express from 'express';
import multer from 'multer';
import { createProduct, getAllProducts, getProductsByUserID, getProductById, updateProduct, deleteProduct } from '../controllers/productController';

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Directory where files should be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Unique filename
  },
});
const upload = multer({ storage }).single('photo');  // 'photo' is the key used for the uploaded file

const router = express.Router();

// Route to create a product
router.post('/products', upload, async (req, res) => {
  try {
    await createProduct(req, res);
  } catch (error) {
    console.error('Error in create product route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch all products with pagination
router.get('/products', async (req, res) => {
  try {
    // If `userID` is provided as a query parameter, fetch products for that user
    const userID = req.query.userID ? parseInt(req.query.userID as string) : null;
    if (userID) {
      await getProductsByUserID(req, res, userID);
    } else {
      await getAllProducts(req, res);
    }
  } catch (error) {
    console.error('Error in get all products route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    await getProductById(req, res);
  } catch (error) {
    console.error('Error in get product by ID route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update a product by ID
router.put('/products/:id', async (req, res) => {
  try {
    await updateProduct(req, res);
  } catch (error) {
    console.error('Error in update product route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete a product by ID
router.delete('/products/:id', async (req, res) => {
  try {
    await deleteProduct(req, res);
  } catch (error) {
    console.error('Error in delete product route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
