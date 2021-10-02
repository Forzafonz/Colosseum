const { getMediaForPlaylist, getActivePlaylistIdForUser, setMediaToPlayedAlreadyTrue, setAllMediaToPlayedAlreadyFalse } = require('../db/rundb/api_room_routes');

module.exports = function(router) { 

  
  router.get('/:user_id/activeplaylist/media', (req,res) => {

    const userId = req.params.user_id;
    getActivePlaylistIdForUser(userId)
    .then((data) => {

      return getMediaForPlaylist(data)

    })
    .then((response) => {
      
      res
        .status(200)
        .json(response)
    })
  })

  router.put('/:user_id/playlist/:playlist_id/media/:media_id', (req,res) => {

    const {user_id, playlist_id, media_id} = req.params
    setMediaToPlayedAlreadyTrue(playlist_id, media_id)
    .then((data) => {
      res
      .status(200)
      .json(data)
    })
    .catch((error) => console.log(error))
      
  })


  router.put('/:user_id/playlist/:playlist_id/startplaylist', (req,res) => {

    const {user_id, playlist_id} = req.params
    setAllMediaToPlayedAlreadyFalse(user_id, playlist_id)
    .then((data) => {
      res
      .status(200)
      .json(data)
    })
    .catch((error) => console.log(error))
      
  })


  return router;

}