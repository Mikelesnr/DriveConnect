const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  sale_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  car_id: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  payment_method: {
    type: String,
    enum: ["cash", "card", "loan"],
    required: true,
  },
  sale_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sale", saleSchema);
