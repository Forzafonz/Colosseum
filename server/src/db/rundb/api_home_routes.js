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

// const getMediaForPlaylist = function (playlistId) {
//   //Define query
//   const queryString = `
//   SELECT *
//   FROM playlists_media 
//   JOIN media ON media_id = media.id
//   WHERE playlist_id = $1;`;

//   //Return promise for query
//   return pool.query(queryString, [playlistId])
//     //If result is found, return the object?
//     .then(result => result.rows)
//     //Console log error if there is one
//     .catch(error => console.log(error.message));
 
// };

const getMediaForUser = function (userId) {
  //Define query
  const queryString = `
  SELECT *
  FROM playlists_media 
  JOIN media ON media_id = media.id
  JOIN users_playlists ON users_playlists.playlist_id = playlists_media.playlist_id
  WHERE user_id = $1;`;

  //Return promise for query
  return pool.query(queryString, [userId])
    //If result is found, return the object?
    .then(result => result.rows)
    //Console log error if there is one
    .catch(error => console.log(error.message));
   
};

const updatePlaylistToActive = function (playlistId) {
  //Define query
  const queryString = `
  UPDATE users_playlists
  SET active='false';

  UPDATE users_playlists
  SET active='true'
  WHERE playlist_id = $1;`;

  //Return promise for query
  return pool.query(queryString, [playlistId])
    //If result is found, return the object?
    .then(() => console.log("Succesfully updated to active"))

};

const getActivePlaylist = function (user_id) {
  //Define query
  const queryString = `SELECT playlist_id FROM users_playlists 
  WHERE user_id = $1
  AND active IS TRUE
  `;
  
  //Return promise for query
  return pool.query(queryString, [user_id])
    //If result is found, return the object?
    .then((result) => {
      return result.rows[0]})
};





module.exports = { getUserPlaylists, getMediaForUser, updatePlaylistToActive, getActivePlaylist }; 