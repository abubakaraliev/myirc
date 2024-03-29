// import the http module
const http = require('http');

// Create an HTTP server that returns a simple 'Hello World' message for all requests
const server = http.createServer((req, res) => {
    res.end('Hello World!');
});

// Start the server on port 3000
server.listen(process.env.PORT || 8080);