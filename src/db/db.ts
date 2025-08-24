const mongoose = require("mongoose");

const DATABASE_URI: string = process.env.DATABASE_URI as string;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
