import express from 'express';
import { registerUser, loginUser, getAllUsers, updateUser } from '../controllers/userController';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    console.log('Register route hit');
    try {
      await registerUser(req, res);
    } catch (error) {
      console.error('Error in register route:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Login route
router.post('/login', async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    console.error('Error in login route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to get all users
router.get('/users', async (req, res) => {
  try {
    await getAllUsers(req, res);
  } catch (error) {
    console.error('Error in fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update a user
router.put('/users/:id', async (req, res) => {
  try {
    await updateUser(req, res);
  } catch (error) {
    console.error('Error in update user route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
export default router;
