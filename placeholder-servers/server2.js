const express = require('express');
const app = express();
const port = 4001; // Port for Server 2

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Server 2 is healthy');
});

// General endpoint
app.get('/', (req, res) => {
  res.send('Hello from Server 2 on port 4001!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server 2 running on port ${port}`);
});
