const express = require("express");
const salesController = require("../controllers/salesController.js");
const { protect } = require("../utilities/authMiddleware.js");

const router = express.Router();

router.post(
  "/",
  /* #swagger.tags = ['Sales']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Create a new sale (Requires authentication)'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Sale object to be added',
        required: true,
        schema: {
          "customer_id": "60c72b2f9b1e8b001c8e4c3e",
          "car_id": "654c6d933e144a0d8e9b6a12",
          "employee_id": "654c6d933e144a0d8e9b6a15",
          "payment_method": "card",
        }
     }
     #swagger.responses[201] = {
         description: 'Sale successfully created.',
         schema: { $ref: '#/definitions/Sale' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid sale data.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  salesController.createSale
);

router.get(
  "/",
  /* #swagger.tags = ['Sales']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get all sales (Requires authentication)'
     #swagger.parameters['page'] = {
         in: 'query',
         description: 'Page number for pagination',
         required: false,
         type: 'integer',
         default: 1
     }
     #swagger.parameters['limit'] = {
         in: 'query',
         description: 'Number of items per page',
         required: false,
         type: 'integer',
         default: 10
     }
     #swagger.responses[200] = {
         description: 'Successfully retrieved all sales.',
         schema: [{ $ref: '#/definitions/Sale' }]
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  salesController.getAllSales
);

router.get(
  "/:id",
  /* #swagger.tags = ['Sales']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get a sale by ID (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the sale to retrieve',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'Sale successfully retrieved.',
         schema: { $ref: '#/definitions/Sale' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid sale ID.'
     }
     #swagger.responses[404] = {
         description: 'Sale not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  salesController.getSaleById
);

router.put(
  "/:id",
  /* #swagger.tags = ['Sales']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update a sale by ID (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the sale to update',
        required: true,
        type: 'string'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated sale object',
        required: true,
                schema: {
          "customer_id": "60c72b2f9b1e8b001c8e4c3e",
          "car_id": "654c6d933e144a0d8e9b6a12",
          "employee_id": "654c6d933e144a0d8e9b6a15",
          "payment_method": "card",
        }
     }
     #swagger.responses[200] = {
         description: 'Sale successfully updated.',
         schema: { $ref: '#/definitions/Sale' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid sale ID or invalid data.'
     }
     #swagger.responses[404] = {
         description: 'Sale not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  salesController.updateSale
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Sales']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete a sale (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the sale to delete',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'Sale successfully deleted.',
         schema: { message: 'Sale deleted successfully' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid sale ID.'
     }
     #swagger.responses[404] = {
         description: 'Sale not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  salesController.deleteSale
);

module.exports = router;
