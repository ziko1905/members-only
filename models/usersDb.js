const { Pool } = require("pg");
const { connectionString } = require("pg/lib/defaults");
require("dotenv").config;

const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL,
});

module.exports.getByUsername = async (username) => {
  const { rows } = await pool.query(
    `SELECT * FROM usernames WHERE username = $1`,
    [username]
  );
  return rows[0];
};
