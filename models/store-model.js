const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  store_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  store_name: { type: String, required: true },
  floor_size: { type: Number },
  status: { type: String, enum: ["open", "closed"], required: true },
});

module.exports = mongoose.model("Store", storeSchema);
