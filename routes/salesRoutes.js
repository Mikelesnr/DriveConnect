const express = require("express");
const salesController = require("../controllers/salesController.js");
const {protect} = require('../utilities/authMiddleware');

const router = express.Router();

router.post("/", 
    /* #swagger.tags = ['Sales']
     #swagger.description = 'Create a new sale' */
     protect,
     salesController.createSale);
     
router.get("/", 
    /* #swagger.tags = ['Sales']
     #swagger.description = 'Get all sales' */
    protect,
    salesController.getAllSales);

router.get("/:id", 
    /* #swagger.tags = ['Sales']
     #swagger.description = 'Get a sale by ID' */
    protect,
    salesController.getSaleById);

router.put("/:id", 
    /* #swagger.tags = ['Sales']
     #swagger.description = 'Update a sale by ID' */
    protect,
    salesController.updateSale);

router.delete("/:id", 
    /* #swagger.tags = ['Sales']
     #swagger.description = 'Delete a sale' */
    protect,
    salesController.deleteSale);

module.exports = router;
