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


module.exports = { getMediaForPlaylist, getActivePlaylistIdForUser }; 