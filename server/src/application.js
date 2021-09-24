require('dotenv').config();

// Web server config
const PORT          = process.env.PORT || 8080;
const express       = require("express");
const app           = express();
const cors          = require("cors");
const bodyParser    = require('body-parser')


// Define a source for Routes to Mount for each Resource
const apiRoutes = require("./routes/apiRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json())
//=================================================================================================================================================
//=================================================    Routing for APIs ===========================================================================
//=================================================================================================================================================
// Create a new instance of a router which will be used for OWNER routes
const apiRouter = express.Router();
// Pass this routers into ownerRoutes function which was imported from route/ownerRouter.js. This function will mutate ownerRouter object
// and mount it to routes defined in ownerRouter file. Object is mutated by reference, so return value does not need to be explicitly assigned.

//Middleware assinged

module.exports = function application( actions = { addText: () => {} } ) {
  app.use(cors());
  apiRoutes(apiRouter, actions.addText);
  app.use("/api", apiRouter);
  return app;
}


