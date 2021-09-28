const { getUserPassword } =require('../db/rundb/api_login_register_routes');

module.exports = function(router, addText) {

  // Route to get all messages currently existed in the database.
  router.put('/', (req, res) => {
    console.log(req.body.password)
    getUserPassword(req.body.login)
      .then((data) => {
        if (data[0].password === req.body.password) {
          res
          .status(200)
          .json(data)
        } else {
          res
          .status(403)
          .json({error: "Error while attempting to authorize"})
        }
      });
  });

  router.put('/new', (req, res) => {
    getTextMessages()
      .then((data) => {
        
        res
        .status(200)
        .json(data)
      });
  });


  return router;

}