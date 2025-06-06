const express = require("express");
const router = express.Router();
const carsController = require("../controllers/cars");
const { protect } = require("../utilities/authMiddleware");
const { isAdmin } = require("../utilities/middleware");

router.get("/", 
    /* #swagger.tags = ['Cars']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Get all cars' */
     protect, isAdmin,
     carsController.handleGetCars); // 

router.get("/:id", 
     /* #swagger.tags = ['Cars']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Get cars by ID' */
     protect, isAdmin,
     carsController.handleGetCarById);

router.post("/", 
    /* #swagger.tags = ['Cars']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Create a new car' */
     protect, isAdmin,
     carsController.handleCreateCar);

router.put("/:id", 
     /* #swagger.tags = ['Cars']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Update a car by ID' */
     protect, isAdmin,
     carsController.handleUpdateCar);

router.delete("/:id", 
     /* #swagger.tags = ['Cars']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Delete a car by ID' */
     protect, isAdmin,
     carsController.handleDeleteCar);

module.exports = router;
