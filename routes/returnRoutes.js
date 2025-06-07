const express = require("express");
const router = express.Router();
const returnController = require("../controllers/returnController");
const { protect } = require("../utilities/authMiddleware");
const { isAdmin } = require("../utilities/middleware");

router.post(
  "/",
  /* #swagger.tags = ['Returns']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Create sales return records (Requires authentication)' */
  protect,
  returnController.createReturn
);

router.get(
  "/",
  /* #swagger.tags = ['Returns']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get all sales return records (Requires authentication)' */
  protect,
  returnController.getAllReturns
);

router.get(
  "/:id",
  /* #swagger.tags = ['Returns']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get a sales return record by ID (Requires authentication)' */
  protect,
  returnController.getReturnById
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Returns']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete a sales return record by ID (Admin only)' */
  protect,
  isAdmin,
  returnController.deleteReturn
);

module.exports = router;
