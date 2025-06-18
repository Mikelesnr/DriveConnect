const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Category = require("../models/category-model");

// Handle getting all categories
// This function is responsible for fetching all categories from the database.
const handleGetCategories = async (req, res) => {
  //#Swagger-tags["Categories"]
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handle getting a category by ID
// This function is responsible for fetching a category's details from the database by its ID.
const handleGetCategoryById = async (req, res) => {
  //#Swagger-tags["Categories"]
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handle creating a new category
// This function is responsible for adding a new category to the database.
const handleCreateCategory = async (req, res) => {
  //#Swagger-tags["Categories"]
  const { category_name, description } = req.body; // Changed 'name' to 'category_name'

  if (!category_name) {
    // Changed 'name' to 'category_name'
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const newCategory = new Category({ category_name, description }); // Directly use category_name
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handle updating a category by ID
// This function is responsible for updating an existing category in the database.

const handleUpdateCategory = async (req, res) => {
  //#Swagger-tags["Categories"]

  const { id } = req.params;
  const { category_name, description } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { category_name, description },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handle deleting a category by ID
// This function is responsible for removing a category from the database.
const handleDeleteCategory = async (req, res) => {
  //#Swagger-tags["Categories"]
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  handleGetCategories,
  handleGetCategoryById,
  handleCreateCategory,
  handleUpdateCategory,
  handleDeleteCategory,
};
