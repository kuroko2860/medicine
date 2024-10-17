const { sql, poolPromise } = require("../db");

async function getAllBatches() {
  let pool = await poolPromise;
  let result = await pool.request().query(`
    SELECT 
        mb.*,
        m.name AS medicine_name,
        mg.name AS group_name
    FROM 
        medicine_batches mb
    JOIN 
        medicines m ON mb.medicine_id = m.id
    JOIN 
        medicine_groups mg ON m.group_id = mg.id
  `);
  return result.recordset;
}

async function getBatchByBatchNumber(batch_number) {
  let pool = await poolPromise;
  let result = await pool
    .request()
    .input("batch_number", sql.NVarChar, batch_number).query(`
    SELECT 
        mb.*,
        m.name AS medicine_name,
        mg.name AS group_name
    FROM medicine_batches mb
    JOIN medicines m ON mb.medicine_id = m.id
    JOIN medicine_groups mg ON m.group_id = mg.id
    WHERE 
        mb.batch_number = @batch_number
    `);
  return result.recordset[0];
}

async function createBatch(batch) {
  let pool = await poolPromise;
  let result = await pool
    .request()
    .input("medicine_id", sql.Int, batch.medicine_id)
    .input("batch_number", sql.NVarChar, batch.batch_number)
    .input("expiration_date", sql.Date, batch.expiration_date)
    .input("quantity", sql.Int, batch.quantity)
    .input("medicine_unit", sql.NVarChar, batch.medicine_unit)
    .input("in_price", sql.Int, batch.in_price)
    .input("out_price", sql.Int, batch.out_price)
    .input("date_received", sql.Date, batch.date_received)
    .query(
      "INSERT INTO medicine_batches (medicine_id, batch_number, expiration_date, quantity, date_received, medicine_unit, in_price, out_price) VALUES (@medicine_id, @batch_number, @expiration_date, @quantity, @date_received, @medicine_unit, @in_price, @out_price)"
    );
  return result;
}

async function updateBatch(batch_number, batch) {
  let pool = await poolPromise;
  // console.log(batch);
  let result = await pool
    .request()
    .input("medicine_id", sql.Int, batch.medicine_id)
    .input("batch_number", sql.NVarChar, batch_number)
    .input("expiration_date", sql.Date, batch.expiration_date)
    .input("quantity", sql.Int, batch.quantity)
    .input("medicine_unit", sql.NVarChar, batch.medicine_unit)
    .input("in_price", sql.Int, batch.in_price)
    .input("out_price", sql.Int, batch.out_price)
    .input("date_received", sql.Date, batch.date_received)
    .query(
      "UPDATE medicine_batches SET medicine_id = @medicine_id, medicine_unit = @medicine_unit, in_price = @in_price, out_price = @out_price, expiration_date = @expiration_date, quantity = @quantity, date_received = @date_received WHERE batch_number = @batch_number"
    );
  return result;
}

async function deleteBatch(id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM medicine_batches WHERE id = @id");
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  getAllBatches,
  getBatchByBatchNumber,
  createBatch,
  updateBatch,
  deleteBatch,
};
