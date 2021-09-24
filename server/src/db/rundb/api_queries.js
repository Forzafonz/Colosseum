const pool = require('./db_connect');


 const getTextMessages = function() {
  const queryString = 'SELECT * FROM messages'
  return pool.query(queryString)
    .then(result => result.rows)
    .catch(error => console.log(error.message));
};

exports.getTextMessages = getTextMessages;

const insertTextMessages = function(message) {
  const {msg, sent, date} = message;
  const queryString = 'INSERT INTO messages (text, date, user_id) VALUES ($1, $2, $3) RETURNING *'
  return pool.query(queryString, [msg, String(date), sent])
    .then(result => result.rows)
    .catch(error => console.log(error.message));
}

exports.insertTextMessages = insertTextMessages;