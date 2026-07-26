import mongoose from "mongoose";
export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URI);
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
