const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customers");

router.get("/", /* #swagger.tags = ['Customers']
     #swagger.description = 'Get all customers' */
     customersController.handleGetCustomers);

router.get("/:id", /* #swagger.tags = ['Customers']
     #swagger.description = 'Get customer by ID' */
     customersController.handleGetCustomerById);

router.post("/", /* #swagger.tags = ['Customers']
     #swagger.description = 'Create a new customer' */
     customersController.handleCreateCustomer);

router.put("/:id", /* #swagger.tags = ['Customers']
     #swagger.description = 'Update a customer by ID' */
     customersController.handleUpdateCustomer);

router.delete("/:id", /* #swagger.tags = ['Customers']
     #swagger.description = 'Delete a customer by ID' */
     customersController.handleDeleteCustomer);

module.exports = router;
