import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const newUser = await authService.signup(email, password, role);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    // Corrected error handling
    res.status(500).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    // Corrected error handling
    res.status(400).json({ message: (error as Error).message });
  }
};
