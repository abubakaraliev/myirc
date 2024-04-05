require('dotenv').config();

import authRoutes from "./routes/auth"
import userRoutes from "./routes/user"

const cors = require("cors");
const cookieParser = require('cookie-parser')

const path = require("path");

// import express
const express = require("express");

// import body-parser
const body_parser = require("body-parser");

// import the http module
const { createServer } = require("node:http");

// import socket.io
const { join } = require("node:path");
const { Server } = require("socket.io");

// Create an Express application
const app = express();

//setting view engine to ejs
app.set("view engine", "ejs");

app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }));

// parse application/json
app.use(body_parser.json());

app.use("/", express.static(__dirname + "/public"));

// Create a simple server
const server = createServer(app);
const io = new Server(server);

io.on('connection', function(socket:any){
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
app.use((req, res, next) => {
  // Set the headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Set the headers to allow the following methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Route GET for homepage
app.get("/", (req, res, next) => {
  res.sendFile(join(__dirname, "./views/index.html"));
});

// Route GET for discuss channel
app.get("/channel", (req, res, next) => {
  res.sendFile(join(__dirname, "./views/channel.html"));
});

app.get("/message", (req, res, next) => {
  res.sendFile(join(__dirname, "./views/message.html"));
});

app.get("/chat", (req, res, next) => {
  res.sendFile(join(__dirname, "./views/chat.html"));
});

app.get("/login", (req, res, next) => {
  res.sendFile(join(__dirname, "./views/login.html"));
});
app.post('/login', authRoutes);

app.get("/register", (req, res, next) => {
  res.sendFile(join(__dirname, "./views/register.html"));
});
app.post('/register', userRoutes);

// Start the server on port 3000
const listener = server.listen(3000, () => {
  console.log("App is listening on port " + listener.address().port);
});