const { getUserPlaylists, getMediaForUser, updatePlaylistToActive, getActivePlaylist } = require('../db/rundb/api_home_routes');

module.exports = function(router) { 

  
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
      .catch((res) => {
        res.status(200)
        .json(null)
      })

  })


  router.put('/:user_id/playlists/:playlist_id/active', (req,res) => {

    const playlistId = req.params.playlist_id;
    const userId = req.params.user_id;

    updatePlaylistToActive(playlistId, userId)
      .then(() => {
        res
          .status(200)
      })
  })

  return router;

}