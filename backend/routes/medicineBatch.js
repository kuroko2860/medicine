const express = require("express");
const router = express.Router();
const medicineBatchController = require("../controllers/medicineBatch");

// Get all medicine batches
router.get("/", medicineBatchController.getAllBatches);

// Get a specific medicine batch by ID
router.get("/:id", medicineBatchController.getBatchByBatchNumber);

// Create a new medicine batch
router.post("/", medicineBatchController.createBatch);

// Update a medicine batch
router.put("/:id", medicineBatchController.updateBatch);

// Delete a medicine batch
router.delete("/:id", medicineBatchController.deleteBatch);

module.exports = router;
