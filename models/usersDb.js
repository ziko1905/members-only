const { Pool } = require("pg");
const { connectionString } = require("pg/lib/defaults");
require("dotenv").config;

const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL,
});

module.exports.getById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return rows[0];
};

module.exports.getByUsername = async (username) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  return rows[0];
};

module.exports.getByEmail = async (email) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return rows[0];
};

module.exports.addUser = async (
  full,
  email,
  password,
  username,
  member = false,
  admin = false
) => {
  await pool.query(
    `INSERT INTO users (full_name, email, password, username, member, admin) VALUES ($1, $2, $3, $4, $5, $6);`,
    [full, email, password, username, member, admin]
  );
};

module.exports.makeMember = async (id) => {
  await pool.query("UPDATE users SET member = true WHERE id = $1;", [id]);
};
