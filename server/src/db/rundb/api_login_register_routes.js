// import db connection from db_connect file where it was initiated
const pool = require('./db_connect');

// Define function to get all messages from the database and return a Promise

/**
 * Get a list of all items from the database which user can see.
 * @return {Promise<{}>} A promise to the user once query is done
 */

 const getUserPassword = function(login) {
  const queryString = 'SELECT * FROM users WHERE username = $1 OR email = $1'
  return pool.query(queryString, [login])
    .then(result => result.rows)
    .catch(error => console.log(error.message));
};

exports.getUserPassword = getUserPassword;
