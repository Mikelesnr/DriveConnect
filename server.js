require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const passport = require("passport");
require("./config/passport");
const session = require("express-session");
const app = express();

// Connect to MongoDB
connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET, // <--- IMPORTANT: SET THIS IN YOUR .env FILE!
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Optional: Session expires in 24 hours (milliseconds)
      // secure: process.env.NODE_ENV === 'production' // Set to true in production with HTTPS
    },
  })
);
// Passport configuration
app.use(passport.initialize());
// Use Passport session
app.use(passport.session());
// Middleware Section
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieparser()); // Parse cookies

// CORS
app.use(cors());

// CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token, z-key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

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
