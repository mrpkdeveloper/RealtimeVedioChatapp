// $(function () {
//   let socket = io();
//   // .connect("http://localhost:4444", {
//   //   "sync disconnect on unload": false,
//   // });

//   var room = "room1";
//   socket.on("connect", function () {
//     //emiting 'room1', joining
//     socket.emit("room", room);
//   });

//   //recieve character from server
//   socket.on("server_character", function (content) {
//     console.log("From server: " + content);
//     document.getElementById("notepad").innerHTML = content;
//   });

//   //For each typed character
//   $("#notepad").on("keyup", function () {
//     var character = $("#notepad").val();

//     //send characters to server
//     socket.emit("client_character", { buffer: character });
//     console.log("To server: ", { buffer: character });
//   });
// });

// let socket = io("http://localhost:4444");
// const l = console.log;

// const editor = document.getElementById("editor");

// editor.addEventListener("keyup", (evt) => {
//   const text = editor.value;
//   socket.send(text);
// });

// socket.on("message", (data) => {
//   editor.value = data;
// });

var socket = io("http://localhost:3000");
const l = console.log;
function getEl(id) {
  return document.getElementById(id);
}
const editor = getEl("editor");
editor.addEventListener("keyup", (evt) => {
  const text = editor.value;
  socket.send(text);
});
socket.on("message", (data) => {
  editor.value = data;
});
