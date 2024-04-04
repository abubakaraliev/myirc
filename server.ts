require('dotenv').config();

import authRoutes from "./routes/authRoute"
import userRoutes from "./routes/userRoute"

const cors = require("cors");

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
});

// Ensures CORS errors are avoided
app.use(cors({
  origin: '*'
}));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Route GET for homepage
app.get("/home", (req, res, next) => {
  res.sendFile(join(__dirname, "./views/index.html"));
});

// Route GET for discuss channel
app.get("/channel", (req, res, next) => {
  res.sendFile(join(__dirname, "./views/channel.html"));
});

// Route GET to send messages
app.get("/message", (req, res, next) => {
  res.sendFile(join(__dirname, "./views/message.html"));
});

// Start the server on port 3000
const listener = server.listen(3000, () => {
  console.log("App is listening on port " + listener.address().port);
});