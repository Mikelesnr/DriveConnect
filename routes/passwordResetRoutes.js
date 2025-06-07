const express = require("express");
const router = express.Router();
const resetController = require("../controllers/resetPassword");

router.post(
  "/requestpassword-reset",
  /* #swagger.tags = ['Reset Password']
     #swagger.description = 'Request a password reset' */
  resetController.requestPasswordReset
);

router.post(
  "/resetpassword/:token",
  /* #swagger.tags = ['Reset Password']
     #swagger.description = 'Reset a password' */
  resetController.resetPassword
);

module.exports = router;
