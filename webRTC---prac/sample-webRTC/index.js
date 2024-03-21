// server.js
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set EJS as view engine
app.set("view engine", "ejs");

// Set path for static files
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

// Socket.IO logic
io.on("connection", (socket) => {
  // socket.on("disconnect", () => {
  //   console.log("User disconnected");
  // });
  socket.on("room-name", (data) => {
    const rooms = io.sockets.adapter.rooms;

    const checkRoom = rooms.get(data);
    if (checkRoom == undefined) {
      socket.join(data);
      socket.emit("created");
      console.log(`$ Created and  Jointed the room`);
    } else if (checkRoom.size == 1) {
      socket.join(data);
      socket.emit("joined");

      console.log(` Jointed the room`);
    } else {
      socket.emit("full");
      console.log(`Can't Jointed the room. Room Full`);
    }
    // console.log(rooms);
  });
  socket.on("join", (roomName) => {});
  socket.on("ready", (roomName) => {
    console.log("Ready");
    socket.broadcast.to(roomName).emit("ready");
  });
  socket.on("candidate", (candidate, roomName) => {
    console.log("candidate");

    socket.broadcast.to(roomName).emit("candidate", candidate);
  });
  socket.on("offer", (offer, roomName) => {
    console.log("offer");
    console.log(offer);

    socket.broadcast.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    console.log("answer");

    socket.broadcast.to(roomName).emit("answer", answer);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
