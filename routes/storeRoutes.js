const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const {protect} = require('../utilities/authMiddleware');

router.post(
    "/", 
    /*
      #swagger.tags = ['Store']
      #swagger.security = [{
        "Authorization": []
      }]
      #swagger.description = 'Create a new store.'
    */
    protect,
    storeController.createStore
);

router.get(
    "/", 
    /*
     #swagger.tags = ['Store']
     #swagger.description = 'Get all stores.'
    */
    storeController.getStores
);

router.get(
    "/filtered",
    /*
      #swagger.tags = ['Store']
      #swagger.description = 'Get filtered stores.'
    */
    storeController.getFilteredStores
);

router.get(
    "/:id",
    /*
      #swagger.tags = ['Store']
      #swagger.description = 'Get a store by ID.'
    */
    storeController.getStoreById
);

router.put(
    "/:id",
    /*
      #swagger.tags = ['Store']
        #swagger.security = [{
          "Authorization": []
        }]
      #swagger.description = 'Update a store.'
    */
    protect,
    storeController.updateStore
);

router.delete(
    "/:id", 
    /*
      #swagger.tags = ['Store']
      #swagger.security = [{
        "Authorization": []
      }]
      #swagger.description = 'Delete a store.'
    */
    protect,
    storeController.deleteStore
);

module.exports = router;
