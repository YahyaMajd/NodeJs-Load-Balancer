// loadBalancer.js
const http = require('http');
const httpProxy = require('http-proxy');
const servers = require('./serverList'); // Import the server list
const { startHealthChecks } = require('./healthCheck'); // Import health check module
const rateLimiter = require('./rateLimiter'); // Import the rate limiter

const proxy = httpProxy.createProxyServer({});

app.use(rateLimiter);
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

const server = http.createServer((req, res) => {
  // Use round-robin to select a server
  const targetServer = roundRobin();

  if (!targetServer) {
    // No healthy servers available
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('No healthy servers available.');
    return;
  }

  // Proxy the request to the selected server
  proxy.web(req, res, { target: targetServer.url }, (err) => {
    console.error('Proxy error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Proxy error occurred.');
  });
});

server.listen(loadBalancerPort, () => {
  console.log(`Load balancer running on port ${loadBalancerPort}`);
});
