const socket = require("socket.io");
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const indexPath = path.join(__dirname, "./index.html");
  const readStream = fs.createReadStream(indexPath);

  readStream.pipe(res);
});

const io = socket(server);
let userNumb = 0;

io.on("connection", (client) => {
  console.log("Connected");
  userNumb++;
  client.on("userNumb", (data)=>{
    client.broadcast.emit("userNumb", userNumb);
    client.emit("userNumb", userNumb);
  });

  client.on("newMessage", (data) => {
    console.log(data);

    client.broadcast.emit("newMessage", data);
    client.emit("newMessage", data);
  });
});

server.listen(8085);