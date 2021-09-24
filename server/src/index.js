const PORT = process.env.PORT || 8000;

const app = require("./application")({ addText });
const server = require("http").Server(app);


const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

wss.on('connection', socket =>  {
  socket.onmessage = message => {
    console.log(`Message Received: ${message.data}`);

    if (message.data === "ping") {
      socket.send(JSON.stringify("pong"));
    }

  };
});


function addText(msg) {
  wss.clients.forEach(function eachClient(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "UPDATE_CHAT",
          msg
        })
      );
    }
  });
}


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});