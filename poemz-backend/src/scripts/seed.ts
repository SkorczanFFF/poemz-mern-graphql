import mongoose from "mongoose";
import dotenv from "dotenv";
import seedData from "../utils/seedData";

dotenv.config();

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_DATABASE}.mongodb.net/?retryWrites=true&w=majority`;

const runSeed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("📦 Connected to MongoDB Atlas");

    await seedData();
    console.log("🌱 Database seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

runSeed();
