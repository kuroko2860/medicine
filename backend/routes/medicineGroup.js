const express = require('express');
const router = express.Router();
const medicineGroupController = require('../controllers/medicineGroup');

// Get all medicine groups
router.get('/', medicineGroupController.getAllMedicineGroups);

// Get a specific medicine group by ID
router.get('/:id', medicineGroupController.getMedicineGroupById);

// Create a new medicine group
router.post('/', medicineGroupController.createMedicineGroup);

// Update a medicine group
router.put('/:id', medicineGroupController.updateMedicineGroup);

// Delete a medicine group
router.delete('/:id', medicineGroupController.deleteMedicineGroup);

module.exports = router;
