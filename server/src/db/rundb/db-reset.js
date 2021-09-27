const fs            = require("fs");
const path          = require("path");
const pool          = require('./db_connect');

// A function to retrieve 01_schema.sql and 01_seeds.sql from schema and seeds file.
// for example, runnin __dirname from rundb folder, will result in the following path: /home/*user_name*/lighthouse/final/server/src/db/rundb/

function reset() {

  return Promise.all([
    read(path.resolve(__dirname, `../schema/01_schema.sql`)),
    read(path.resolve(__dirname, `../seeds/01_seeds.sql`))
  ])
    .then(([create, seed]) => {

        pool.query(create)
        .then(() => pool.query(seed))

    });
} 

exports.reset = reset;

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}
