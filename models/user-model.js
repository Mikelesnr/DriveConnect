const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "employee"],
    required: true,
  },
  user_email: { type: String, required: true, unique: true },
  user_password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  user_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
});

module.exports = mongoose.model("User", userSchema);
