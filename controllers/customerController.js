const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Customer = require("../models/customer-model");

// Handle getting all customers
// This function is responsible for fetching all customers from the database.
const handleGetCustomers = async (req, res) => {
  //#Swagger-tags["Customers"]
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handle getting a customer by ID
// This function is responsible for fetching a customer's details from the database by their ID.
const handleGetCustomerById = async (req, res) => {
  //#Swagger-tags["Customers"]
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

// Handle creating a new customer
// This function is responsible for adding a new customer to the database.
const handleCreateCustomer = async (req, res) => {
  //#Swagger-tags["Customers"]
  const { firstname, lastname, email, phone } = req.body;

  if (!firstname || !lastname || !email || !phone) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided" });
  }

  try {
    const newCustomer = new Customer({
      firstname,
      lastname,
      email,
      phone,
    });

    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handle updating a customer
// This function is responsible for updating an existing customer's details in the database.
const handleUpdateCustomer = async (req, res) => {
  //#Swagger-tags["Customers"]
  const customerId = req.params.id;
  const { firstname, lastname, email, phone } = req.body;

  if (!ObjectId.isValid(customerId)) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { firstname, lastname, email, phone },
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

// Handle deleting a customer
// This function is responsible for removing a customer from the database by their ID.
const handleDeleteCustomer = async (req, res) => {
  //#Swagger-tags["Customers"]
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
