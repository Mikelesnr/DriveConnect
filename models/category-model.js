const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Category", categorySchema);
