const express = require("express");
const employeeController = require("../controllers/employeeController.js");
const { isAdmin } = require("../utilities/middleware");
const { protect } = require("../utilities/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  /* #swagger.tags = ['Employees']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Register a new employee (Requires authentication)'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Employee data to create',
        required: true,
        schema: {
            user_id: "654c6d933e144a0d8e9b6a12",
            store_id: "654c6d933e144a0d8e9b6a13",
            status: "active"
        }
     }
     #swagger.responses[201] = {
         description: 'Employee successfully created.',
         schema: { $ref: '#/components/schemas/Employee' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid data provided.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  employeeController.createEmployee
);

router.get(
  "/",
  /* #swagger.tags = ['Employees']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get all employees with role "admin" (Admin only)'
     #swagger.responses[200] = {
         description: 'Successfully retrieved all employees.',
         schema: [{ $ref: '#/components/schemas/Employee' }]
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  isAdmin,
  employeeController.getAllEmployees
);

router.get(
  "/:id",
  /* #swagger.tags = ['Employees']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get an employee by ID (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the employee to retrieve',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'Employee successfully retrieved.',
         schema: { $ref: '#/components/schemas/Employee' }
     }
     #swagger.responses[404] = {
         description: 'Employee not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  employeeController.getEmployeeById
);

router.put(
  "/:id",
  protect,
  /* #swagger.tags = ['Employees']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update an employee by ID (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the employee to update',
        required: true,
        type: 'string'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated employee data',
        required: true,
        schema: {
            user_id: "654c6d933e144a0d8e9b6a12",
            store_id: "654c6d933e144a0d8e9b6a13",
            status: "inactive"
        }
     }
     #swagger.responses[200] = {
         description: 'Employee successfully updated.',
         schema: { $ref: '#/components/schemas/Employee' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid data provided.'
     }
     #swagger.responses[403] = {
         description: 'Access denied: Only admin or the employee can update this record.'
     }
     #swagger.responses[404] = {
         description: 'Employee not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  employeeController.updateEmployee
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Employees']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete an employee by ID by role "admin" (Admin only)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the employee to delete',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'Employee successfully deleted.',
         schema: { message: 'Employee deleted successfully' }
     }
     #swagger.responses[404] = {
         description: 'Employee not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  isAdmin,
  employeeController.deleteEmployee
);

module.exports = router;
