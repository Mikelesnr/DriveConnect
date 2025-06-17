// seed.js
const mongoose = require("mongoose");
const connectDB = require("./database/db"); // Assuming db.js is in the same directory

// Import models
const Customer = require("./models/customer-model");
const Employee = require("./models/employee-model");
const Store = require("./models/store-model");
const Sale = require("./models/sale-model");
const Car = require("./models/car-model");
const Category = require("./models/category-model");
const Return = require("./models/return-model");
// Assuming you have a User model, if not, create one
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    role: { type: String, enum: ["admin", "employee"], required: true },
    user_email: { type: String, required: true, unique: true },
    user_password: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  })
);

// Load seed data from JSON files
const storeSeedData = require("./seedData/store_seed.json");
const saleSeedData = require("./seedData/sale_seed.json");
const returnSeedData = require("./seedData/return_seed.json");

// Placeholder data for models without provided seed files
const categorySeedData = [
  { category_name: "Sedan", description: "Four-door passenger car" },
  { category_name: "SUV", description: "Sport Utility Vehicle" },
  { category_name: "Truck", description: "Pickup truck" },
  { category_name: "Coupe", description: "Two-door car" },
  {
    category_name: "Hatchback",
    description: "Car with a hatch-type rear door",
  },
];

const customerSeedData = [
  {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    phone: "111-222-3333",
  },
  {
    firstname: "Jane",
    lastname: "Smith",
    email: "jane.smith@example.com",
    phone: "444-555-6666",
  },
  {
    firstname: "Peter",
    lastname: "Jones",
    email: "peter.jones@example.com",
    phone: "777-888-9999",
  },
];

const userSeedData = [
  {
    firstname: "Admin",
    lastname: "User",
    role: "admin",
    user_email: "admin@example.com",
    user_password: "password123",
  },
  {
    firstname: "Employee",
    lastname: "One",
    role: "employee",
    user_email: "employee1@example.com",
    user_password: "password123",
  },
];

// Main seeding function
const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Clearing existing data...");
    await Customer.deleteMany({});
    await Employee.deleteMany({});
    await Store.deleteMany({});
    await Sale.deleteMany({});
    await Car.deleteMany({});
    await Category.deleteMany({});
    await Return.deleteMany({});
    await User.deleteMany({});

    console.log("Seeding Categories...");
    const createdCategories = await Category.insertMany(categorySeedData);
    console.log(`${createdCategories.length} categories seeded.`);

    console.log("Seeding Customers...");
    const createdCustomers = await Customer.insertMany(customerSeedData);
    console.log(`${createdCustomers.length} customers seeded.`);

    console.log("Seeding Stores...");
    const createdStores = await Store.insertMany(storeSeedData);
    console.log(`${createdStores.length} stores seeded.`);

    console.log("Seeding Users...");
    const createdUsers = await User.insertMany(userSeedData);
    console.log(`${createdUsers.length} users seeded.`);

    console.log("Seeding Cars (linking to Categories)...");
    const carSeedData = [
      {
        make: "Toyota",
        model: "Camry",
        year: 2020,
        category_id: createdCategories[0]._id,
        color: "Silver",
        status: "available",
        price: 25000,
      },
      {
        make: "Honda",
        model: "CR-V",
        year: 2021,
        category_id: createdCategories[1]._id,
        color: "Blue",
        status: "available",
        price: 30000,
      },
      {
        make: "Ford",
        model: "F-150",
        year: 2019,
        category_id: createdCategories[2]._id,
        color: "Black",
        status: "sold",
        price: 35000,
      },
      {
        make: "BMW",
        model: "3 Series",
        year: 2022,
        category_id: createdCategories[0]._id,
        color: "White",
        status: "reserved",
        price: 40000,
      },
      {
        make: "Mercedes-Benz",
        model: "GLC",
        year: 2023,
        category_id: createdCategories[1]._id,
        color: "Red",
        status: "available",
        price: 50000,
      },
    ];
    const createdCars = await Car.insertMany(carSeedData);
    console.log(`${createdCars.length} cars seeded.`);

    console.log("Seeding Employees (linking to Users and Stores)...");
    const employeeSeedData = [
      {
        user_id: createdUsers[0]._id,
        store_id: createdStores[0]._id,
        status: "active",
      }, // Admin user linked to first store
      {
        user_id: createdUsers[1]._id,
        store_id: createdStores[1]._id,
        status: "active",
      }, // Employee user linked to second store
    ];
    const createdEmployees = await Employee.insertMany(employeeSeedData);
    console.log(`${createdEmployees.length} employees seeded.`);

    console.log("Seeding Sales (linking to Customers, Cars, and Employees)...");
    // NOTE: The sale_seed.json provided has hardcoded IDs.
    // In a real scenario, you'd want to dynamically assign existing IDs after seeding Customers, Cars, and Employees.
    // For demonstration, we'll try to use the provided data. If these IDs don't match actual _id's in your DB, sales won't link correctly.
    // A more robust seeding would involve picking _id's from createdCustomers, createdCars, and createdEmployees.
    const salesToSeed = saleSeedData.map((sale) => ({
      // You would replace these with actual _id from the created models
      customer_id:
        createdCustomers[Math.floor(Math.random() * createdCustomers.length)]
          ._id,
      car_id: createdCars[Math.floor(Math.random() * createdCars.length)]._id,
      employee_id:
        createdEmployees[Math.floor(Math.random() * createdEmployees.length)]
          ._id,
      payment_method: sale.payment_method,
      sale_date: sale.sale_date,
    }));
    const createdSales = await Sale.insertMany(salesToSeed);
    console.log(`${createdSales.length} sales seeded.`);

    console.log("Seeding Returns (linking to Sales)...");
    // Similar to sales, return_seed.json has hardcoded IDs.
    const returnsToSeed = returnSeedData.map((ret) => ({
      sale_id:
        createdSales[Math.floor(Math.random() * createdSales.length)]._id, // Link to a random created sale
      reason: ret.reason,
      refund_amount: ret.refund_amount,
      return_date: ret.return_date,
    }));
    const createdReturns = await Return.insertMany(returnsToSeed);
    console.log(`${createdReturns.length} returns seeded.`);

    console.log("Database seeding complete!");
  } catch (error) {
    console.error("Database seeding failed:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
