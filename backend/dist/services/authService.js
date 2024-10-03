import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel'; // Only import the model from userModel.ts
export const signup = async (email, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();
    return newUser;
};
export const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user)
        throw new Error('User not found');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
        throw new Error('Invalid credentials');
    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
    return token;
};
