const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  status: { type: String, enum: ["active", "inactive"], required: true },
});

module.exports = mongoose.model("Employee", employeeSchema);
