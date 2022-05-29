const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

function getParsedData() {
  const data = fs.readFileSync(path.resolve(__dirname, "./messageData.json"));
  const parsedData = JSON.parse(data);
  return parsedData;
}

wss.on("connection", function (ws) {
  console.log("new client connected");

  ws.on("message", function (message) {
    const formattedMessage = JSON.parse(message.toString());
    //if GETCODE generate and add empty chatlog and send it's code back
    if (formattedMessage.action === "getCode") {
      console.log("received: GETCODE", formattedMessage);
      const code = uuidv4();
      const emptyChatLog = {
        code: code,
        messages: [],
      };
      const parsedData = getParsedData();
      const parsedDataUpdate = [...parsedData, emptyChatLog];
      const dataString = JSON.stringify(parsedDataUpdate);

      try {
        fs.writeFileSync(
          path.resolve(__dirname, "./messageData.json"),
          dataString
        );
        // file written successfully
      } catch (err) {
        console.error(err);
      }
      ws.send(JSON.stringify({ action: "code", payload: code }));
    }
    //if GETCHATUPDATE parse chatlog, search for code, send back messages
    else if (formattedMessage.action === "getChatUpdate") {
      console.log("received: UPDATECHAT", formattedMessage);
      //get data from chatlog file
      const parsedData = getParsedData();

      //find the chatlog who's code coincides with payload of front message
      const desiredLog = parsedData.filter(
        (element) => element.code === formattedMessage.payload
      );
      const messages = JSON.stringify(desiredLog[0].messages);
      //send chatlog contents
      ws.send(JSON.stringify({ action: "update", payload: messages }));
    } else if (formattedMessage.action === "addMessage") {
      console.log(formattedMessage.payload);
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
