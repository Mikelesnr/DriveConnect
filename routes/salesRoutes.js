const express = require("express");
const salesController = require("../controllers/salesController.js");
const { protect } = require("../utilities/authMiddleware");

const router = express.Router();

router.post(
  "/",
  /* #swagger.tags = ['Sales']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Create a new sale (Requires authentication)' */
  protect,
  salesController.createSale
);

router.get(
  "/",
  /* #swagger.tags = ['Sales']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get all sales (Requires authentication)' */
  protect,
  salesController.getAllSales
);

router.get(
  "/:id",
  /* #swagger.tags = ['Sales']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Get a sale by ID (Requires authentication)' */
  protect,
  salesController.getSaleById
);

router.put(
  "/:id",
  /* #swagger.tags = ['Sales']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update a sale by ID (Requires authentication)' */
  protect,
  salesController.updateSale
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Sales']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete a sale (Requires authentication)' */
  protect,
  salesController.deleteSale
);

module.exports = router;
