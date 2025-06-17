const Employee = require("../models/employee-model");
const { paginate } = require("../utilities"); // Assuming this utility exists

// Create a new employee
const createEmployee = async (req, res) => {
  //#Swagger-tags["Employees"]
  //#swagger.summary = 'Register a new employee'
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all employees (Admin only) with pagination
const getAllEmployees = async (req, res) => {
  //#Swagger-tags["Employees"]
  //#swagger.summary = 'Get all employees'
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const paginatedEmployees = await paginate(
      Employee,
      page,
      limit,
      "user_id store_id"
    );
    res.json(paginatedEmployees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single employee by ID
const getEmployeeById = async (req, res) => {
  //#Swagger-tags["Employees"]
  //#swagger.summary = 'Get an employee by ID'
  try {
    const employee = await Employee.findById(req.params.id).populate(
      "user_id store_id"
    );
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update employee (Only admin or the actual employee can update)
const updateEmployee = async (req, res) => {
  //#Swagger-tags["Employees"]
  //#swagger.summary = 'Update an employee by ID'
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) return res.status(404).json({ error: "Employee not found" });

    // Check if the requester is either the employee or an admin
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== employee.user_id.toString()
    ) {
      return res.status(403).json({
        error:
          "Access denied: Only admin or the employee can update this record",
      });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an employee (Admin only)
const deleteEmployee = async (req, res) => {
  //#Swagger-tags["Employees"]
  //#swagger.summary = 'Delete an employee by ID'
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all functions at the bottom
module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
