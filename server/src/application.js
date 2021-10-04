require('dotenv').config();

// Web server config
const express       = require("express");
const app           = express();
const cors          = require("cors");
const bodyParser    = require('body-parser')

// Define a mounting functopm for Routes to Mount for each Resource defined in the specified file.
// Each route/resource should be saved in ./routes folder. 
// For each route file in routes folder there should be a seperate instance of Route created.
const apiRoutes = require("./routes/apiRoutes");
const resetRoute = require("./routes/resetRoutes")
const loginRegisterRoutes = require("./routes/loginRegisterRoutes")
const homeRoutes = require("./routes/homeRoutes")
const roomRoutes = require("./routes/roomRoutes")
const youtubeRoutes = require("./routes/youtubeApi")

//Middleware assinged
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json())
//=================================================================================================================================================
//=================================================    Routing for APIs ===========================================================================
//=================================================================================================================================================
// Create a new instance of a router which will be used for general API routes
// Pass this routers into apiRoutes function which was imported from route/apiRoutes.js. This function will mutate apiRoute object
// and mount it to routes defined in apiRoutes file. Object is mutated by reference, so return value does not need to be explicitly assigned.
const apiRouter = express.Router();
// A router to reset database from browser
const resetRouter = express.Router();
// A router for login and registration requests
const loginRegisterRouter = express.Router();
// A router for home page requests
const homeRouter = express.Router();
// A router for room page requests
const roomRouter = express.Router();
// A router for room page requests
const youtubeRouter = express.Router();

module.exports = function application( actions = { addText: () => {}, changeMedia: () => {} } ) {
  //Enable cors on the server
  app.use(cors({
    origin: ["http://localhost:3000"],
  }));
  resetRoute(resetRouter);
  loginRegisterRoutes(loginRegisterRouter);
  homeRoutes(homeRouter, actions.changeMedia);
  roomRoutes(roomRouter);
  youtubeRoutes(youtubeRouter);

  // Mount apiRouter to specified routes in the routes/apiRouters.js file and pass addText function which was declared in the index.js
  apiRoutes(apiRouter, actions.addText);
  app.use("/api/login", loginRegisterRouter)
  app.use("/api/youtube", youtubeRouter)
  app.use("/reset", resetRouter)
  app.use("/api/home", homeRouter)
  app.use("/api/room", roomRouter)
  // Use apiRouter in our express app.
  app.use("/api", apiRouter);
  return app;
}


