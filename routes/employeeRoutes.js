const express = require("express");
const employeeController = require("../controllers/employeeController.js");
const { isAdmin } = require("../utilities/middleware");
const { protect } = require("../utilities/authMiddleware");

const router = express.Router();

router.post(
  "/",
  /* #swagger.tags = ['Employees']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Register a new employee (Requires authentication)' */
  protect,
  employeeController.createEmployee
);

router.get(
  "/",
  /* #swagger.tags = ['Employees']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get all employees with role "admin" (Admin only)' */
  protect,
  isAdmin,
  employeeController.getAllEmployees
);

router.get(
  "/:id",
  /* #swagger.tags = ['Employees']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get an employee by ID (Requires authentication)' */
  protect,
  employeeController.getEmployeeById
);

router.put(
  "/:id",
  /* #swagger.tags = ['Employees']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update an employee by ID (Requires authentication)' */
  protect,
  employeeController.updateEmployee
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Employees']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete an employee by ID by role "admin" (Admin only)' */
  protect,
  isAdmin,
  employeeController.deleteEmployee
);

module.exports = router;
