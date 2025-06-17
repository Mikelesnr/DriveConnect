const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { protect } = require("../utilities/authMiddleware");

// Helper function to generate token for Google OAuth callback
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

router.post(
  "/",
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Register a new user'
     #swagger.description = 'Registers a new user with firstname, lastname, role, email, and password. Passwords must match.'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'User data for registration',
        required: true,
        schema: {
            firstname: 'Jane',
            lastname: 'Doe',
            role: 'employee',
            user_email: 'jane.doe@example.com',
            user_password: 'password123',
            confirm_password: 'password123'
        }
     }
     #swagger.responses[201] = {
         description: 'User created successfully.',
         schema: { $ref: '#/components/schemas/User' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Passwords do not match or other validation error.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  userController.createUser
);

router.post(
  "/login",
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Login registered user'
     #swagger.description = 'Authenticates a registered user with email and password, returning a JWT token in an HTTP-only cookie.'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'User credentials for login',
        required: true,
        schema: {
            user_email: 'john.doe@example.com',
            user_password: 'password123'
        }
     }
     #swagger.responses[200] = {
         description: 'Login successful, JWT set as cookie.',
         schema: {
             type: 'object',
             properties: {
                 message: { type: 'string', example: 'Login successful' },
                 user: {
                     type: 'object',
                     properties: {
                         id: { type: 'string', example: '654c6d933e144a0d8e9b6a11' },
                         firstname: { type: 'string', example: 'John' },
                         lastname: { type: 'string', example: 'Doe' },
                         role: { type: 'string', example: 'employee' },
                         email: { type: 'string', example: 'john.doe@example.com' }
                     }
                 }
             }
         }
     }
     #swagger.responses[401] = {
         description: 'Unauthorized: Invalid email or password.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  userController.loginUser
);

router.post(
  "/logout",
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Logout user'
     #swagger.description = 'Logs out the currently authenticated user by clearing the JWT cookie.'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.responses[200] = {
         description: 'User logged out successfully.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  userController.logoutUser
);

router.get(
  "/",
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get all users'
     #swagger.description = 'Retrieves a paginated list of all users. Requires authentication.'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['page'] = {
        in: 'query',
        description: 'Page number for pagination',
        type: 'integer',
        example: 1
     }
     #swagger.parameters['limit'] = {
        in: 'query',
        description: 'Number of users per page',
        type: 'integer',
        example: 10
     }
     #swagger.responses[200] = {
         description: 'Successfully retrieved all users.'
         }
     }
     #swagger.responses[401] = {
         description: 'Unauthorized: No token provided or invalid token.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  userController.getAllUsers
);

router.get(
  "/:id",
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get a user by ID'
     #swagger.description = 'Retrieves a single user by their ID. Requires authentication.'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the user to retrieve',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'User successfully retrieved.',
         schema: { $ref: '#/components/schemas/User' }
     }
     #swagger.responses[401] = {
         description: 'Unauthorized: No token provided or invalid token.'
     }
     #swagger.responses[404] = {
         description: 'User not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  userController.getUserById
);

router.put(
  "/:id",
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Update a user'
     #swagger.description = 'Updates an existing user by ID. Requires authentication. Only `firstname`, `lastname`, and `role` can be updated via this endpoint.'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the user to update',
        required: true,
        type: 'string'
     }
     #swagger.parameters['body'] = {
         in: 'body',
         description: 'User information to update',
         required: true,
         schema: 	{
            firstname: 'UpdatedJohn',
            lastname: 'UpdatedDoe',
            role: 'admin'
         }
     }
     #swagger.responses[200] = {
         description: 'User successfully updated.',
         schema: { $ref: '#/components/schemas/User' }
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid data provided.'
     }
     #swagger.responses[401] = {
         description: 'Unauthorized: No token provided or invalid token.'
     }
     #swagger.responses[404] = {
         description: 'User not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  userController.updateUser
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Delete a user'
     #swagger.description = 'Deletes a user by ID. Requires authentication. Only an admin or the user themselves can delete an account. If the user is an employee, their employee profile will also be deleted.'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the user to delete',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
         description: 'User successfully deleted.',
         schema: {
             type: 'object',
             properties: {
                 message: { type: 'string', example: 'User deleted successfully' }
             }
         }
     }
     #swagger.responses[401] = {
         description: 'Unauthorized: No token provided or invalid token.'
     }
     #swagger.responses[403] = {
         description: 'Forbidden: Access denied: Only admin or the user can delete this account.'
     }
     #swagger.responses[404] = {
         description: 'User not found.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  protect,
  userController.deleteUser
);

router.get(
  "/google",
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Initiate Google OAuth login'
     #swagger.description = `
     Redirects the user to Google for OAuth login.
     👉 [Click here to open Google OAuth login in a new tab](http://localhost:5000/users/google)
     Not usable within Swagger because it redirects to Google.
     `
     #swagger.responses[302] = {
         description: 'Redirect to Google for login'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error if Google OAuth fails.'
     }
   */
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Google OAuth callback'
     #swagger.description = `
     Google OAuth callback route.
     This route is called **automatically by Google** after successful login.
     You do not need to call it manually.
     Sets a JWT as an HTTP-only cookie and redirects to the frontend API docs.
     `
     #swagger.responses[200] = {
         description: 'User successfully logged in via Google, JWT set as cookie, redirects to API docs.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error if Google OAuth callback fails.'
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
