const Store = require("../models/store-model");

// @desc Create a new store
// @route POST /api/stores
// @access Public or Protected (if needed)
const createStore = async (req, res) => {
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

// @desc Get all stores
// @route GET /api/stores
// @access Public or Protected (if needed)
const getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get all stores
// @route GET /api/stores
// @access Public or Protected (if needed)
const getFilteredStores = async (req, res) => {
  try {
    const { status, sort, search } = req.query;

    let filter = {};
    let sortOption = {};

    // Filter by status
    if (status) {
      filter.status = status;
    }

    // Search by phone or store_name
    if (search) {
      filter.$or = [
        { phone: { $regex: search, $options: 'i' } },
        { store_name: { $regex: search, $options: 'i' } },
      ];
    }

    // Sort by floor_size (asc or desc)
    if (sort === 'floor_size_asc') {
      sortOption.floor_size = 1;
    } else if (sort === 'floor_size_desc') {
      sortOption.floor_size = -1;
    }

    const stores = await Store.find(filter).sort(sortOption);
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get store by ID
// @route GET /api/stores/:id
// @access Public or Protected
const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ error: "Store not found" });
    res.json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Update store
// @route PUT /api/stores/:id
// @access Public or Protected
const updateStore = async (req, res) => {
  try {
    const updated = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Store not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc Delete store
// @route DELETE /api/stores/:id
// @access Public or Protected
const deleteStore = async (req, res) => {
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
