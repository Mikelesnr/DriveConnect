const express = require("express");
const userController = require("../controllers/userController");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {protect} = require('../utilities/authMiddleware');


const router = express.Router();

router.post("/", 
    /* #swagger.tags = ['Users']
     #swagger.description = 'Register a new user' */
    userController.createUser);

router.post("/login", 
    /* #swagger.tags = ['Users']
     #swagger.description = 'Login registered new user' */
    userController.loginUser);

router.get("/", protect,
    /* #swagger.tags = ['Users']
     #swagger.description = 'Get all user' */
    userController.getAllUsers);

router.get("/:id", protect,
    /* #swagger.tags = ['Users']
     #swagger.description = 'Get a user by ID' */
     userController.getUserById);

router.put("/:id", protect,
    /* #swagger.tags = ['Users']
     #swagger.description = 'Update a user' */
     userController.updateUser);

router.delete("/:id", protect,
    /* #swagger.tags = ['Users']
     #swagger.description = 'Delete a user' */
     userController.deleteUser);

router.get('/google', 
    /* #swagger.tags = ['Users']
      #swagger.description = `
      Redirects the user to Google for OAuth login.  
      👉 [Click here to open Google OAuth login in a new tab](http://localhost:5000/google)  
      Not usable within Swagger because it redirects to Google.
      `
      #swagger.security = [{
        "Authorization": []
      }]
      #swagger.responses[302] = {
          description: 'Redirect to Google for login'
      }
    */
    passport.authenticate('google', { scope: ['profile', 'email']}));

router.get('/google/callback', 
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
    passport.authenticate('google', { session: false }),
    (req, res) => {
      const token = generateToken(req.user._id);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });

      res.redirect(`${process.env.FRONTEND_URL}/api-docs`);
    }
);

module.exports = router;
