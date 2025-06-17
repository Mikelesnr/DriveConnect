const express = require("express");
const router = express.Router();
const carsController = require("../controllers/carController");
const { protect } = require("../utilities/authMiddleware");
const { isAdmin } = require("../utilities/middleware");

router.get(
  "/",
  /* #swagger.tags = ['Cars']
     #swagger.description = 'Get all cars (No authentication required)'
     #swagger.responses[200] = {
         description: 'Successfully retrieved all cars.',
         schema: [{ $ref: '#/components/schemas/Car' }]
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  carsController.handleGetCars
);

router.get(
  "/:id",
  /* #swagger.tags = ['Cars']
     #swagger.description = 'Get car by ID for detailed view (No authentication required)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the car to retrieve',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'Car successfully retrieved.',
         schema: { $ref: '#/components/schemas/Car' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid car ID.'
     }
     #swagger.responses[404] = {
         description: 'Car not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  carsController.handleGetCarById
);

router.post(
  "/",
  protect,
  isAdmin,
  /* #swagger.tags = ['Cars']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Create a new car (Admin only)'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Car data to create',
        required: true,
        schema: {
            make: "Toyota",
            model: "Camry",
            year: 2022,
            price: 25000,
            category_id: "654c6d933e144a0d8e9b6a11",
            color: "Silver",
            status: "available"
        }
     }
     #swagger.responses[201] = {
         description: 'Car successfully created.',
         schema: { $ref: '#/components/schemas/Car' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: All required fields must be provided.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  carsController.handleCreateCar
);

router.put(
  "/:id",
  protect,
  isAdmin,
  /* #swagger.tags = ['Cars']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update a car by ID (Admin only)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the car to update',
        required: true,
        type: 'string'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated car data',
        required: true,
        schema: {
            make: "Honda",
            model: "Civic",
            year: 2023,
            price: 27000,
            category_id: "654c6d933e144a0d8e9b6a11",
            color: "Red",
            status: "sold"
        }
     }
     #swagger.responses[200] = {
         description: 'Car successfully updated.',
         schema: { $ref: '#/components/schemas/Car' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid car ID or invalid data.'
     }
     #swagger.responses[404] = {
         description: 'Car not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  carsController.handleUpdateCar
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Cars']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete a car by ID (Admin only)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the car to delete',
        required: true,
        type: 'string'
     }
     #swagger.responses[204] = {
         description: 'Car successfully deleted (No Content).'
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid car ID.'
     }
     #swagger.responses[404] = {
         description: 'Car not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  isAdmin,
  carsController.handleDeleteCar
);

module.exports = router;
