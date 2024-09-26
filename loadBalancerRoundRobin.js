// loadBalancer.js
const http = require('http');
const httpProxy = require('http-proxy');
const servers = require('./serverList'); // Import the server list
const { startHealthChecks } = require('./healthCheck'); // Import health check module
const rateLimiter = require('./rateLimiter'); // Import the rate limiter
const express = require('express'); // Express for middleware

const app = express()
const proxy = httpProxy.createProxyServer({});

app.use(rateLimiter);

// route to reset the rate limit manually for testing:
app.post('/reset-rate-limit', (req, res) => {
  rateLimiter.resetKey(req.ip);
  console.log(`Rate limit reset for IP: ${req.ip}`);
  res.send('Rate limit reset for your IP');
});

// Start health checks with a default interval of 5 seconds
startHealthChecks();

// Load balancing algorithms
let currentIndex = 0; // Used for round-robin algorithm

// Round Robin Algorithm
function roundRobin() {
  // Find the next available server
  const availableServers = servers.filter(server => server.status === 'up');
  if (availableServers.length === 0) return null; // No healthy servers available
  
  const server = availableServers[currentIndex];
  currentIndex = (currentIndex + 1) % availableServers.length;
  return server;
}

// Basic Load Balancer Server
const loadBalancerPort = 3000;



// Route for handling incoming requests
app.use((req, res) => {
  // Use least connections algorithm to select a server
  const targetServer = roundRobin();

  if (!targetServer) {
    // No healthy servers available
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('No healthy servers available.');
    return;
  }

  // Log the server being used
  console.log(`Routing request to: ${targetServer.url} (Connections: ${targetServer.connections})`);

  // Increment the connection count before proxying the request
  targetServer.connections += 1;

  // Proxy the request to the selected server
  proxy.web(req, res, { target: targetServer.url }, (err) => {
    console.error('Proxy error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Proxy error occurred.');
  });

  // Decrement the connection count after the response ends
  res.on('finish', () => {
    targetServer.connections -= 1;
  });
});

app.listen(loadBalancerPort, () => {
  console.log(`Load balancer running on port ${loadBalancerPort}`);
});
