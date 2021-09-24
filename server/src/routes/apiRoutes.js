const { getTextMessages, insertTextMessages } =require('../db/rundb/api_queries');
const router = require("express").Router();

module.exports = function(router, addText) {

  router.get('/messages', (req, res) => {

    getTextMessages()
      .then((data) => {
        res
        .status(200)
        .json(data)
      });
  });

  router.put(`/messages/new`, (req, res) => {
    insertTextMessages(req.body.message.values)
      .then((data) => {
        console.log(req.body.message.values)
        addText(req.body.message.values)
        res
        .status(200)
        .json(data)
      });
  });

  return router;

}