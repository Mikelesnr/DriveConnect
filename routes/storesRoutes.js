const express = require("express");
const router = express.Router();
const storesController = require("../controllers/storesController");

// Get all stores
router.get("/", storesController.getAllStores); 

// Get a store by ID
router.get("/:id", storesController.getStoreById); 

// Create a new store
router.post("/", storesController.createStore); 

// Update a store by ID
router.put("/:id", storesController.updateStore); 

// Delete a store by ID
router.delete("/:id", storesController.deleteStore); 

module.exports = router;

