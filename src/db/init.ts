import mongoose, { ConnectOptions } from 'mongoose';

export const connectDB = async () => {
    try {
      const uri = process.env.MONGO_URI || '';
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as ConnectOptions);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };