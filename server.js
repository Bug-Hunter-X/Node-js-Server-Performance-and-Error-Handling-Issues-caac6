const http = require('http');

const server = http.createServer((req, res) => {
  // Handle request here
  console.log('Request received');
  res.end('Hello, world!');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});