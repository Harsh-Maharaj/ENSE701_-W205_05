import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel'; // Import your User model

export const signup = async (email: string, password: string, role: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, role });
  await newUser.save();
  return newUser;
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '1h' }
  );
  return token;
};
