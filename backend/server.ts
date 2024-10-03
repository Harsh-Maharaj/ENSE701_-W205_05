import express, { Application } from 'express';
import mongoose from 'mongoose';
import articleRoutes from './routes/articles';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());


const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string); // Remove useNewUrlParser and other options
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;


// Use article routes
app.use('/api/articles', articleRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
