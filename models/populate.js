const { Client } = require("pg");
const fs = require("node:fs");
const { connectionString } = require("pg/lib/defaults");

const CREATE_MESSAGES_TABLE = `CREATE TABLE messages (
                           id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                           timestamp TIMESTAMP,
                           title VARCHAR( 63 ),
                           content VARCHAR( 1027 ),
                           author_id INTEGER,
                           deleted BOOL DEFAULT false
                           );`;

const CREATE_USERS_TABLE = `CREATE TABLE users (
                        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                        full_name VARCHAR ( 255 ),
                        email VARCHAR ( 255 ),
                        password VARCHAR ( 65535),
                        username VARCHAR ( 255 ),
                        member BOOLEAN,
                        admin BOOLEAN
                        );`;

function getSQL() {
  try {
    const CREATE_SESSION_TABLE = fs.readFileSync(
      "./node_modules/connect-pg-simple/table.sql"
    );
    return [...arguments].join(" ") + CREATE_SESSION_TABLE;
  } catch (err) {
    throw err;
  }
}

async function main() {
  console.log("sending");
  const client = new Client({
    connectionString: process.argv[2],
  });
  await client.connect();
  await client.query(getSQL(CREATE_MESSAGES_TABLE, CREATE_USERS_TABLE));
  await client.end();
  console.log("done");
}

main();
