const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
const fs = require("fs");
const path = require("path");

let data = fs.readFileSync(path.resolve(__dirname, "./messageData.json"));
data = JSON.parse(data);

wss.on("connection", function (ws) {
  console.log("new client connected");
  //send a message back at client
  ws.send(JSON.stringify(data));

  ws.on("message", function (message) {
    console.log("received: %s", message);
  });
});

/*
const express = require("express");
const fs = require("fs");


let data = fs.readFileSync(path.resolve(__dirname, "./messageData.json"));
data = JSON.parse(data);

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/", (req, res) => {
  res.write(JSON.stringify(data));
  res.end();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
*/
