// a module to connect to the database using variables in process.env
require('dotenv').config()
const {Pool} = require('pg');

// Define config using process.env variables which should be defined in your personal .env file which stored in the main /server folder
// Use .env.example as a template
const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port:5432
}

// Define an new Pool for a database. 
const pool = new Pool(config);

// Establish connection and export it, so that other js files can use it.
pool.connect(() => {
  console.log('connected to database')
});

module.exports = pool;
