require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

// Import all models
const Car = require('./models/car-model');
const Category = require('./models/category-model');
const Customer = require('./models/customer-model');
const Employee = require('./models/employee-model');
const Return = require('./models/return-model');
const Sale = require('./models/sale-model');
const Store = require('./models/store-model');
const User = require('./models/user-model');

// Load all seed data files
const seedFiles = {
  car: './seedData/car_seed.json',
  category: './seedData/category_seed.json',
  customer: './seedData/customer_seed.json',
  employee: './seedData/employee_seed.json',
  return: './seedData/return_seed.json',
  sale: './seedData/sale_seed.json',
  store: './seedData/store_seed.json',
  user: './seedData/user_seed.json',
};

// Map models to seed keys
const modelMap = {
  car: Car,
  category: Category,
  customer: Customer,
  employee: Employee,
  return: Return,
  sale: Sale,
  store: Store,
  user: User,
};

const args = process.argv.slice(2); 

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ Connected to MongoDB');

    if (args.length === 0) {
      console.log('⚠️  No models specified. (Usage: node seed.js [mapped key])');
      process.exit();
    }

    for (const modelKey of args) {
      const Model = modelMap[modelKey];
      const filePath = seedFiles[modelKey];

      if (!Model || !fs.existsSync(filePath)) {
        console.log(`⛔ Skipping unknown or missing: ${modelKey}`);
        continue;
      }

      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      await Model.deleteMany();
      console.log(`🧹 Cleared old ${modelKey} data`);
      await Model.insertMany(data);
      console.log(`🌱 Seeded ${modelKey} data`);
    }

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seedDB();
