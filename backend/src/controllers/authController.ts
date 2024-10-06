import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Replace with your actual User model
import bcrypt from 'bcryptjs';

export const signup = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  try {
    // Hash password and create user logic here
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Cast error as Error to access the message property
    res.status(500).json({ message: 'Signup failed', error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // User authentication logic here
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    // Cast error as Error to access the message property
    res.status(500).json({ message: 'Login failed', error: (error as Error).message });
  }
};
