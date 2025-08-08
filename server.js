const WebSocket = require('ws');

//  USE ENV PORT if available (for Railway), fallback to 3000
const port = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port });

wss.on('connection', function connection(ws) {
  console.log('New client connected');

  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', function () {
    console.log('Client disconnected');
  });
});

console.log(`Signaling server is running on ws://localhost:${port}`);
