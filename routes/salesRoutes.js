const express = require("express");
const salesController = require("../controllers/salesController");

const router = express.Router();

router.post("/", 
    /* #swagger.tags = ['Sales']
     #swagger.description = 'Create a new sale' */
     salesController.createSale);
     
router.get("/", 
    /* #swagger.tags = ['Sales']
     #swagger.description = 'Get all sales' */
    salesController.getAllSales);

router.get("/:id", 
    /* #swagger.tags = ['Sales']
     #swagger.description = 'Get a sale by ID' */
    salesController.getSaleById);

router.put("/:id", 
    /* #swagger.tags = ['Sales']
     #swagger.description = 'Update a sale by ID' */
    salesController.updateSale);

router.delete("/:id", 
    /* #swagger.tags = ['Sales']
     #swagger.description = 'Delete a sale' */
    salesController.deleteSale);

module.exports = router;
