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
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  }
});

// Define a simple function which will be passed as a callback to our app, which will be called when a specific route is called.
// This function cannot be defined in the route itself as it will not have access to io (for now)
function addText(msg) {
  
  io.emit("UPDATE_CHAT", { msg });
 
}

io.on("connection", (socket) => {
  console.log("Connected with", socket.id)

  socket.on("play_media", ({media, playlistId}) =>{
    console.log("play media", media, playlistId)
    socket.broadcast.emit("play_media", { media, playlistId })
  })

  //To sync two media players playing time when different spot clicked in playbar
  socket.on("playing_time", (playingTime) => {
    console.log("PLAYING TIME:", playingTime)
    socket.broadcast.emit("update_media_playing_time", playingTime)

  })
  
})


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});