const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customers");

router.get("/", customersController.handleGetCustomers); // Get all customers
router.get("/:id", customersController.handleGetCustomerById); // Get a customer by ID
router.post("/", customersController.handleCreateCustomer); // Create a new customer
router.put("/:id", customersController.handleUpdateCustomer); // Update a customer by ID
router.delete("/:id", customersController.handleDeleteCustomer); // Delete a customer by ID
module.exports = router;
