const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicine");

// Get all medicines
router.get("/", medicineController.getAllMedicines);
// Get expired medicines
router.get("/inventory/expired", medicineController.getExpiredMedicines);
// Get medicines expiring soon
router.get(
  "/inventory/expiring/:months",
  medicineController.getMedicinesExpiringSoon
);
router.get("/group/:group_id", medicineController.getMedicinesByGroupId);

// Get inventory stock
router.get("/inventory/stock", medicineController.getInventoryStock);

// Get a specific medicine by ID
router.get("/:id", medicineController.getMedicineById);

// Create a new medicine
router.post("/", medicineController.createMedicine);

// Update a medicine
router.put("/:id", medicineController.updateMedicine);

// Delete a medicine
router.delete("/:id", medicineController.deleteMedicine);

module.exports = router;
