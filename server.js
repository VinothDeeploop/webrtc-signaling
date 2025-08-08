const WebSocket = require('ws');

// Use the Railway-assigned port or fallback to 3000
const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT });

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

console.log(`Signaling server is running on ws://localhost:${PORT}`);
