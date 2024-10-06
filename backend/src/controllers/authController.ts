import { Request, Response } from 'express';
import { signup, login } from '../services/authService';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  try {
    const newUser = await signup(email, password, role);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await login(email, password);
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
