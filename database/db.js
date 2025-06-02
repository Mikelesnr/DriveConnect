const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

// Function to connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    // Establish connection using MONGO_URI from environment variables
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB Connected..."); // Log successful connection
  } catch (error) {
    console.error("MongoDB connection failed:", error); // Log error if connection fails
    process.exit(1); // Exit the process to prevent running with a broken database connection
  }
};

module.exports = connectDB;
