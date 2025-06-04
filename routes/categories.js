const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories");

// Get all categories
router.get("/", categoriesController.handleGetCategories);
// Get a category by ID
router.get("/:id", categoriesController.handleGetCategoryById);
// Create a new category
router.post("/", categoriesController.handleCreateCategory);
// Update a category by ID
router.put("/:id", categoriesController.handleUpdateCategory);
// Delete a category by ID
router.delete("/:id", categoriesController.handleDeleteCategory);

module.exports = router;
