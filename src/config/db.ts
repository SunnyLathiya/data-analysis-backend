import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: "config.env" });

const MONGODB_URI = process.env.MONGO_URL || '';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {

    } as ConnectOptions);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;