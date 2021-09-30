// import db connection from db_connect file where it was initiated
const pool = require('./db_connect');

// Define function to get all messages from the database and return a Promise

/**
 * Get a list of all items from the database which user can see.
 * @return {Promise<{}>} A promise to the user once query is done
 */

const getTextMessages = function (user_id) {
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
                            active IS TRUE))`;
  return pool
    .query(queryString, [user_id])
    .then((result) => result.rows)
    .catch((error) => console.log(error.message));
};

exports.getTextMessages = getTextMessages;

const getMedia = function () {
  const queryString = 'SELECT * FROM media';
  return pool
    .query(queryString)
    .then((result) => result.rows)
    .catch((error) => console.log(error.message));
};

exports.getMedia = getMedia;

const getPlaylists = function () {
  const queryString = 'SELECT * FROM playlists';
  return pool
    .query(queryString)
    .then((result) => result.rows)
    .catch((error) => console.log(error.message));
};

exports.getPlaylists = getPlaylists;

// Define function to insert a new messsage to the database and return a Promise.

/**
 * Get a list of all items from the database which user can see.
 * @param  {Integer} message A new message to add to the user
 * @return {Promise<{}>} A promise to the user with an added message
 */

//Randomly generates text for use in createplaylist url --
const randomTextGenerator = function () {
  const letters = [
    'q',
    't',
    'b',
    9,
    't',
    'p',
    'a',
    2,
    7,
    3,
    4,
    'Z',
    'G',
    'F',
    'A',
    'P',
    'n',
    'e',
    'u',
    'w',
    1,
    8,
    3,
    'H',
    'l',
    'z',
    'K',
    'B',
    'e',
    'x',
  ];
  let result = '';
  for (i = 0; i < 15; i++) {
    result += letters[Math.floor(Math.random() * 30)];
  }
  return result;
};
//Function to create new playlist --
const createPlaylist = function (data) {
  const { name, tnail } = data;
  const url = randomTextGenerator();
  const queryString =
    'INSERT INTO playlists (name, thumbnail, url) VALUES ($1, $2, $3) RETURNING *';
  return pool
    .query(queryString, [name, tnail, url])
    .then((result) => result.rows)
    .catch((error) => console.log(error.message));
};
exports.createPlaylist = createPlaylist;

//Updates table users-playlists after creating new playlist --
const updateUserPlaylist = function (id, x) {
  const { user_id, udata } = x;
  return pool
    .query(
      'INSERT INTO users_playlists(is_host, user_id, playlist_id) VALUES (true, $1, $2)', //updating host user
      [user_id, id]
    )
    .then(() => {
      console.log('success 1');
      udata.map((y) => {
        pool
          .query(
            'INSERT INTO users_playlists (is_host, user_id, playlist_id) VALUES (false, $1, $2)', //updating added users
            [y.u_id, id]
          )
          .then();
      });
    });
};

exports.updateUserPlaylist = updateUserPlaylist;

//Searches for media and updates if doesnt exist. updates media and playlists_media tables--
const searchmedia = function (data) {
  const { url, category, playlist_id, desc, thumbnail } = data;
  let req_id = '';
  const queryString = 'SELECT * FROM media where link LIKE $1';
  return pool
    .query(queryString, [url])
    .then((result) => {
      if (result.rows.length === 0) {
        console.log('Media not found');
        const qs1 =
          'INSERT INTO media(link, category, description, thumbnail) VALUES ($1, $2, $3, $4) RETURNING *';
        return pool.query(qs1, [url, category, desc, thumbnail]).then((result2) => {
          console.log('Media added');
          req_id = result2.rows[0].id;
          const qs2 =
            'INSERT INTO playlists_media(media_id, playlist_id) VALUES ($1, $2)';
          return pool.query(qs2, [req_id, playlist_id]).then(() => {
            console.log('Success');
          });
        });
      } else {
        console.log('Media Already present');
        req_id = result.rows[0].id;
        console.log('req_id = ', req_id);
        const qs3 =
          'SELECT * FROM playlists_media where media_id = $1 AND playlist_id = $2';
        return pool.query(qs3, [req_id, playlist_id]).then((result3) => {
          if (result3.rows.length === 0) {
            const qs2 =
              'INSERT INTO playlists_media(media_id, playlist_id) VALUES ($1, $2)';
            return pool.query(qs2, [req_id, playlist_id]).then(() => {
              console.log('Successsfully added to playlist');
            });
          } else {
            console.log('data already in playlist');
          }
        });
      }
    })
    .catch((error) => console.log(error.message));
};

exports.searchmedia = searchmedia;

//Searching user to add for creating playlist--
const searchUser = function (id) {
  const queryString = 'SELECT * FROM users where username LIKE $1';
  return pool
    .query(queryString, [id])
    .then((result) => result.rows)
    .catch((error) => console.log(error.message));
};

exports.searchUser = searchUser;

//To load new playlist data to page --
const getNewPlaylist = function (url) {
  console.log('----->url', url);
  const queryString = 'SELECT * FROM playlists where url LIKE $1';
  return pool
    .query(queryString, [url])
    .then((result) => result.rows)
    .catch((error) => console.log(error.message));
};

exports.getNewPlaylist = getNewPlaylist;

const insertTextMessages = function (message) {
  const { msg, date, user_id } = message;
  const queryString =
    'INSERT INTO messages (text, date, users_playlists_id) VALUES ($1, $2, $3) RETURNING *';
  return getUser_PlaylistID(user_id).then((users_playlist_id) => {
    pool
      .query(queryString, [msg, String(date), users_playlist_id.id])
      .then((result) => result.rows)
      .catch((error) => console.log(error.message));
  });
};

exports.insertTextMessages = insertTextMessages;

// A query to get user_palylist_id for added message
const getUser_PlaylistID = function (user_id) {
  const queryString =
    'SELECT id FROM users_playlists WHERE user_id = $1 AND active IS TRUE';
  return pool
    .query(queryString, [user_id])
    .then((result) => result.rows[0])
    .catch((error) => console.log(error.message));
};
