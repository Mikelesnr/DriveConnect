const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Customer = require("../models/customer-model");

const handleGetCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleGetCustomerById = async (req, res) => {
  const customerId = req.params.id;

  if (!ObjectId.isValid(customerId)) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleCreateCustomer = async (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided" });
  }

  try {
    const newCustomer = new Customer({
      name,
      email,
      phone,
      address,
    });

    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleUpdateCustomer = async (req, res) => {
  const customerId = req.params.id;
  const { name, email, phone, address } = req.body;

  if (!ObjectId.isValid(customerId)) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { name, email, phone, address },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleDeleteCustomer = async (req, res) => {
  const customerId = req.params.id;

  if (!ObjectId.isValid(customerId)) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    if (!deletedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleGetCustomers,
  handleGetCustomerById,
  handleCreateCustomer,
  handleUpdateCustomer,
  handleDeleteCustomer,
};
