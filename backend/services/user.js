const { sql, poolPromise } = require("../db");

async function getUserByUsername(username) {
  let pool = await poolPromise;
  let result = await pool
    .request()
    .input("username", sql.NVarChar, username)
    .query("SELECT * FROM users WHERE username = @username");
  return result.recordset[0];
}

async function createUser(user) {
  let pool = await poolPromise;
  let result = await pool
    .request()
    .input("username", sql.NVarChar, user.username)
    .input("password", sql.NVarChar, user.password)
    .input("email", sql.NVarChar, user.email)
    .query(
      "INSERT INTO users (username, password, email) VALUES (@username, @password, @email)"
    );
  return result;
}

module.exports = {
  getUserByUsername,
  createUser,
};
