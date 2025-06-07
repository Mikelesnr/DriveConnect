const express = require("express");
const router = express.Router();
const carsController = require("../controllers/cars");
const { protect } = require("../utilities/authMiddleware");
const { isAdmin } = require("../utilities/middleware");

router.get(
  "/",
  /* #swagger.tags = ['Cars']
     #swagger.description = 'Get all cars (No authentication required)' */
  carsController.handleGetCars
);

router.get(
  "/:id",
  /* #swagger.tags = ['Cars']
     #swagger.description = 'Get car by ID (Requires authentication)' */
  protect,
  carsController.handleGetCarById
);

router.post(
  "/",
  /* #swagger.tags = ['Cars']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Create a new car (Admin only)' */
  protect,
  isAdmin,
  carsController.handleCreateCar
);

router.put(
  "/:id",
  /* #swagger.tags = ['Cars']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update a car by ID (Admin only)' */
  protect,
  isAdmin,
  carsController.handleUpdateCar
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Cars']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete a car by ID (Admin only)' */
  protect,
  isAdmin,
  carsController.handleDeleteCar
);

module.exports = router;
