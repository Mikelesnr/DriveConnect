const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories");
const { protect } = require("../utilities/authMiddleware");


router.get("/", 
     /* #swagger.tags = ['Categories']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Get all categories' */
     protect,
     categoriesController.handleGetCategories);
     
router.get("/:id", 
     /* #swagger.tags = ['Categories']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Get a category by ID' */
     protect,
     categoriesController.handleGetCategoryById);

router.post("/", 
     /* #swagger.tags = ['Categories']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Create a new category' */
     protect,
     categoriesController.handleCreateCategory);

router.put("/:id", 
     /* #swagger.tags = ['Categories']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Update a category by ID' */
     protect,
     categoriesController.handleUpdateCategory);

router.delete("/:id", 
     /* #swagger.tags = ['Categories']
     #swagger.security = [{
         "Authorization": []
     }]
     #swagger.description = 'Delete a category by ID' */
     protect,
     categoriesController.handleDeleteCategory);

module.exports = router;
