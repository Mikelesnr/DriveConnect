const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Customer", customerSchema);
