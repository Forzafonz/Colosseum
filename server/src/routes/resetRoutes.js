const { reset } = require('../db/rundb/db-reset');

module.exports = function(router) {

  router.get('/', (request, response) => {

    reset()
      .then(() => {
        console.log("Database Reset");
        response.status(200).send("Database Reset");
      })
      .catch(error => {
      console.log(`Error setting up the reset route: ${error}`);
      });
  });
}