const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer; // This will hold the instance of MongoMemoryServer

/**
 * Function to connect to an in-memory MongoDB for testing purposes.
 * This ensures tests run in an isolated environment without affecting your main database.
 */
const connectTestDB = async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
      // These options might not be strictly necessary for MongoMemoryServer
      // but are often included for consistency with standard Mongoose connections.
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log("MongoDB In-Memory Connected for Testing...");
  } catch (error) {
    console.error("MongoDB Test connection failed:", error);
    throw error; // Re-throw to ensure tests fail if connection to in-memory DB fails
  }
};

/**
 * Function to disconnect from the in-memory MongoDB.
 * It also stops the in-memory server, freeing up resources.
 */
const disconnectTestDB = async () => {
  try {
    await mongoose.disconnect(); // Disconnect Mongoose from the current connection
    if (mongoServer) {
      // If an in-memory server was started, stop it
      await mongoServer.stop();
      console.log("MongoDB In-Memory Server Stopped...");
    }
    console.log("MongoDB Disconnected...");
  } catch (error) {
    console.error("Error disconnecting from MongoDB Test DB:", error);
    // In test environment, usually just logging an error is sufficient, not exiting the process
  }
};

module.exports = { connectTestDB, disconnectTestDB };
