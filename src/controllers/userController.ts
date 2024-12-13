import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Register a new user
// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password, role = 'user' } = req.body; // Default role is 'user'

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with role
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'An internal server error occurred' });
  }
};


// Login a user (Admin, Seller, or User)
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Check role and return appropriate response
    if (user.role === 'admin') {
      return res.status(200).json({ message: 'Admin Login successful', user: userWithoutPassword });
    } else if (user.role === 'seller') {
      return res.status(200).json({ message: 'Seller Login successful', user: userWithoutPassword });
    } else {
      return res.status(200).json({ message: 'User Login successful', user: userWithoutPassword });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'An internal server error occurred' });
  }
};


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany(); // Fetch all users from the "user" table
    res.status(200).json({ users }); // Return the users in the response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Update a user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    // Fetch the existing user
    const existingUser = await prisma.user.findUnique({
      where: { userID: parseInt(id) },
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If password is being updated, hash it
    let hashedPassword = existingUser.password;
    if (password && password !== existingUser.password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    // Update user details
    const updatedUser = await prisma.user.update({
      where: { userID: parseInt(id) },
      data: {
        name: name || existingUser.name,
        email: email || existingUser.email,
        password: hashedPassword, // Use the hashed password
        role: role || existingUser.role,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};