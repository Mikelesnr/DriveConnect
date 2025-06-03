const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index"); // Import index controller
const userRoutes = require("./userRoutes.js");
const employeeRoutes = require("./employeeRoutes");
const salesRoutes = require("./salesRoutes");

// Base Route - Serves the Home Page
router.get("/", indexController.handleIndex);

router.use("/users", userRoutes);
router.use("/employees", employeeRoutes);
router.use("/sales", salesRoutes);

module.exports = router;
