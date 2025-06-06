const User = require("../models/user-model");
const Employee = require("../models/employee-model");
const { hashPassword, comparePassword } = require("../utilities/password");
const { paginate } = require("../utilities");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const expressAsyncHandler = require('express-async-handler');

// Create a new user
const createUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      role,
      user_email,
      user_password,
      confirm_password,
    } = req.body;

    // Check if passwords match
    if (user_password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(user_password);

    // Create the user with hashed password
    const user = new User({
      firstname,
      lastname,
      role,
      user_email,
      user_password: hashedPassword,
      
    });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    // Find the user by email
    const user = await User.findOne({ user_email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await comparePassword(user_password, user.user_password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set JWT as HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send response without token in body
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        email: user.user_email,
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logoutUser = expressAsyncHandler(async (req, res) => {
  // Destroy Passport session (if it exists)
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error during logout', error: err });
    }

    // Clear JWT cookie
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });

    return res.status(200).json({ message: 'User logged out successfully' });
  });
});


// Get all users with pagination (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const paginatedUsers = await paginate(User, page, limit);
    res.json(paginatedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user (Admin or user themselves)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Only allow the actual user or an admin to delete
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== user._id.toString()
    ) {
      return res.status(403).json({
        error: "Access denied: Only admin or the user can delete this account",
      });
    }

    // If the user is an employee, delete their employee profile as well
    if (user.role === "employee") {
      await Employee.findOneAndDelete({ user_id: user._id });
    }

    // Delete the user
    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


// Export all functions at the bottom
module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  // requestPasswordReset,
  // resetPassword,
};
