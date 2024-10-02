const MedicineBatch = require("../services/medicineBatch");
const MedicineGroup = require("../services/medicineGroup");
const Medicine = require("../services/medicine");

async function getAllBatches(req, res) {
  try {
    const batches = await MedicineBatch.getAllBatches();
    res.json(batches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getBatchByBatchNumber(req, res) {
  try {
    const batch = await MedicineBatch.getBatchByBatchNumber(req.params.id);
    if (batch) {
      res.json(batch);
    } else {
      res.status(404).json({ message: "Medicine batch not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createBatch(req, res) {
  try {
    const newBatch = req.body;
    //
    const existingBatch = await MedicineBatch.getBatchByBatchNumber(
      newBatch.batch_number
    );
    if (existingBatch) {
      return res.status(400).json({ message: "Batch number already exists" });
    }

    let existingMedicine = await Medicine.getMedicineByNameAndGroupId(
      newBatch.medicine_name,
      newBatch.group_id
    );
    if (!existingMedicine) {
      existingMedicine = await Medicine.createMedicine({
        name: newBatch.medicine_name,
        description: newBatch.medicine_name,
        group_id: newBatch.group_id, // Use the groupId from the newMedicineGroup
      });
    }

    const result = await MedicineBatch.createBatch({
      ...newBatch,
      medicine_id: existingMedicine.id,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateBatch(req, res) {
  try {
    const newBatch = req.body;

    await Medicine.updateMedicineNameAndGroupId(
      newBatch.medicine_id,
      newBatch.medicine_name,
      newBatch.group_id
    );

    const result = await MedicineBatch.updateBatch(req.params.id, {
      ...newBatch,
    });
    if (result.rowsAffected[0] > 0) {
      res.json({ message: "Medicine batch updated successfully" });
    } else {
      res.status(404).json({ message: "Medicine batch not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteBatch(req, res) {
  try {
    const result = await MedicineBatch.deleteBatch(req.params.id);
    if (result.rowsAffected[0] > 0) {
      res.json({ message: "Medicine batch deleted successfully" });
    } else {
      res.status(404).json({ message: "Medicine batch not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllBatches,
  getBatchByBatchNumber,
  createBatch,
  updateBatch,
  deleteBatch,
};
