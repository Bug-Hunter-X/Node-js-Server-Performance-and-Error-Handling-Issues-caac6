const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const server = http.createServer((req, res) => {
  // Handle request here
  console.log('Request received');
  res.end('Hello, world!');
});

// Improved error handling
server.on('error', (err) => {
  console.error('Server error:', err);
  // Add more robust error handling here, e.g., retry mechanisms, circuit breakers
});

const port = 3000;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  server.listen(port, () => {
    console.log(`Worker ${process.pid} started on port ${port}`);
  });
}
