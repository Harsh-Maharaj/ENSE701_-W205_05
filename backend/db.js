import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectToDb(callback) {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.mqsbp.mongodb.net/SPEEDDB?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    callback();
  } catch (err) {
    console.error('Failed to connect to the database', err);
    process.exit(1); // Exit process with failure
  }
}

export { connectToDb };
