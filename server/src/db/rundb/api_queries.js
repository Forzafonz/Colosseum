// import db connection from db_connect file where it was initiated
const pool = require('./db_connect');


// Define function to get all messages from the database and return a Promise

/**
 * Get a list of all items from the database which user can see.
 * @return {Promise<{}>} A promise to the user once query is done
 */

 const getTextMessages = function() {
  const queryString = 'SELECT * FROM messages JOIN users_playlists ON users_playlists.id = users_playlists_id'
  return pool.query(queryString)
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
  const { text, date, user_playlists_id } = message;
  const queryString = 'INSERT INTO messages (text, date, user_playlists_id) VALUES ($1, $2, $3) RETURNING *'
  return pool.query(queryString, [msg, String(date), sent])
    .then(result => result.rows)
    .catch(error => console.log(error.message));
}

exports.insertTextMessages = insertTextMessages;

const createPlaylist = function (data) {
  const{name, tnail} =  data;
  const queryString = 'INSERT INTO playlists (name, thumbnail) VALUES ($1, $2) RETURNING *'
  return pool.query(queryString, [name, tnail])
    .then(result => result.rows)
    .catch(error => console.log(error.message));
}
exports.createPlaylist = createPlaylist;

const updateUserPlaylist = function (id, x) {
  console.log(";;;;;;data:", id);
  console.log(";;;;;;x:", x);
  const {user_id, udata} = x;
  return pool.query('INSERT INTO users_playlists(is_host, user_id, playlist_id) VALUES (true, $1, $2)', [user_id, id])
  .then( () => {
    console.log("success 1")
  udata.map((y) => {
       pool.query('INSERT INTO users_playlists (is_host, user_id, playlist_id) VALUES (false, $1, $2)', [y.u_id, id])
       .then()
      })
      
    }
   
  )


}
exports.updateUserPlaylist = updateUserPlaylist;
const searchUser = function(id) {
  const queryString = 'SELECT * FROM users where username LIKE $1'
  return pool.query(queryString,[id])
    .then(result => result.rows)
    .catch(error => console.log(error.message));
}

exports.searchUser = searchUser;