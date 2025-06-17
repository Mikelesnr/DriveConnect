require("dotenv").config();
const User = require("../models/user-model");
const crypto = require("crypto");
const { hashPassword } = require("../utilities/password");
const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const requestPasswordReset = async (req, res) => {
  //#Swagger-tags["Reset Password"]
  //#Swagger-summary["Request a password reset link"]
  const { user_email } = req.body;

  if (!user_email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await User.findOne({ user_email });
    if (!user)
      return res.status(404).json({ error: "No account with that email" });

    // Generate token and hash it
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Set reset token and expiry
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Construct reset URL
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    // Send email
    const transporter = createTransporter();
    await transporter.sendMail({
      to: user.user_email,
      subject: "Password Reset",
      html: `
        <p>You requested a password reset</p>
        <p>Click this link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    return res.json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error("Password reset request error:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong, try again later" });
  }
};

const resetPassword = async (req, res) => {
  //#Swagger-tags["Reset Password"]
  //#Swagger-summary["Reset user password"]
  const { token } = req.params;
  const { user_password, confirm_password } = req.body;

  if (!user_password || !confirm_password) {
    return res
      .status(400)
      .json({ error: "Password and confirmation are required" });
  }

  if (user_password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });

    user.user_password = await hashPassword(user_password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Password reset error:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong, try again later" });
  }
};

module.exports = {
  requestPasswordReset,
  resetPassword,
};
