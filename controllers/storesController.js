const mongoose = require("mongoose");
const Store = require("../models/store-model");
const ObjectId = mongoose.Types.ObjectId;

// fetching all stores from the database.
const getAllStores = async (req, res) => {
  //#Swagger-tags["Stores"]
  //#Swagger-summary["Get all stores"]
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// fetching a store's details from the database by its ID.
const getStoreById = async (req, res) => {
  //#Swagger-tags["Stores"]
  //#Swagger-summary["Get a store by ID"]
  const storeId = req.params.id;

  if (!ObjectId.isValid(storeId)) {
    return res.status(400).json({ error: "Invalid store ID" });
  }

  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.status(200).json(store);
  } catch (error) {
    console.error("Error fetching store:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//  creating/adding a new store to the database.
const createStore = async (req, res) => {
  //#Swagger-tags["Stores"]
  //#Swagger-summary["Create a new store"]
  const { address, phone, store_name, floor_size, status } = req.body;

  if (!address || !phone || !store_name || !floor_size || !status) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided" });
  }

  try {
    const newStore = new Store({
      address,
      phone,
      store_name,
      floor_size,
      status,
    });

    await newStore.save();
    res.status(201).json(newStore);
  } catch (error) {
    console.error("Error creating store:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// updating a store's details in the database.
const updateStore = async (req, res) => {
  //#Swagger-tags["Stores"]
  //#Swagger-summary["Update a store by ID"]
  const storeId = req.params.id;
  const { address, phone, store_name, floor_size, status } = req.body;

  if (!ObjectId.isValid(storeId)) {
    return res.status(400).json({ error: "Invalid store ID" });
  }

  if (!address || !phone || !store_name || !floor_size || !status) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided" });
  }

  try {
    const updatedStore = await Store.findByIdAndUpdate(
      storeId,
      { address, phone, store_name, floor_size, status },
      { new: true }
    );

    if (!updatedStore) {
      return res.status(404).json({ error: "Store not found" });
    }

    res.status(200).json(updatedStore);
  } catch (error) {
    console.error("Error updating store:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// deleting a store from the database by its ID.
const deleteStore = async (req, res) => {
  //#Swagger-tags["Store"]
  //#Swagger-summary["Delete a store by ID"]
  const storeId = req.params.id;

  if (!ObjectId.isValid(storeId)) {
    return res.status(400).json({ error: "Invalid store ID" });
  }

  try {
    const result = await Store.deleteOne({ _id: storeId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Store not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting store:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
};

