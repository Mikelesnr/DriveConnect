const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema({
  sale_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sale",
    required: true,
  },
  reason: { type: String, required: true },
  refund_amount: { type: Number, required: true },
  return_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Return", returnSchema);
