const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Store first and last names directly from Google profile
    firstname: {
      type: String,
      required: true, // Google usually provides this
    },
    lastname: {
      type: String,
      required: true, // Google usually provides this
    },
    role: {
      type: String,
      enum: ["admin", "employee", "user"], // Added 'user' as a common default role
      default: "user", // <--- Set a default role for Google users
      required: true, // Keep required, but the default covers it if not provided
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
    },
    user_password: {
      type: String,
      // <--- Make password conditionally required based on authType
      required: function () {
        // Only require a password if the authentication type is 'local'
        return this.authType === "local";
      },
      // Consider 'select: false' for security, so password isn't returned by default queries
      // select: false
    },
    // Add fields for Google-specific data
    googleId: {
      // Store Google's unique ID for this user
      type: String,
      unique: true,
      sparse: true, // Allows null values, so local users don't need a googleId
    },
    profilePicture: {
      // Store the user's Google profile picture URL
      type: String,
      required: false, // Not required for all users
    },
    authType: {
      // To differentiate between local and Google users
      type: String,
      enum: ["local", "google"],
      default: "local", // Default to 'local' if not specified
      required: true,
    },
    // Existing fields
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    // Note: user_id is typically just the Mongoose _id field,
    // if you specifically want a different auto-generated ID, keep this,
    // otherwise, you can rely on Mongoose's default _id.
    user_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("User", userSchema);
