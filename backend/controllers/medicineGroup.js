const { Int } = require("mssql");
const MedicineGroup = require("../services/medicineGroup");
const Medicine = require("../services/medicine");

async function getAllMedicineGroups(req, res) {
  try {
    const medicineGroups = await MedicineGroup.getAllMedicineGroups();
    res.json(medicineGroups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getMedicineGroupById(req, res) {
  try {
    const medicineGroup = await MedicineGroup.getMedicineGroupById(
      req.params.id
    );
    if (medicineGroup) {
      res.json(medicineGroup);
    } else {
      res.status(404).json({ message: "Medicine group not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createMedicineGroup(req, res) {
  try {
    const newMedicineGroup = req.body;
    if (newMedicineGroup.name) {
      const existingMedicineGroup = await MedicineGroup.getMedicineGroupByName(
        newMedicineGroup.name
      );
      if (existingMedicineGroup) {
        res.status(400).json({ message: "Name already exists" });
        return;
      }
    }
    const result = await MedicineGroup.createMedicineGroup(newMedicineGroup);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateMedicineGroup(req, res) {
  try {
    const updatedMedicineGroup = req.body;
    const result = await MedicineGroup.updateMedicineGroup(
      parseInt(req.params.id, 10),
      updatedMedicineGroup
    );
    if (result.rowsAffected[0] > 0) {
      res.json({ message: "Medicine group updated successfully" });
    } else {
      res.status(404).json({ message: "Medicine group not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteMedicineGroup(req, res) {
  try {
    await Medicine.deleteMedicineByGroupId(req.params.id);
    const result = await MedicineGroup.deleteMedicineGroup(req.params.id);
    if (result.rowsAffected[0] > 0) {
      res.json({ message: "Medicine group deleted successfully" });
    } else {
      res.status(404).json({ message: "Medicine group not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllMedicineGroups,
  getMedicineGroupById,
  createMedicineGroup,
  updateMedicineGroup,
  deleteMedicineGroup,
};
