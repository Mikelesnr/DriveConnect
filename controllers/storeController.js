const Store = require("../models/store-model");

const createStore = async (req, res) => {
  //#Swagger-tags["Store"]
  //#swagger.summary = 'Create a new store'
  try {
    const { address, phone, store_name, floor_size, status } = req.body;

    const newStore = new Store({
      address,
      phone,
      store_name,
      floor_size,
      status,
    });

    await newStore.save();
    res.status(201).json(newStore);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getStores = async (req, res) => {
  //#Swagger-tags["Store"]
  //#swagger.summary = 'Get all stores'
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFilteredStores = async (req, res) => {
  //#Swagger-tags["Store"]
  //#swagger.summary = 'Get filtered stores'
  try {
    const { status, sort, search } = req.query;

    let filter = {};
    let sortOption = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { phone: { $regex: search, $options: "i" } },
        { store_name: { $regex: search, $options: "i" } },
      ];
    }

    if (sort === "floor_size_asc") {
      sortOption.floor_size = 1;
    } else if (sort === "floor_size_desc") {
      sortOption.floor_size = -1;
    }

    const stores = await Store.find(filter).sort(sortOption);
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStoreById = async (req, res) => {
  //#Swagger-tags["Store"]
  //#swagger.summary = 'Get store by ID'
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ error: "Store not found" });
    res.json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateStore = async (req, res) => {
  //#Swagger-tags["Store"]
  //#swagger.summary = 'Update a store by ID'
  try {
    const updated = await Store.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Store not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteStore = async (req, res) => {
  //#Swagger-tags["Store"]
  //#swagger.summary = 'Delete a store by ID'
  try {
    const deleted = await Store.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Store not found" });
    res.json({ message: "Store deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createStore,
  getStores,
  getStoreById,
  getFilteredStores,
  updateStore,
  deleteStore,
};
