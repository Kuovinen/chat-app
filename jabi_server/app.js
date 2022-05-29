const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const CLIENTS = [];
function getParsedData() {
  const data = fs.readFileSync(path.resolve(__dirname, "./messageData.json"));
  const parsedData = JSON.parse(data);
  return parsedData;
}
/*
try {
  fs.writeFileSync(
    path.resolve(__dirname, "./messageData.json"),
    JSON.stringify([])
  );
  // file written successfully
} catch (err) {
  console.error(err);
}
*/
wss.on("connection", function (ws) {
  console.log("new client connected");
  CLIENTS.push(ws);
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
      //assign the ws it's chatcode for future ref,when broadcasting messages
      ws.idcode = formattedMessage.payload;

      //find the chatlog who's code coincides with payload of front message
      const desiredLog = parsedData.filter(
        (element) => element.code === formattedMessage.payload
      );
      const messages = JSON.stringify(desiredLog[0].messages);
      //send chatlog contents
      ws.send(JSON.stringify({ action: "update", payload: messages }));
    }
    //ADD NEW MESSAGE
    else if (formattedMessage.action === "addMessage") {
      console.log("received: ADDMESSAGE", formattedMessage);
      //get data from chatlog file
      const parsedData = getParsedData();
      const formatedPayload = JSON.parse(formattedMessage.payload);
      //find the chatlog who's code coincides with payload of front message
      const desiredLog = parsedData.filter(
        (element) => element.code === formatedPayload.code
      )[0];
      //add message to desiredLogs messages
      const newMessagesArray = [
        ...desiredLog.messages,
        formatedPayload.message,
      ];
      //assign updates messages array to chatlog
      const desiredLogUpdated = {
        ...desiredLog,
        messages: newMessagesArray,
      };

      const otherLogs = parsedData.filter(
        (element) => element.code !== formatedPayload.code
      );
      const updatedChatlogList = [desiredLogUpdated, ...otherLogs];
      const finalArray = JSON.stringify(updatedChatlogList);
      try {
        fs.writeFileSync(
          path.resolve(__dirname, "./messageData.json"),
          finalArray
        );
        // file written successfully
      } catch (err) {
        console.error(err);
      }
      const formattednewMessagesArray = JSON.stringify(newMessagesArray);
      //send chatlog contents
      CLIENTS.map((element) => {
        if (element.idcode == formatedPayload.code) {
          element.send(
            JSON.stringify({
              action: "update",
              payload: formattednewMessagesArray,
            })
          );
        }
      });
    }
  });
});
