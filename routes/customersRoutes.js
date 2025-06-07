const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customers");
const { protect } = require("../utilities/authMiddleware");

router.get(
  "/",
  /* #swagger.tags = ['Customers']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get all customers (Requires authentication)' */
  protect,
  customersController.handleGetCustomers
);

router.get(
  "/:id",
  /* #swagger.tags = ['Customers']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get customer by ID (Requires authentication)' */
  protect,
  customersController.handleGetCustomerById
);

router.post(
  "/",
  /* #swagger.tags = ['Customers']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Create a new customer (Requires authentication)' */
  protect,
  customersController.handleCreateCustomer
);

router.put(
  "/:id",
  /* #swagger.tags = ['Customers']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update a customer by ID (Requires authentication)' */
  protect,
  customersController.handleUpdateCustomer
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Customers']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete a customer by ID (Requires authentication)' */
  protect,
  customersController.handleDeleteCustomer
);

module.exports = router;
