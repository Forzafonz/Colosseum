// Import queries from respective query files
const { getTextMessages, insertTextMessages, getMedia, getPlaylists } =require('../db/rundb/api_queries');

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

    getMedia()
      .then((data) => {
        res
        .status(200)
        .json(data)
      });
  });

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
    insertTextMessages(req.body.message.values)
      .then((data) => {
        // Calls a function to update all clients using socket.io
        addText(req.body.message.values)
        res.status(200).json(data)
      });
  });

  return router;

}