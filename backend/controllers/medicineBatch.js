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

    let existingMedicineGroup = await MedicineGroup.getMedicineGroupByName(
      newBatch.medicine_group
    );
    if (!existingMedicineGroup) {
      existingMedicineGroup = await MedicineGroup.createMedicineGroup({
        name: newBatch.medicine_group,
        description: newBatch.medicine_group,
      });
    }
    let existingMedicine = await Medicine.getMedicineByNameAndGroupId(
      newBatch.medicine_name,
      existingMedicineGroup.id
    );
    if (existingMedicine.length == 0) {
      existingMedicine = await Medicine.createMedicine({
        name: newBatch.medicine_name,
        description: newBatch.medicine_name,
        group_id: existingMedicineGroup.id, // Use the groupId from the newMedicineGroup
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
    let existingMedicineGroup = await MedicineGroup.getMedicineGroupByName(
      newBatch.medicine_group
    );
    if (!existingMedicineGroup) {
      existingMedicineGroup = await MedicineGroup.createMedicineGroup({
        name: newBatch.group_name,
        description: newBatch.group_name,
      });
    }
    let existingMedicine = await Medicine.getMedicineByNameAndGroupId(
      newBatch.medicine_name,
      existingMedicineGroup.id
    );
    if (existingMedicine.length == 0) {
      existingMedicine = await Medicine.createMedicine({
        name: newBatch.medicine_name,
        description: newBatch.medicine_name,
        group_id: existingMedicineGroup.id, // Use the groupId from the newMedicineGroup
      });
    }

    const result = await MedicineBatch.updateBatch(req.params.id, {
      ...newBatch,
      medicine_id: existingMedicine.id,
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
