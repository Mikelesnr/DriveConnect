require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware Section
app.use(express.json()); // Parse incoming JSON requests

// API Documentation Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Primary API Routes (Handled in `routes/index.js`)
app.use("/", require("./routes"));

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
const serverUrl = process.env.SERVER_URL || "http://localhost:3000";
app.listen(PORT, () => {
  console.log(`Server running at ${serverUrl}`);
});
