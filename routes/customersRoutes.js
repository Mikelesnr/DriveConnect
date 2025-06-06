const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customers");
const { protect } = require("../utilities/authMiddleware");


router.get("/", 
     /* #swagger.tags = ['Customers']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Get all customers' */
     protect,
     customersController.handleGetCustomers);

router.get("/:id", 
     /* #swagger.tags = ['Customers']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Get customer by ID' */
     protect,
     customersController.handleGetCustomerById);

router.post("/", 
     /* #swagger.tags = ['Customers']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Create a new customer' */
     protect,
     customersController.handleCreateCustomer);

router.put("/:id", 
     /* #swagger.tags = ['Customers']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Update a customer by ID' */
     protect,
     customersController.handleUpdateCustomer);

router.delete("/:id", 
     /* #swagger.tags = ['Customers']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Delete a customer by ID' */
     protect,
     customersController.handleDeleteCustomer);

module.exports = router;
