// import db connection from db_connect file where it was initiated
const pool = require('./db_connect');


// Define function to get all messages from the database and return a Promise

/**
 * Get a list of all items from the database which user can see.
 * @return {Promise<{}>} A promise to the user once query is done
 */

 const getTextMessages = function() {
  const queryString = 'SELECT * FROM messages'
  return pool.query(queryString)
    .then(result => result.rows)
    .catch(error => console.log(error.message));
};

exports.getTextMessages = getTextMessages;


// Define function to insert a new messsage to the database and return a Promise.

/**
 * Get a list of all items from the database which user can see.
 * @param  {Integer} message A new message to add to the user
 * @return {Promise<{}>} A promise to the user with an added message
 */

const insertTextMessages = function(message) {
  const {msg, sent, date} = message;
  const queryString = 'INSERT INTO messages (text, date, user_id) VALUES ($1, $2, $3) RETURNING *'
  return pool.query(queryString, [msg, String(date), sent])
    .then(result => result.rows)
    .catch(error => console.log(error.message));
}

exports.insertTextMessages = insertTextMessages;