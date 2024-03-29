const express = require('express');

// Create an Express application
const app = express();

// Import Socket
const { join } = require('node:path');

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

// export the application
module.exports = app;