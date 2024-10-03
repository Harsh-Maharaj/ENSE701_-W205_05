import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectToDb(callback) {
  const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ense701-w205-05.5b1zs.mongodb.net/?retryWrites=true&w=majority&appName=ENSE701-W205-05`;
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
