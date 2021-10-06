/// Main file which will run on npm start
/// Contains declarations for http server and sokets.io

const usersObject = {}


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
function addText(msg, room_id) {

  io.to(room_id).emit("UPDATE_CHAT", { msg });

}
/// ROOM 'id" is id parameters that passed by each emit on client side. It is done to make each call look the same
io.on("connection", (socket) => {
  // console.log("ROOMS IN SOCKET", io.sockets.sockets);
  const socarray = []
  Object.keys(io.sockets.sockets).forEach(function(s) {
    io.sockets.sockets[s];
    socarray.push(io.sockets.sockets[s])
  });
  console.log(socarray)


  socket.on("JOIN_ROOM", ({ room_id, user_id }) => {
    // console.log("Connected with", socket.room_id)
    // console.log("room, join", room_id)
    // socket.leaveAll()
    if (user_id && room_id ) {
      console.log("I am joining")
      socket.join(room_id)
      console.log("Number of people", io.sockets.adapter.rooms.get(room_id).size)
      // console.log("Room keys:", (socket.rooms))
      // console.log(usersObject)
      // console.log("Number of people", io.sockets.adapter.rooms.get(room_id).size)
    }
   
  })

  socket.on("play_media", ({ media, playlistId, room_id }) => {
    // console.log("play media", media, playlistId, room_id)
    socket.to(room_id).emit("play_media", { media, playlistId })
  })
  //To sync two media players playing time when different spot clicked in playbar
  socket.on("playing_time", ({playingTime, room_id}) => {
    // console.log("PLAYING TIME:", playingTime)
    socket.to(room_id).emit("update_media_playing_time", playingTime)

  })
  //To play in all clients when play clicked in one client
  socket.on("play", ({room_id}) => {
    console.log(room_id)
    // socket.broadcast.emit("play_client",)
    socket.to(room_id).emit("play_client",)
  })

  //To pause in all clients when ppause clicked in one client
  socket.on("pause", ({room_id}) => {
    socket.to(room_id).emit("pause_client",)
  })

  socket.on("SET_ORDER_FROM_LIKES", ({ mediaId, like, room_id }) => {
    console.log("SET_ORDER_FROM_LIKES", mediaId, like, room_id)
    // console.log("Number of people", io.sockets.adapter.rooms.get(room_id).size)
    socket.to(room_id).emit("SET_ORDER_FROM_LIKES", { mediaId, like })
  })

  socket.on("REMOVE_MEDIA_FROM_PLAYLIST_CLIENT", ({ mediaId, playlist_id, room_id }) => {
    socket.to(room_id).emit("REMOVE_MEDIA_FROM_PLAYLIST_CLIENT", { mediaId, playlist_id })
  })

  socket.on("ADD_MEDIA_TO_PLAYLIST_CLIENT", ({ media, playlist_id, room_id }) => {
    console.log("ADD_MEDIA_TO_PLAYLIST_CLIENT", playlist_id, room_id)
    // socket.broadcast.emit("ADD_MEDIA_TO_PLAYLIST_CLIENT", { media, playlist_id })
    socket.to(room_id).emit("ADD_MEDIA_TO_PLAYLIST_CLIENT", { media, playlist_id })
  })

  socket.on("disconnecting", () => {
    console.log("THESE ARE SOCKET ROOMS:", socket.rooms); // the Set contains at least the socket ID
  });


})


function addUser(room_id, user_id) {
  if (Object.keys(usersObject).includes(room_id)) {
    if (!usersObject[room_id].includes[user_id])
      usersObject[room_id].push(user_id)
  } else {
    usersObject[room_id] = [user_id];
  }
  console.log("Here is an object", usersObject)
}

function checkUser(room_id, user_id) {
  console.log(Object.keys(usersObject).includes(room_id), room_id, usersObject)
  if (Object.keys(usersObject).includes(room_id)){
    if (usersObject[room_id].includes[user_id]){
      console.log("Here is check", room_id, user_id)
      return true;
    }
  }
  return false;
}

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});