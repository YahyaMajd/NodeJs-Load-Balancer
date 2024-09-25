// serverList.js

// Initial list of backend servers with their status and number of active connections.
const servers = [
    {
      id: 1,
      url: 'http://localhost:4000',
      connections: 0, // Number of active connections (for least connections algorithm)
      status: 'up' // Server status: 'up' or 'down'
    },
    {
      id: 2,
      url: 'http://localhost:4001',
      connections: 11, // testing least connections
      status: 'up'
    },
    {
      id: 3,
      url: 'http://localhost:4002',
      connections: 10, //testing least connections
      status: 'up'
    }
  ];
  
  // Export the list of servers so it can be used in other modules
  module.exports = servers;
  