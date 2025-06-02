require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../db");
const models = [
  require("../../models/user-model"),
  require("../../models/employee-model"),
  require("../../models/customer-model"),
  require("../../models/car-model"),
  require("../../models/sale-model"),
  require("../../models/return-model"),
  require("../../models/store-model"),
  require("../../models/category-model"),
];

const initializeDB = async () => {
  await connectDB();
  await Promise.all(models.map((model) => model.syncIndexes()));
  console.log("Collections initialized in MongoDB.");
  process.exit();
};

initializeDB();
