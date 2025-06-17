const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const { protect } = require("../utilities/authMiddleware");

router.post(
  "/",
  protect,
  /* #swagger.tags = ['Store']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Create a new store (Requires authentication)'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Store data to create',
        required: true,
        schema: {
            address: "123 Main St",
            phone: "555-123-4567",
            store_name: "Main Branch",
            floor_size: 2500,
            status: "open"
        }
     }
     #swagger.responses[201] = { description: 'Store successfully created.', schema: { $ref: '#/definitions/Store' } }
     #swagger.responses[400] = { description: 'Bad Request: Invalid data provided or missing required fields.' }
     #swagger.responses[500] = { description: 'Internal Server Error.' }
  */
  storeController.createStore
);

router.put(
  "/:id",
  protect,
  /* #swagger.tags = ['Store']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update a store (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the store to update',
        required: true,
        type: 'string'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated store data. All fields are optional for partial updates.',
        required: true,
        schema: {
            address: "456 Oak Ave",
            phone: "555-987-6543",
            store_name: "West Side Branch",
            floor_size: 3000,
            status: "closed"
        }
     }
     #swagger.responses[200] = {
         description: 'Store successfully updated.',
         schema: { $ref: '#/definitions/Store' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid store ID or invalid data.'
     }
     #swagger.responses[404] = {
         description: 'Store not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  storeController.updateStore
);

router.get(
  "/",
  /* #swagger.tags = ['Store']
     #swagger.description = 'Get all stores (Public)'
     #swagger.responses[200] = {
         description: 'Successfully retrieved all stores.',
         schema: [{ $ref: '#/definitions/Store' }]
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  storeController.getStores
);

router.get(
  "/filtered",
  /* #swagger.tags = ['Store']
     #swagger.description = 'Get filtered stores (Public)'
     #swagger.parameters['status'] = {
        in: 'query',
        description: 'Filter by store status (open or closed)',
        required: false,
        type: 'string',
        enum: ['open', 'closed'],
        example: 'open'
     }
     #swagger.parameters['sort'] = {
        in: 'query',
        description: 'Sort by floor size (floor_size_asc or floor_size_desc)',
        required: false,
        type: 'string',
        enum: ['floor_size_asc', 'floor_size_desc'],
        example: 'floor_size_asc'
     }
     #swagger.parameters['search'] = {
        in: 'query',
        description: 'Search by phone number or store name',
        required: false,
        type: 'string',
        example: 'Main'
     }
     #swagger.responses[200] = {
         description: 'Successfully retrieved filtered stores.',
         schema: [{ $ref: '#/definitions/Store' }]
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  storeController.getFilteredStores
);

router.get(
  "/:id",
  /* #swagger.tags = ['Store']
     #swagger.description = 'Get a store by ID (Public)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the store to retrieve',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'Store successfully retrieved.',
         schema: { $ref: '#/definitions/Store' }
     }
     #swagger.responses[404] = {
         description: 'Store not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  storeController.getStoreById
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Store']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete a store (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the store to delete',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'Store successfully deleted.',
         schema: { message: 'Store deleted successfully' }
     }
     #swagger.responses[404] = {
         description: 'Store not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  storeController.deleteStore
);

module.exports = router;
