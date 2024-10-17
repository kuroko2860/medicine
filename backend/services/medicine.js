const { sql, poolPromise } = require("../db");

async function getAllMedicines() {
  try {
    let pool = await poolPromise;
    let result = await pool.request().query("SELECT * FROM medicines");
    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function getMedicineByNameAndGroupName(name, group_name) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("group_name", sql.NVarChar, group_name)
      .query(
        "SELECT medicines.* FROM medicines inner join medicine_groups on medicines.group_id = medicine_groups.id WHERE medicines.name = @name AND medicine_groups.name = @group_name"
      );
    return result.recordset[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getMedicineById(id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM medicines WHERE id = @id");
    return result.recordset[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updateMedicineNameAndGroupId(id, name, group_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, name)
      .input("group_id", sql.Int, group_id)
      .query(
        "UPDATE medicines SET name = @name, [group_id] = @group_id WHERE id = @id"
      );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function getMedicineByName(name) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .query("SELECT * FROM medicines WHERE name = @name");
    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function getMedicineByNameAndGroupId(name, group_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("group_id", sql.Int, group_id)
      .query(
        "SELECT * FROM medicines WHERE name = @name AND [group_id] = @group_id"
      );
    return result.recordset[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function createMedicine(medicine) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("name", sql.NVarChar, medicine.name)
      .input("group_id", sql.Int, medicine.group_id)
      .input("description", sql.NVarChar, medicine.description)
      .query(
        "INSERT INTO medicines (name, [group_id], description) OUTPUT INSERTED.* VALUES (@name, @group_id, @description)"
      );
    return result.recordset[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updateMedicine(id, medicine) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, medicine.name)
      .input("group_id", sql.Int, medicine.group_id)
      .input("description", sql.NVarChar, medicine.description)
      .query(
        "UPDATE medicines SET name = @name, [group_id] = @group_id, description = @description WHERE id = @id"
      );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteMedicineByGroupId(group_id) {
  try {
    let pool = await poolPromise;
    await pool
      .request()
      .input("group_id", sql.Int, group_id)
      .query(
        "DELETE mb FROM medicine_batches mb JOIN medicines m ON mb.medicine_id = m.id WHERE m.[group_id] = @group_id"
      );
    let result = await pool
      .request()
      .input("group_id", sql.Int, group_id)
      .query("DELETE FROM medicines WHERE [group_id] = @group_id");
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function deleteMedicine(id) {
  try {
    let pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM medicine_batches WHERE medicine_id = @id");
    result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM medicines WHERE id = @id");
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Thuốc đã hết hạn
async function getExpiredMedicines() {
  let pool = await poolPromise;
  let result = await pool.request().query(`
        SELECT 
            m.name as medicine_name,
            mg.name as group_name,
            b.batch_number,
            b.expiration_date,
            b.quantity
        FROM 
            medicine_batches b
        JOIN 
            medicines m ON b.medicine_id = m.id
        join
            medicine_groups mg on m.group_id = mg.id
        WHERE 
            b.expiration_date < CURRENT_TIMESTAMP
        ORDER BY 
            b.expiration_date ASC
    `);
  return result.recordset;
}

// Thuốc sắp hết hạn trong X tháng
async function getMedicinesExpiringSoon(months) {
  let pool = await poolPromise;
  let result = await pool.request().input("months", sql.Int, months).query(`
            SELECT 
                m.name AS medicine_name,
                mg.name AS group_name,
                b.batch_number,
                b.expiration_date,
                b.quantity
            FROM 
                medicine_batches b
            JOIN 
                medicines m ON b.medicine_id = m.id
            JOIN
                medicine_groups mg ON m.group_id = mg.id
            WHERE
                b.expiration_date BETWEEN CURRENT_TIMESTAMP AND DATEADD(MONTH, @months, CURRENT_TIMESTAMP)
            ORDER BY 
                b.expiration_date ASC
        `);
  return result.recordset;
}

async function getInventoryStock() {
  let pool = await poolPromise;
  let result = await pool.request().query(`
        SELECT 
            m.name AS medicine_name,
            mg.name AS group_name,
            SUM(b.quantity) AS total_quantity
        FROM 
            medicine_batches b
        JOIN 
            medicines m ON b.medicine_id = m.id
        JOIN
            medicine_groups mg ON m.group_id = mg.id
        GROUP BY 
            m.name, mg.name
        ORDER BY 
            m.name ASC
    `);
  return result.recordset;
}
async function getMedicinesByGroupId(group_id) {
  let pool = await poolPromise;
  let result = await pool
    .request()
    .input("group_id", sql.Int, group_id)
    .query("SELECT * FROM medicines WHERE [group_id] = @group_id");
  return result.recordset;
}
module.exports = {
  getMedicinesByGroupId,
  getMedicineByNameAndGroupName,
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  updateMedicineNameAndGroupId,
  deleteMedicine,
  getMedicineByName,
  getExpiredMedicines,
  getMedicinesExpiringSoon,
  getInventoryStock,
  getMedicineByNameAndGroupId,
  deleteMedicineByGroupId,
};
