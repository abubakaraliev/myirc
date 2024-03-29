const express = require('express');

// Create an Express application
const app = express();

// Ensures CORS errors are avoided
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Route for home page
app.get('/home', (req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
});

// Route for discuss channel
app.get('/channel', (req, res, next) => {
    res.json({ message: 'Vous êtes dans le channel de discussion !' });
});

// Route POST to send messages
app.post('/message', (req, res, next) => {
    res.json({ message: 'Message envoyé !' });
});

// export the application
module.exports = app;