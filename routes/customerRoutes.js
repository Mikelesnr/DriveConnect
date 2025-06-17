const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customerController");
const { protect } = require("../utilities/authMiddleware");

router.get(
  "/",
  /* #swagger.tags = ['Customers']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get all customers (Requires authentication)'
     #swagger.responses[200] = {
         description: 'Successfully retrieved all customers.',
         schema: [{ $ref: '#/components/schemas/Customer' }]
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  customersController.handleGetCustomers
);

router.get(
  "/:id",
  /* #swagger.tags = ['Customers']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get customer by ID (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the customer to retrieve',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'Customer successfully retrieved.',
         schema: { $ref: '#/components/schemas/Customer' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid customer ID.'
     }
     #swagger.responses[404] = {
         description: 'Customer not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  customersController.handleGetCustomerById
);

router.post(
  "/",
  /* #swagger.tags = ['Customers']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Create a new customer (Requires authentication)'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Customer data to create',
        required: true,
        schema: {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            phone: '111-222-3333'
        }
     }
     #swagger.responses[201] = {
         description: 'Customer successfully created.',
         schema: { $ref: '#/components/schemas/Customer' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: All required fields must be provided.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  customersController.handleCreateCustomer
);

router.put(
  "/:id",
  /* #swagger.tags = ['Customers']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update a customer by ID (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the customer to update',
        required: true,
        type: 'string'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated customer data',
        required: true,
        schema: {
            firstname: 'Jane',
            lastname: 'Smith',
            email: 'jane.smith@example.com',
            phone: '098-765-4321'
        }
     }
     #swagger.responses[200] = {
         description: 'Customer successfully updated.',
         schema: { $ref: '#/components/schemas/Customer' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid customer ID or invalid data.'
     }
     #swagger.responses[404] = {
         description: 'Customer not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  customersController.handleUpdateCustomer
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Customers']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete a customer by ID (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the customer to delete',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'Customer successfully deleted.',
         schema: { message: 'Customer deleted successfully' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid customer ID.'
     }
     #swagger.responses[404] = {
         description: 'Customer not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  customersController.handleDeleteCustomer
);

module.exports = router;
