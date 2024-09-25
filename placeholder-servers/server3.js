const express = require('express');
const app = express();
const port = 4002; // Port for Server 3

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Server 3 is healthy');
});

// General endpoint
app.get('/', (req, res) => {
  res.send('Hello from Server 3 on port 4002!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server 3 running on port ${port}`);
});
