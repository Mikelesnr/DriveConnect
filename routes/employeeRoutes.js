const express = require("express");
const employeeController = require("../controllers/employeeController.js");
const { isAdmin } = require("../utilities/middleware");
const { protect } = require("../utilities/authMiddleware");

const router = express.Router();

router.post("/", 
    /* #swagger.tags = ['Employees']
     #swagger.description = 'Register a new employee' */
     protect,
     employeeController.createEmployee);

router.get("/", /* #swagger.tags = ['Employees']
     #swagger.description = 'Get all employees with role "admin"' */
     protect,
     isAdmin, employeeController.getAllEmployees);

router.get("/:id", /* #swagger.tags = ['Employees']
     #swagger.description = 'Get an employee by ID' */
     protect,
     employeeController.getEmployeeById);

router.put("/:id", /* #swagger.tags = ['Employees']
     #swagger.description = 'Update an employee by ID' */
     protect,
     employeeController.updateEmployee);

router.delete("/:id", /* #swagger.tags = ['Employees']
     #swagger.description = 'Delete an employee by ID by role "admin"' */
     protect,
     isAdmin, employeeController.deleteEmployee);

module.exports = router;
