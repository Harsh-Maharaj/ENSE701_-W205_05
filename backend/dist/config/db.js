import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Only pass the URI here
        console.log('MongoDB connected successfully.');
    }
    catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit process if connection fails
    }
};
export default connectDB;
