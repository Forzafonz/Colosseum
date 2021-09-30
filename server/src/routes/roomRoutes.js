const { getMediaForPlaylist, getActivePlaylistIdForUser } = require('../db/rundb/api_room_routes');

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

  return router;

}