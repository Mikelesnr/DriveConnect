const express = require("express");
const employeeController = require("../controllers/employeeController");
const { isAdmin } = require("../utilities/middleware");

const router = express.Router();

router.post("/", employeeController.createEmployee);
router.get("/", isAdmin, employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", isAdmin, employeeController.deleteEmployee);

module.exports = router;
