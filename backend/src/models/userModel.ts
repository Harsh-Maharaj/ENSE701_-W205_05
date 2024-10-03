import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/userInterface';

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

export default mongoose.model<IUser>('User', userSchema); // Export the Mongoose model only
