const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories");
const { protect } = require("../utilities/authMiddleware");

router.get(
  "/",
  /* #swagger.tags = ['Categories']
     #swagger.description = 'Get all categories (No authentication required)' */
  categoriesController.handleGetCategories
);

router.get(
  "/:id",
  /* #swagger.tags = ['Categories']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get a category by ID (Requires authentication)' */
  protect,
  categoriesController.handleGetCategoryById
);

router.post(
  "/",
  /* #swagger.tags = ['Categories']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Create a new category (Requires authentication)' */
  protect,
  categoriesController.handleCreateCategory
);

router.put(
  "/:id",
  /* #swagger.tags = ['Categories']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update a category by ID (Requires authentication)' */
  protect,
  categoriesController.handleUpdateCategory
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Categories']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete a category by ID (Requires authentication)' */
  protect,
  categoriesController.handleDeleteCategory
);

module.exports = router;
