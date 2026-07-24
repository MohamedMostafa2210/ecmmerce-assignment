import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Ecommerce_MM");

    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}
