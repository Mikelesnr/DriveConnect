const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories");

router.get("/", 
     /* #swagger.tags = ['Categories']
     #swagger.description = 'Get all categories' */
     categoriesController.handleGetCategories);
     
router.get("/:id", 
     /* #swagger.tags = ['Categories']
     #swagger.description = 'Get a category by ID' */
     categoriesController.handleGetCategoryById);

router.post("/", 
     /* #swagger.tags = ['Categories']
     #swagger.description = 'Create a new category' */
     categoriesController.handleCreateCategory);

router.put("/:id", 
     /* #swagger.tags = ['Categories']
     #swagger.description = 'Update a category by ID' */
     categoriesController.handleUpdateCategory);

router.delete("/:id", 
     /* #swagger.tags = ['Categories']
     #swagger.description = 'Delete a category by ID' */
     categoriesController.handleDeleteCategory);

module.exports = router;
