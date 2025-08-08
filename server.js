const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

// Use environment PORT for Railway, fallback to 3000 locally
const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer();

// Attach WebSocket server to HTTP
const wss = new WebSocket.Server({ server });

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

// Start HTTP server (which wss piggybacks on)
server.listen(PORT, () => {
  console.log(` Signaling server is running on ws://localhost:${PORT}`);
});
