const express = require('express');
const app = express();
const port = 4000; // Port for Server 1

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Server 1 is healthy');
});

// General endpoint
app.get('/', (req, res) => {
  res.send('Hello from Server 1 on port 4000!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server 1 running on port ${port}`);
});

// concurrently "node placeholder-servers/server1.js" "node placeholder-servers/server2.js" "node placeholder-servers/server3.js"
