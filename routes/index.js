const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index"); // Import index controller

// Base Route - Serves the Home Page
router.get("/", indexController.handleIndex);

// Cars Route - Serves the Cars Page
router.use("/cars", require("./cars"));
// Customers Route - Serves the Customers Page
router.use("/customers", require("./customers"));

module.exports = router;
