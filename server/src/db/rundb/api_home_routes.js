// import db connection from db_connect file where it was initiated
const pool = require('./db_connect');

// Define function to get all palylists for a user from the database and return a Promise

const getUserPlaylists = function (userId) {
  //Define query
  const queryString = `
  SELECT * 
  FROM users_playlists 
  JOIN playlists ON playlist_id = playlists.id
  WHERE user_id = $1`;

  //Return promise for query
  return pool.query(queryString, [userId])
    //If result is found, return the object?
    .then(result => result.rows)
    //Console log error if there is one
    .catch(error => console.log(error.message));
 
};

module.exports = { getUserPlaylists }; 