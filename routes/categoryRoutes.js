const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoryController");
const { protect } = require("../utilities/authMiddleware");

router.get(
  "/",
  /* #swagger.tags = ['Categories']
     #swagger.description = 'Get all categories (No authentication required)'
     #swagger.responses[200] = {
         description: 'Successfully retrieved all categories.',
         schema: [{ $ref: '#/components/schemas/Category' }]
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  categoriesController.handleGetCategories
);

router.get(
  "/:id",
  /* #swagger.tags = ['Categories']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get a category by ID (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the category to retrieve',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'Category successfully retrieved.',
         schema: { $ref: '#/components/schemas/Category' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid category ID.'
     }
     #swagger.responses[404] = {
         description: 'Category not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  categoriesController.handleGetCategoryById
);

router.post(
  "/",
  /* #swagger.tags = ['Categories']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Create a new category (Requires authentication)'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Category data to create',
        required: true,
        schema: {
            name: 'Sedan',
            description: 'Standard four-door cars'
        }
     }
     #swagger.responses[201] = {
         description: 'Category successfully created.',
         schema: { $ref: '#/components/schemas/Category' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Category name is required.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  categoriesController.handleCreateCategory
);

router.put(
  "/:id",
  /* #swagger.tags = ['Categories']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update a category by ID (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the category to update',
        required: true,
        type: 'string'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated category data',
        required: true,
        schema: {
            name: 'Sports Car',
            description: 'High-performance vehicles.'
        }
     }
     #swagger.responses[200] = {
         description: 'Category successfully updated.',
         schema: { $ref: '#/components/schemas/Category' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid category ID or invalid data.'
     }
     #swagger.responses[404] = {
         description: 'Category not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  categoriesController.handleUpdateCategory
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Categories']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete a category by ID (Requires authentication)'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the category to delete',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'Category successfully deleted.',
         schema: { message: 'Category deleted successfully' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid category ID.'
     }
     #swagger.responses[404] = {
         description: 'Category not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  categoriesController.handleDeleteCategory
);

module.exports = router;
