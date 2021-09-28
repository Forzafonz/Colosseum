const { getUserPlaylists } = require('../db/rundb/api_home_routes');

module.exports = function(router) { 

  router.get('/:id', (req,res) => {

    const userId = req.params.id;

    getUserPlaylists(userId)
      .then((data) => {

        res
          .status(200)
          .json(data)
      })

  })

  return router;

}