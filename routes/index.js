const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");

const userRoutes = require("./userRoutes");
const salesRoutes = require("./salesRoutes");
const employeeRoutes = require("./employeeRoutes");
const customersRoutes = require("./customersRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const carsRoutes = require("./carsRoutes");

// Base Route - Serves the Home Page
router.get("/", 
    /* #swagger.tags = ['Base']
     #swagger.description = 'Serve the home page' */
     indexController.handleIndex);

router.use("/users", userRoutes);
router.use("/sales", salesRoutes);
router.use("/employees", employeeRoutes);
router.use("/customers", customersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/cars", carsRoutes);

module.exports = router;
