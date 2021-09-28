// import db connection from db_connect file where it was initiated
const pool = require('./db_connect');


// Define function to get all messages from the database and return a Promise

/**
 * Get a list of all items from the database which user can see.
 * @return {Promise<{}>} A promise to the user once query is done
 */

 const getTextMessages = function(user_id) {
  // const queryString = `
  //   SELECT * FROM messages 
  //   JOIN (SELECT * 
  //         FROM users_playlists
  //         WHERE playlist_id IN (SELECT playlist_id 
  //                               FROM users_playlists 
  //                               WHERE user_id = $1 AND
  //                               active IS TRUE)) as target_chat
  //   ON taget_chat.id = messages.users_playlists_id`         
    
  const queryString = `SELECT messages.date as date, text, users_playlists.user_id as user_id, users.username as username, users.avatar as avatar  FROM messages 
                       JOIN users_playlists
                       ON users_playlists.id = messages.users_playlists_id
                       JOIN users
                       ON users_playlists.user_id = users.id
                       WHERE users_playlists_id IN 
                        (SELECT id FROM users_playlists WHERE playlist_id IN 
                          (SELECT playlist_id 
                            FROM users_playlists 
                            WHERE user_id = $1 AND
                            active IS TRUE))`
  return pool.query(queryString, [user_id])
    .then(result => result.rows)
    .catch(error => console.log(error.message));
};

exports.getTextMessages = getTextMessages;

const getMedia = function() {
  const queryString = 'SELECT * FROM media'
  return pool.query(queryString)
    .then(result => result.rows)
    .catch(error => console.log(error.message));
};

exports.getMedia = getMedia;


// Define function to insert a new messsage to the database and return a Promise.

/**
 * Get a list of all items from the database which user can see.
 * @param  {Integer} message A new message to add to the user
 * @return {Promise<{}>} A promise to the user with an added message
 */

//AM: NEED TO FIX THIS QUERY, THE GET QUERY WAS ALREADY FIXED BUT NOT THE PUT QUERY
const insertTextMessages = function(message) {
  const { msg, date, user_id } = message;
  const queryString = 'INSERT INTO messages (text, date, users_playlists_id) VALUES ($1, $2, $3) RETURNING *'
  return getUser_PlaylistID(user_id).then((users_playlist_id) => {
     pool.query(queryString, [msg, String(date), users_playlist_id.id])
    .then(result => result.rows)
    .catch(error => console.log(error.message));
  });
}

exports.insertTextMessages = insertTextMessages;

// A query to get user_palylist_id for added message
const getUser_PlaylistID = function(user_id) {
  const queryString = 'SELECT id FROM users_playlists WHERE user_id = $1 AND active IS TRUE'
  return pool.query(queryString, [user_id])
    .then(result => result.rows[0])
    .catch(error => console.log(error.message));
}


