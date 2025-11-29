import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const ToConnect = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // In production, you might want to exit the process
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export default ToConnect;
