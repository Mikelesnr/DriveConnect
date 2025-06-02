const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  category_name: { type: String, required: true },
});

module.exports = mongoose.model("Category", categorySchema);
