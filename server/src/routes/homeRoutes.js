const { getUserPlaylists, getMediaForUser, updatePlaylistToActive, getActivePlaylist } = require('../db/rundb/api_home_routes');

module.exports = function(router, changeMedia) { 

  
  router.get('/:user_id/playlists', (req,res) => {

    const userId = req.params.user_id;

    getUserPlaylists(userId)
      .then((data) => {
        res
          .status(200)
          .json(data)
      })

  })

  router.get('/:user_id/media', (req,res) => {

    const userId = req.params.user_id;

    getMediaForUser(userId)
      .then((data) => {
        res
          .status(200)
          .json(data)
      })

  })

  router.get('/:user_id/activeplaylist', (req,res) => {

    const userId = req.params.user_id;
    getActivePlaylist(userId)
      .then((data) => {
        res
          .status(200)
          .json(data)
      })
      .catch((response) => {
        res.status(200)
        .json(null)
      })

  })


  router.put('/:user_id/playlists/:playlist_id/active', (req,res) => {

    const playlistId = req.params.playlist_id;
    const userId = req.params.user_id;
    const media_id = req.params.media_id
    // changeMedia({media: Number(media_id), playlistId: Number(playlistId)})

    updatePlaylistToActive(playlistId, userId)
      .then(() => {
        console.log("I RUN!")
        res
          .status(200)
      })
      .catch((error) => console.log(error.response.data))
  })

  return router;

}