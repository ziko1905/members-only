const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL,
});

module.exports.newMessage = async (title, content, timestamp, authorId) => {
  await pool.query(
    `INSERT INTO messages (timestamp, title, content, author_id) VALUES ($1, $2, $3, $4)`,
    [timestamp, title, content, authorId]
  );
};

module.exports.getMessages = async () => {
  const { rows } = await pool.query(`SELECT * FROM messages;`);
  return rows;
};

module.exports.deleteById = async (id) => {
  await pool.query(`UPDATE messages SET deleted = true WHERE id = $1`, [id]);
};
