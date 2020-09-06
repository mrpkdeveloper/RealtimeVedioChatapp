const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

let clients = 0;
const log = console.log;
io.on("connection", function (socket) {
  socket.on("NewClient", function () {
    if (clients < 2) {
      if (clients == 1) {
        this.emit("CreatePeer");
      }
    } else this.emit("SessionActive");
    clients++;
  });
  socket.on("Offer", SendOffer);
  socket.on("Answer", SendAnswer);
  socket.on("disconnect", Disconnect);
});

io.on("connection", (socket) => {
  log("connected");
  socket.on("message", (evt) => {
    log(evt);
    socket.broadcast.emit("message", evt);
  });
});
io.on("disconnect", (evt) => {
  log("some people left");
});

function Disconnect() {
  if (clients > 0) {
    if (clients <= 2) this.broadcast.emit("Disconnect");
    clients--;
  }
}

function SendOffer(offer) {
  this.broadcast.emit("BackOffer", offer);
}

function SendAnswer(data) {
  this.broadcast.emit("BackAnswer", data);
}

http.listen(port, () => console.log(`Active on ${port} port`));
