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

// Cars Route - Serves the Cars Page
router.use("/cars", require("./cars"));
// Customers Route - Serves the Customers Page
router.use("/customers", require("./customers"));
// Categories Route - Serves the Categories Page
router.use("/categories", require("./categories"));

module.exports = router;
