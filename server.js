// import express
const express = require('express');

// import the http module
const { createServer } = require('node:http');

// import socket.io 
const { join } = require('node:path');
const { Server } = require('socket.io');

// Create an Express application
const app = express();

// Create a simple server
const server = createServer(app);
const io = new Server(server);

// Ensures CORS errors are avoided
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Route for home page
app.get('/home', (req, res, next) => {
    res.sendFile(join(__dirname, './views/index.html'));
});

// Route for discuss channel
app.get('/channel', (req, res, next) => {
    res.sendFile(join(__dirname, './views/channel.html'));
});

// Route POST to send messages
app.get('/message', (req, res, next) => {
    res.sendFile(join(__dirname, './views/message.html'));
});

// Start the server on port 3000
server.listen(process.env.PORT || 3000);