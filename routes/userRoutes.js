const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { protect } = require("../utilities/authMiddleware");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

router.get(
  '/github',
  /* #swagger.tags = ['Users']
     #swagger.description = `
     Redirects the user to GitHub for OAuth login.  
     👉 [Click here to open GitHub OAuth login in a new tab](http://localhost:5000/users/github)
     Not usable via Swagger "Try it out" because it redirects to GitHub.
     `
     #swagger.responses[302] = {
        description: 'Redirect to GitHub for login'
     }
  */
//   passport.authenticate('github', { scope: ['user:email'] })
  passport.authenticate('github', { scope: ['read:user', 'user:email'] })

);

router.get(
  '/github/callback',
  /* #swagger.tags = ['Users']
   #swagger.description = `
     GitHub OAuth callback route.  
     This route is called automatically by GitHub after login.  

     🧠 If accessed normally (browser), user will be redirected to the frontend and JWT stored as cookie.  
     🔧 If accessed via Swagger (adds \`?swagger=true\` or sets Accept: application/json), JWT is returned in response body.

     🪙 Use the JWT in Swagger's "Authorize" button to test protected routes.
   `
   #swagger.security = []
   #swagger.responses[200] = {
     description: 'User successfully logged in. JWT set as cookie and/or returned in response.',
     schema: {
       message: "GitHub login successful",
       token: "JWT_TOKEN_HERE",
       user: {
         id: "user_id",
         email: "user@example.com",
         username: "githubuser",
         role: "user"
       }
     }
   }
*/

  passport.authenticate('github', { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);

    // Always set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    // Detect if request is from Swagger or wants JSON (Accept header or query param)
    const wantsJson =
      req.headers.accept?.includes('application/json') ||
      req.query.swagger === 'true';

    if (wantsJson) {
      return res.status(200).json({
        message: 'GitHub login successful',
        token,
        user: {
          id: req.user._id,
          email: req.user.email,
          username: req.user.username,
          role: req.user.role
        }
      });
    }

    // Redirect to frontend for browser clients
    res.redirect(`${process.env.FRONTEND_URL}/api-docs`);
  }
);


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


module.exports = router