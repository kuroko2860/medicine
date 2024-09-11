const Medicine = require("../services/medicine");

async function getAllMedicines(req, res) {
  try {
    let medicines = await Medicine.getAllMedicines();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getMedicineById(req, res) {
  try {
    let medicine = await Medicine.getMedicineById(req.params.id);
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createMedicine(req, res) {
  try {
    let newMedicine = req.body;
    const existingMedicine = await Medicine.getMedicineByName(newMedicine.name);
    const sameGroupMedicines = existingMedicine.filter(
      (med) => med.group_id == newMedicine.group_id
    );
    if (sameGroupMedicines.length > 0) {
      res
        .status(400)
        .json({ error: "Medicine name already exists in the same group" });
      return;
    }
    let result = await Medicine.createMedicine(newMedicine);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateMedicine(req, res) {
  try {
    let updatedMedicine = req.body;
    let result = await Medicine.updateMedicine(req.params.id, updatedMedicine);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function deleteMedicine(req, res) {
  try {
    let result = await Medicine.deleteMedicine(req.params.id);
    res.status(200).json("Deleted medicine successed.");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getExpiredMedicines(req, res) {
  try {
    let expiredMedicines = await Medicine.getExpiredMedicines();
    res.json(expiredMedicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getMedicinesExpiringSoon(req, res) {
  try {
    const months = parseInt(req.params.months);
    let medicinesExpiringSoon = await Medicine.getMedicinesExpiringSoon(months);
    res.json(medicinesExpiringSoon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getInventoryStock(req, res) {
  try {
    let inventoryStock = await Medicine.getInventoryStock();
    res.json(inventoryStock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getExpiredMedicines,
  getMedicinesExpiringSoon,
  getInventoryStock,
};
