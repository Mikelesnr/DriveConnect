const Return = require("../models/return-model");
const Sale = require("../models/sale-model"); 

// @desc    Create a return
// @route   POST /api/returns
// @access  Protected (e.g., only authenticated users or admins)
const createReturn = async (req, res) => {
  try {
    const { sale_id, reason, refund_amount } = req.body;

    // Optional: Validate that sale_id exists in the Sale collection
    const saleExists = await Sale.findById(sale_id);
    if (!saleExists) {
      return res.status(404).json({ error: "Sale not found" });
    }

    const returnEntry = new Return({
      sale_id,
      reason,
      refund_amount
    });

    await returnEntry.save();
    res.status(201).json({ message: "Return created", return: returnEntry });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get all returns
// @route   GET /api/returns
// @access  Protected (e.g., admin only)
const getAllReturns = async (req, res) => {
  try {
    const returns = await Return.find().populate("sale_id");
    res.json(returns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get a return by ID
// @route   GET /api/returns/:id
// @access  Protected
const getReturnById = async (req, res) => {
  try {
    const returnEntry = await Return.findById(req.params.id).populate("sale_id");
    if (!returnEntry) {
      return res.status(404).json({ error: "Return not found" });
    }
    res.json(returnEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete a return by ID
// @route   DELETE /api/returns/:id
// @access  Admin
const deleteReturn = async (req, res) => {
  try {
    const returnEntry = await Return.findById(req.params.id);
    if (!returnEntry) {
      return res.status(404).json({ error: "Return not found" });
    }

    await returnEntry.deleteOne();
    res.json({ message: "Return deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReturn,
  getAllReturns,
  getReturnById,
  deleteReturn
};
