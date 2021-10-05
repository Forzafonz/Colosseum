// import db connection from db_connect file where it was initiated
const pool = require('./db_connect');

const getMediaForPlaylist = function (playlistId) {
  //Define query
  const queryString = `
  SELECT * 
  FROM playlists_media
  JOIN media ON media.id = media_id
  WHERE playlist_id = $1`;

  //Return promise for query
  return pool.query(queryString, [playlistId])
    //If result is found, return the object?
    .then(result => result.rows)
    //Console log error if there is one
    .catch(error => console.log(error.message));
 
};

const getActivePlaylistIdForUser = function (userId) {
  //Define query
  const queryString = `
  SELECT playlist_id 
  FROM users_playlists
  WHERE user_id = $1 
  AND active IS true`;

  //Return promise for query
  return pool.query(queryString, [userId])
    //If result is found, return the object?
    .then(result => result.rows[0].playlist_id)
    //Console log error if there is one
    .catch(error => console.log(error.message));
 
};

const getMediaWithMediaIDandUserID = function (playlist_id, media_id) {
  //Define query
  const queryString = `
  SELECT *
  FROM playlists_media 
  JOIN media ON media_id = media.id
  WHERE playlist_id = $1
  AND media_id = $2;`;

  //Return promise for query
  return pool.query(queryString, [playlist_id, media_id])
    //If result is found, return the object?
    .then(result => result.rows[0])
    //Console log error if there is one
    .catch(error => console.log(error.message));
 
};

const setMediaToPlayedAlreadyTrue = function (playlist_id, media_id) {

  const queryString = `
  UPDATE playlists_media
  SET played_already ='true'
  WHERE playlist_id = $1 AND media_id = $2;
  `;

  //Return promise for query
  return pool.query(queryString, [playlist_id, media_id])
    .then(result => result)
    .catch(error => console.log(error.message));
 
};

const setAllMediaToPlayedAlreadyFalse = function (user_id, playlist_id) {

  const queryString = `
  UPDATE playlists_media
  SET played_already ='false'
  WHERE playlist_id = $1;
  `;

  //Return promise for query
  return pool.query(queryString, [playlist_id])
    .then(result => result)
    .catch(error => console.log(error.message));
 
};

const addPlaylistToTheUser = function (user_id, playlist_id) {
 
  const queryString = `
  INSERT INTO users_playlists (active, user_id, playlist_id) 
  VALUES (true, $1, $2) RETURNING *
  `;
  // console.log("addPlaylistToTheUser", user_id, playlist_id)
  //Return promise for query
  return pool.query(queryString, [user_id, playlist_id])
    .then(result => result.rows)
    .catch(error => console.log(error.message));
 
};

const getPlaylistIdByHash = function(playlist_hash) {
  const queryString = `
  SELECT id FROM playlists
  WHERE url = $1
  `;

  //Return promise for query
  return pool.query(queryString, [playlist_hash])
    .then(result => {
      return result.rows[0].id})
    .catch(error => console.log(error.message));
 
};


module.exports = { 
  getMediaForPlaylist, 
  getActivePlaylistIdForUser, 
  getMediaWithMediaIDandUserID, 
  setMediaToPlayedAlreadyTrue, 
  setAllMediaToPlayedAlreadyFalse,
  addPlaylistToTheUser,
  getPlaylistIdByHash
 }; 