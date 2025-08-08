const http = require('http');
const WebSocket = require('ws');

// Use Railway-assigned port or fallback to 3000
const PORT = process.env.PORT || 3000;

// Create HTTP server (needed for Railway)
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('WebRTC signaling server is running');
});

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

// Start HTTP+WebSocket server
server.listen(PORT, () => {
  console.log(`Signaling server is running on port ${PORT}`);
});
