/// Main file which will run on npm start
/// Contains declarations for http server and sokets.io



const PORT = process.env.PORT || 8000;

const app = require("./application")({ addText });

//Define socketio
const socketio = require("socket.io")
//Define http server
const server = require("http").Server(app);

// Create io instance using http server
const io = socketio(server, {
  cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  }
});

// Define a simple function which will be passed as a callback to our app, which will be called when a specific route is called.
// This function cannot be defined in the route itself as it will not have access to io (for now)
function addText(msg) {
  
  io.emit("UPDATE_CHAT", { msg });
 
}



server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});