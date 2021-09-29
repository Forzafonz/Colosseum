// Import queries from respective query files
const {
  getTextMessages,
  insertTextMessages,
  getMedia,
  createPlaylist,
  searchUser,
  updateUserPlaylist,
  searchmedia,
  getPlaylists
} = require('../db/rundb/api_queries');

// Define a function which will mount router that was passed to it to specified paths.
// Add text function is required here to update all clients semulteneosly using socket.io
module.exports = function(router, addText) {


  // Route to get all messages currently existed in the database.
  router.get('/messages/:userid', (req, res) => {
    const userid = req.params.userid;
    getTextMessages(userid)
      .then((data) => {
        res
        .status(200)
        .json(data)
      });
  });

  //Route to get all media currently existing in the database.
  router.get('/media', (req, res) => {
    getMedia().then((data) => {
      res.status(200).json(data);
    });
  });
  //Route to create new playlist
  router.put('/create', (req, res) => {
    const x = req.body.data;
    createPlaylist(x)
    .then((data) => {
      // console.log("==--==>", data[0].id);
      updateUserPlaylist(data[0].id, x)
        .then(() => {
          console.log("success");
        });
        res.status(200).json(data);
    });
  });

  //Route to search for user
  router.get('/user/:id', (req,res) => {
    searchUser(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    });
  });

  //Route to add new media
  router.put('/addmedia', (req,res) => {
    searchmedia(req.body.data)
    .then((response) => {
      res.status(200).json({c:'Hello'});

    })
  })
  //Route to get all playlists currently existing in the database.
  router.get('/playlists', (req, res) => {

    getPlaylists()
      .then((data) => {
        res
        .status(200)
        .json(data)
      });
  });
  
  // Route to post a new message to the database
  router.put(`/messages/new`, (req, res) => {
    insertTextMessages(req.body.message.values).then((data) => {
      // Calls a function to update all clients using socket.io
      addText(req.body.message.values);
      res.status(200).json(data);
    });
  });

  return router;
};
