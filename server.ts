require('dotenv').config();

import authRoutes from "./routes/auth"
import userRoutes from "./routes/user"

const cors = require("cors");

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

// Ensures CORS errors are avoided
app.use(cors({
  origin: '*'
}));

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