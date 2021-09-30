// Import queries from respective query files
const {
  getTextMessages,
  insertTextMessages,
  getMedia,
  createPlaylist,
  searchUser,
  updateUserPlaylist,
  searchmedia,
  getPlaylists,
  getNewPlaylist
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
  //Route to create new playlist --
  router.put('/createplaylist', (req, res) => {
    const x = req.body.data;
    //new entry for table playlists
    createPlaylist(x)
    .then((data) => {
      //to update table user-playlist with new playlist and its user data
      updateUserPlaylist(data[0].id, x)
        .then(() => {
          console.log("success");
        });
        res.status(200).json(data);
    });
  });

  //Route to search for user while creating playlist --
  router.get('/user/:id', (req,res) => {
    searchUser(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    });
  });

  //Route to add new media to new playlist --
  router.put('/addmedia', (req,res) => {
    //searches for media and updates 2 tables
    searchmedia(req.body.data)
    .then((response) => {
      res.status(200).json({c:'Hello'});

    })
  })

  //Route to load newly created playlist into mediaform to add media --
  router.put('/searchPlaylist', (req,res) => {
    console.log("---->data", req.body.data);
    //gets new playlist data to show on page
    getNewPlaylist(req.body.data)
    .then((data) => {
      res
      .status(200)
      .json(data)
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
  })
  
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
