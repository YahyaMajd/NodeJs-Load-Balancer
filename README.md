# Load Balancer Project with Least Connections and Health Checks

## Overview

This project implements a simple load balancer using Node.js that distributes traffic among multiple backend servers. The load balancer uses the **least connections** algorithm to route traffic to the server with the fewest active connections. Additionally, it includes health checks to monitor the status of backend servers and reroutes traffic to healthy servers only.

## Features

- **Load Balancing Algorithms**:
  - **Least Connections**: Routes traffic to the server with the fewest active connections.

- **Health Checks**:
  - Periodically checks the health of backend servers and updates their status (`up` or `down`).
  - Servers that are marked as `down` are excluded from the load balancing rotation.

- **Failover Mechanism**:
  - Automatically reroutes traffic to available servers when a primary server is down
 
## Future Improvements
Weighted Load Balancing: Implement weighted routing based on server capabilities or custom rules.
Dashboard: Create a visual dashboard to monitor server statuses and traffic distribution.
Advanced Health Checks: Implement more sophisticated health checks, such as CPU/memory usage or response time metrics.

## Running the Project 
 Make sure you have Node.js installed. Then, run:
npm install

Open separate terminal windows and start each placeholder server:
  node placeholder-servers/server1.js
  node placeholder-servers/server2.js
  node placeholder-servers/server3.js

Start the Load Balancer: Start the load balancer using the least connections algorithm:
  node leastConnections.js

Alternatively, you can start the round-robin load balancer:
  node loadBalancer.js

##How It Works
###Least Connections Algorithm:
The load balancer routes incoming traffic to the server with the fewest active connections.
The connection count is incremented before proxying the request and decremented after the response is sent.

###Health Checks:
The health check module (healthCheck.js) periodically sends a request to each server’s /health endpoint.
Servers that respond with a status of 200 are marked as up.
Servers that fail to respond or return an error are marked as down and excluded from the load balancing rotation.

###Failover Handling:
If no healthy servers are available, the load balancer returns a 502 error indicating that no servers are available.

##Testing the Load Balancer
Send Requests to the Load Balancer:
Open a new terminal window and send multiple requests to the load balancer:
curl http://localhost:3001/
Observe the routing behavior in the terminal window running the load balancer.

###Simulate Server Failures:
Stop one of the placeholder servers and observe how the load balancer detects the failure and reroutes traffic to the remaining healthy servers.
