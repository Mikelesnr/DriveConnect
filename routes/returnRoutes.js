const express = require("express");
const router = express.Router();
const returnController = require("../controllers/returnController");
const { protect } = require("../utilities/authMiddleware");
const { isAdmin } = require("../utilities/middleware");

router.post(
  "/",
  protect,
  /* #swagger.tags = ['Returns']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Create sales return records (Requires authentication)'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Sales return data',
        required: true,
        schema: {
            sale_id: "60c72b2f9b1e8b001c8e4c3e",
            reason: "Defective product",
            refund_amount: 150.75
        }
     }
     #swagger.responses[201] = {
         description: 'Return created successfully.',
         schema: { $ref: '#/components/schemas/Return' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid data or sale not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  returnController.createReturn
);

router.get(
  "/",
  /* #swagger.tags = ['Returns']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get all sales return records (Requires authentication)'
     #swagger.responses[200] = {
         description: 'Successfully retrieved all returns.',
         schema: [{ $ref: '#/components/schemas/Return' }]
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  returnController.getAllReturns
);

router.get(
  "/:id",
  /* #swagger.tags = ['Returns']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get a sales return record by ID (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the return to retrieve',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'Return successfully retrieved.',
         schema: { $ref: '#/components/schemas/Return' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid return ID.'
     }
     #swagger.responses[404] = {
         description: 'Return not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  returnController.getReturnById
);

router.put(
  "/:id",
  protect,
  /* #swagger.tags = ['Returns']
     #swagger.summary = 'Update a sales return record by ID'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update a sales return record by ID (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the return to update',
        required: true,
        type: 'string'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated return data',
        required: true,
        schema: {
            sale_id: "60c72b2f9b1e8b001c8e4c3e",
            reason: "Customer changed mind",
            refund_amount: 120.00
        }
     }
     #swagger.responses[200] = {
         description: 'Return successfully updated.',
         schema: { $ref: '#/components/schemas/Return' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid return ID or invalid data.'
     }
     #swagger.responses[404] = {
         description: 'Return not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  returnController.updateReturn
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Returns']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete a sales return record by ID (Admin only)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the return to delete',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'Return successfully deleted.',
         schema: { message: 'Return deleted' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid return ID.'
     }
     #swagger.responses[404] = {
         description: 'Return not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  isAdmin,
  returnController.deleteReturn
);

module.exports = router;
