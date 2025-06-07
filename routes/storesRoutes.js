const express = require("express");
const router = express.Router();
const storesController = require("../controllers/storesController");
const { protect } = require("../utilities/authMiddleware");

router.get(
  "/",
  /* #swagger.tags = ['Stores']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Retrieve all stores (Requires authentication)' */
  protect,
  storesController.getAllStores
);

router.get(
  "/:id",
  /* #swagger.tags = ['Stores']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Retrieve a store by ID (Requires authentication)' */
  protect,
  storesController.getStoreById
);

router.post(
  "/",
  /* #swagger.tags = ['Stores']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Create a new store (Requires authentication)' */
  protect,
  storesController.createStore
);

router.put(
  "/:id",
  /* #swagger.tags = ['Stores']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Update a store by ID (Requires authentication)' */
  protect,
  storesController.updateStore
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Stores']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.description = 'Delete a store by ID (Requires authentication)' */
  protect,
  storesController.deleteStore
);

module.exports = router;
