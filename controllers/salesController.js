const Sale = require("../models/sale-model");
const { paginate } = require("../utilities");

// Create a sale
const createSale = async (req, res) => {
  //#Swagger-tags=["Sales"]
  //#swagger.summary = 'Create a new sale'
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all sales with pagination
const getAllSales = async (req, res) => {
  //#Swagger-tags=["Sales"]
  //#swagger.summary = 'Get all sales'
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const paginatedSales = await paginate(
      Sale,
      page,
      limit,
      "customer_id car_id employee_id"
    );
    res.json(paginatedSales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a sale by ID
const getSaleById = async (req, res) => {
  //#Swagger-tags=["Sales"]
  //#swagger.summary = 'Get a sale by ID'
  try {
    const sale = await Sale.findById(req.params.id).populate(
      "customer_id car_id employee_id"
    );
    if (!sale) return res.status(404).json({ error: "Sale not found" });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a sale
const updateSale = async (req, res) => {
  //#Swagger-tags=["Sales"]
  //#swagger.summary = 'Update a sale by ID'
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!sale) return res.status(404).json({ error: "Sale not found" });
    res.json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a sale
const deleteSale = async (req, res) => {
  //#Swagger-tags=["Sales"]
  //#swagger.summary = 'Delete a sale by ID'
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) return res.status(404).json({ error: "Sale not found" });
    res.json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
