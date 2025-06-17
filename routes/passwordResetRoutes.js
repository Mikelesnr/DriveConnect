// passwordResetRoutes.js
const express = require("express");
const router = express.Router();
const resetController = require("../controllers/resetPasswordController");

router.post(
  "/requestpassword-reset",
  /* #swagger.tags = ['Reset Password']
     #swagger.summary = 'Request a password reset link'
     #swagger.description = 'Initiates the password reset process by sending a reset link to the user\'s email.'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'User email to request password reset.',
        required: true,
        schema: {
            type: 'object',
            properties: {
                user_email: { type: 'string', format: 'email', example: 'user@example.com' }
            },
            required: ['user_email']
        }
     }
     #swagger.responses[200] = {
         description: 'Reset link sent to your email.'
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Email is required.'
     }
     #swagger.responses[404] = {
         description: 'No account with that email.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  resetController.requestPasswordReset
);

router.post(
  "/resetpassword/:token",
  /* #swagger.tags = ['Reset Password']
     #swagger.summary = 'Reset user password'
     #swagger.description = 'Resets the user\'s password using a valid reset token.'
     #swagger.parameters['token'] = {
        in: 'path',
        description: 'Password reset token received via email.',
        required: true,
        type: 'string'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'New password and confirmation.',
        required: true,
        schema: {
            type: 'object',
            properties: {
                user_password: { type: 'string', format: 'password', example: 'NewSecurePassword123' },
                confirm_password: { type: 'string', format: 'password', example: 'NewSecurePassword123' }
            },
            required: ['user_password', 'confirm_password']
        }
     }
     #swagger.responses[200] = {
         description: 'Password reset successful.'
     }
     #swagger.responses[400] = {
         description: 'Bad Request: Invalid or expired token, or passwords do not match, or passwords are required.'
     }
     #swagger.responses[500] = {
         description: 'Internal Server Error.'
     }
  */
  resetController.resetPassword
);

module.exports = router;
