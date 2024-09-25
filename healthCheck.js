// healthCheck.js
const axios = require('axios');
const servers = require('./serverList');

// Function to check the health of a single server
async function checkServerHealth(server) {
  try {
    // Send a GET request to the /health endpoint of the server
    const response = await axios.get(`${server.url}/health`);
    
    if (response.status === 200) {
      // If the server responds with status 200, mark it as 'up'
      server.status = 'up';
      console.log(`Server ${server.id} is up`);
    }
  } catch (error) {
    // If the request fails, mark the server as 'down'
    server.status = 'down';
    console.log(`Server ${server.id} is down`);
  }
}

// Function to periodically check the health of all servers
function startHealthChecks(interval = 5000) {
  setInterval(() => {
    console.log('Performing health checks...');
    servers.forEach(server => checkServerHealth(server));
  }, interval);
}

// Export the health check function
module.exports = { startHealthChecks };
