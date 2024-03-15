const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { createServer } = require("http");
const multer = require("multer");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const fs = require("fs");

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: false }));

// Socket Connections
io.on("connection", (socket) => {
  //   console.log("User Connected");
});
// Handle send' namespace
const send = io.of("/send");
send.on("connection", (socket) => {
  // console.log("Socket connected to '/send'");
  socket.on("get", () => {
    // console.log("Received 'get' event on '/send'");
  });

  socket.on("join-room", (code) => {
    socket.join(code);
    io.of("/share").on("connection", (socket) => {
      socket.join(code);
      //   console.log(`Socket joined room ${code}`);
    });
  });
});
const share = io.of("/share");
//Request for delete File
share.on("connection", (socket) => {
  //   console.log("User Connected");

  // Listen for "delete-file" event on each individual socket
  socket.on("delete-file", (fileName) => {
    const filePath = path.join(__dirname, "uploads", fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File ${fileName} deleted successfully.`);
    } else {
      console.log(`File ${fileName} does not exist.`);
    }
  });
});
// Handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("file");

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred while uploading the file.");
    } else {
      const filePath = req.file.path;
      const socketId = req.body.socketId; // Extract socket ID from request body
      share.emit("receive-file", path.basename(filePath), socketId);
      res.redirect("/share");
    }
  });
});

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/send", (req, res) => {
  res.sendFile(path.join(__dirname, "public/send.html"));
});

app.get("/share", (req, res) => {
  res.sendFile(path.join(__dirname, "public/share.html"));
});

// Default route for handling undefined routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/error.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});