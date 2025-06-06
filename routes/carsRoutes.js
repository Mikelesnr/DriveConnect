const express = require("express");
const router = express.Router();
const carsController = require("../controllers/cars");

router.get("/", 
    /* #swagger.tags = ['Cars']
     #swagger.description = 'Get all cars' */
     carsController.handleGetCars); // 

router.get("/:id", /* #swagger.tags = ['Cars']
     #swagger.description = 'Get cars by ID' */
     carsController.handleGetCarById);

router.post("/", 
    /* #swagger.tags = ['Cars']
     #swagger.description = 'Create a new car' */
     carsController.handleCreateCar);

router.put("/:id", /* #swagger.tags = ['Cars']
     #swagger.description = 'Update a car by ID' */
     carsController.handleUpdateCar);

router.delete("/:id", /* #swagger.tags = ['Cars']
     #swagger.description = 'Delete a car by ID' */
     carsController.handleDeleteCar); // Delete a car by ID

module.exports = router;
