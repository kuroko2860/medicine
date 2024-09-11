const { sql, poolPromise } = require("../db");

async function getAllMedicineGroups() {
  let pool = await poolPromise;
  let result = await pool.request().query("SELECT * FROM medicine_groups");
  return result.recordset;
}
async function getMedicineGroupById(id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM medicine_groups WHERE id = @id");
    return result.recordset[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getMedicineGroupByName(name) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .query("SELECT * FROM medicine_groups WHERE name = @name");
    return result.recordset[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updateMedicineGroup(id, group) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, group.name)
      .input("description", sql.NVarChar, group.description)
      .query(
        "UPDATE medicine_groups SET name = @name, description = @description WHERE id = @id"
      );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteMedicineGroup(id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM medicine_groups WHERE id = @id");
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function createMedicineGroup(group) {
  let pool = await poolPromise;
  let result = await pool
    .request()
    .input("name", sql.NVarChar, group.name)
    .input("description", sql.NVarChar, group.description)
    .query(
      "INSERT INTO medicine_groups (name, description) OUTPUT INSERTED.* VALUES (@name, @description)"
    );
  return result.recordset[0];
}

module.exports = {
  getAllMedicineGroups,
  getMedicineGroupById,
  createMedicineGroup,
  updateMedicineGroup,
  deleteMedicineGroup,
  getMedicineGroupByName,
};
