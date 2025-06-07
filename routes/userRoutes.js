const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { protect } = require("../utilities/authMiddleware");

router.post(
  "/",
  /* #swagger.tags = ['Users']
     #swagger.description = 'Register a new user (No authentication required)' */
  userController.createUser
);

router.post(
  "/login",
  /* #swagger.tags = ['Users']
     #swagger.description = 'Login registered user (No authentication required)' */
  userController.loginUser
);

router.get(
  "/",
  /* #swagger.tags = ['Users']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get all users (Requires authentication)' */
  protect,
  userController.getAllUsers
);

router.get(
  "/:id",
  /* #swagger.tags = ['Users']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get a user by ID (Requires authentication)' */
  protect,
  userController.getUserById
);

router.put(
  "/:id",
  /* #swagger.tags = ['Users']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update a user (Requires authentication)' */
  protect,
  userController.updateUser
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Users']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete a user (Requires authentication)' */
  protect,
  userController.deleteUser
);

router.get(
  "/google",
  /* #swagger.tags = ['Users']
     #swagger.description = `
     Redirects the user to Google for OAuth login.  
     👉 [Click here to open Google OAuth login in a new tab](http://localhost:5000/users/google)  
     Not usable within Swagger because it redirects to Google.
     `
     #swagger.responses[302] = {
         description: 'Redirect to Google for login'
     }
   */
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  /* #swagger.tags = ['Users']
     #swagger.description = `
     Google OAuth callback route.  
     This route is called **automatically by Google** after login.  
     You do not need to call it manually.
     `
     #swagger.responses[200] = {
         description: 'User successfully logged in via Google, JWT set as cookie'
     }
   */
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.redirect(`${process.env.FRONTEND_URL}/api-docs`);
  }
);

module.exports = router;
