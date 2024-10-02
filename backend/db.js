import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectToDb(callback) {
  const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eajvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
    callback();
  } catch (err) {
    console.error('Failed to connect to the database', err.message); 
    process.exit(1); // Exit process with failure
  }
}

export { connectToDb };
