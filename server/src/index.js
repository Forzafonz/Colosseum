const PORT = process.env.PORT || 8000;

const app = require("./application")({ addText });
const socketio = require("socket.io")
const server = require("http").Server(app);

// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ server });
const io = socketio(server, {
  cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  }
});


//This function will fire only when we send a message to the app.

// wss.on('connection', socket =>  {
//   socket.onmessage = message => {
//     console.log(`Message Received: ${message.data}`);

//     if (message.data === "ping") {
//       socket.send(JSON.stringify("pong"));
//     }

//   };
// });

//Function addText using ws
// function addText(msg) {
//   wss.clients.forEach(function eachClient(client) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(
//         JSON.stringify({
//           type: "UPDATE_CHAT",
//           msg
//         })
//       );
//     }
//   });
// }


function addText(msg) {
  
  io.emit("UPDATE_CHAT", { msg });
 
}



server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});