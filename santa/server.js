const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');

const app = express();

// Use JSON middleware (if needed for POST requests)
app.use(express.json());

// Serve static files (the HTML and any client-side JS)
app.use(express.static('build'));

// Initial meter value (0 = Naughty, 100 = Nice)
let meterValue = 0;

// Create HTTP server and attach WebSocket server
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Broadcast function to send the meter value to all connected clients
function broadcastMeterValue() {
  const message = JSON.stringify({ meterValue });
  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
}

// When a new client connects, send them the current meter value
wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ meterValue }));
});


// Increment endpoint: increments the meter value
app.post('/increment', (req, res) => {
  meterValue = Math.min(meterValue + 10, 100);
  broadcastMeterValue();
  console.log("nice event fired")
  res.json({ success: true, meterValue });
});

// Decrement endpoint: decrements the meter value
app.post('/decrement', (req, res) => {
  meterValue = Math.max(meterValue - 10, -100);
  broadcastMeterValue();
  res.json({ success: true, meterValue });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
