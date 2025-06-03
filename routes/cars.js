const express = require("express");
const router = express.Router();
const carsController = require("../controllers/cars");

router.get("/", carsController.handleGetCars); // Get all cars
router.get("/:id", carsController.handleGetCarById); // Get a car by ID
router.post("/", carsController.handleCreateCar); // Create a new car
router.put("/:id", carsController.handleUpdateCar); // Update a car by ID
router.delete("/:id", carsController.handleDeleteCar); // Delete a car by ID

module.exports = router;
