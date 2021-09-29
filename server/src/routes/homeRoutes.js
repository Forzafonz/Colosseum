const { getUserPlaylists, getMediaForUser } = require('../db/rundb/api_home_routes');

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

  return router;

}