const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const { protect } = require("../utilities/authMiddleware");

router.post(
  "/",
  /* #swagger.tags = ['Store']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Create a new store (Requires authentication)' */
  protect,
  storeController.createStore
);

router.get(
  "/",
  /* #swagger.tags = ['Store']
     #swagger.description = 'Get all stores (Public)' */
  storeController.getStores
);

router.get(
  "/filtered",
  /* #swagger.tags = ['Store']
     #swagger.description = 'Get filtered stores (Public)' */
  storeController.getFilteredStores
);

router.get(
  "/:id",
  /* #swagger.tags = ['Store']
     #swagger.description = 'Get a store by ID (Public)' */
  storeController.getStoreById
);

router.put(
  "/:id",
  /* #swagger.tags = ['Store']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update a store (Requires authentication)' */
  protect,
  storeController.updateStore
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Store']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete a store (Requires authentication)' */
  protect,
  storeController.deleteStore
);

module.exports = router;
