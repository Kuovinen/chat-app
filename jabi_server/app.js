const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//console.log(parsedData[0]);
console.log(uuidv4());
wss.on("connection", function (ws) {
  console.log("new client connected");
  //send a message back at client

  //check if recieved message containt a 'get' link command and give one if so
  ws.on("message", function (message) {
    const formattedMessage = JSON.parse(message.toString());
    console.log(formattedMessage);
    if (formattedMessage.action === "getCode") {
      console.log("received: GETCODE", formattedMessage);
      ws.send(JSON.stringify({ action: "code", payload: uuidv4() }));
    }
    if (formattedMessage === "getChat") {
      //get data from chatlog file
      const data = fs.readFileSync(
        path.resolve(__dirname, "./messageData.json")
      );
      const parsedData = JSON.parse(data);
      console.log("received: UPDATECHAT", formattedMessage);
      ws.send(JSON.stringify({ action: "update", payload: parsedData[0] }));
    }
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
