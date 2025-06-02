const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  car_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  color: { type: String },
  status: {
    type: String,
    enum: ["available", "sold", "reserved"],
    required: true,
  },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Car", carSchema);
