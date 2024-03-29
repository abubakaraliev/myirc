// import the http module
const http = require('http');
const app = require('./app');

// Create an HTTP server that returns a simple 'Hello World' message for all requests
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

// Start the server on port 3000
server.listen(process.env.PORT || 3000);