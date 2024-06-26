const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected!: ", socket.id);
  console.log("socket is active  connected!");
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user connected:${socket.id} and joined room ${data}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected!: ", socket.id);
  });
});

server.listen(5000, () => {
  console.log("server is listening and socket is active!");
});
