const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

const userRoutes = require("./userRoutes");
const salesRoutes = require("./saleRoutes");
const employeeRoutes = require("./employeeRoutes");
const customersRoutes = require("./customerRoutes");
const categoriesRoutes = require("./categoryRoutes");
const carsRoutes = require("./carRoutes");
const swaggerRoutes = require("./swaggerRoutes");
const returnsRoutes = require("./returnRoutes");
const storeRoutes = require("./storeRoutes");
const resetPasswordRoutes = require("./passwordResetRoutes");

// Base Route - Serves the Home Page
router.get(
  "/",
  /* #swagger.tags = ['Base']
     #swagger.description = 'Serve the home page' */
  indexController.handleIndex
);

router.use("/users", userRoutes);
router.use("/sales", salesRoutes);
router.use("/employees", employeeRoutes);
router.use("/customers", customersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/cars", carsRoutes);
router.use("/", swaggerRoutes);
router.use("/", swaggerRoutes);
router.use("/returns", returnsRoutes);
router.use("/store", storeRoutes);
router.use("/resetpassword", resetPasswordRoutes);

module.exports = router;
