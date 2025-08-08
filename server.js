const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;

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

server.listen(PORT, () => {
  console.log(`Signaling server is running on port ${PORT}`);
});
