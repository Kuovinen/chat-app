import React from "react";

import MessageHstr from "./components/MessageHstr";
import MessageInputField from "./components/MessageInputField";
import Themes from "./components/Themes";
import Connection from "./components/Connection";
import User2Status from "./components/User2Status";
import "./App.css";
import emoji from "./emoji.svg";

interface MessageObject {
  id: string;
  deleted: boolean;
  owner: string;
  hours: number;
  minutes: string;
  date: string;
  month: string;
  year: string;
  edited: boolean;
  attachment: null;
  txt: string;
}
interface messageData {
  id: string;
  deleted: boolean;
  owner: string;
  hours: number;
  minutes: number;
  date: number;
  month: number;
  year: number;
  edited: boolean;
  attachment: null | string;

  txt: string;
}
export default function App() {
  console.log("REDERED APP");
  //State controlled elements:
  const [chat, setChat] = React.useState<JSX.Element[]>([]);
  const [chatCode, setChatCode] = React.useState<string>("");
  const [lastMessageObject, setLastMessageObject] = React.useState<
    MessageObject | {}
  >({});
  const [webSocket, setWebSocket] = React.useState<undefined | WebSocket>(
    undefined
  );

  // chatlog message elements based on the database
  // array ommiting deleted messages
  // owner should be chosen by aslias name
  function updateChatlog(array: messageData[]) {
    if (array.length > 0) {
      console.log("got here");
      const filteredHistory = array.filter((element) => !element.deleted);
      const history: JSX.Element[] = filteredHistory.map((element) => {
        return (
          <MessageHstr
            key={element.id}
            owner={element.owner === "user1" ? "user1" : "user2"}
            txt={element.txt}
            id={element.id}
            hours={element.hours}
            minutes={element.minutes}
            date={element.date}
            month={element.month}
            year={element.year}
            edited={element.edited}
            attachment={element.attachment}
          />
        );
      });
      setChat(history);
    }
  }
  console.log(lastMessageObject);
  //initial api connection set up with useEffect
  function callApi() {
    let webSocket: WebSocket = new WebSocket("ws://127.0.0.1:8080");
    setWebSocket(webSocket);
  }
  //connect to api when program webpage opend
  React.useEffect(callApi, []);
  //if code changes automatically send updateChat request to api
  React.useEffect(codeConnect, [chatCode]);
  //if last message changes it to API
  React.useEffect(sendChatUpdate, [lastMessageObject]);

  function sendChatUpdate() {
    if (webSocket) {
      webSocket.send(
        JSON.stringify({
          action: "addMessage",
          payload: JSON.stringify(lastMessageObject),
        })
      );
    }
  }

  function getChatCode() {
    console.log("clicked get code button");
    if (webSocket) {
      webSocket.send(JSON.stringify({ action: "getCode", payload: "" }));
    }
  }
  function codeConnect() {
    if (webSocket) {
      webSocket.send(
        JSON.stringify({ action: "getChatUpdate", payload: chatCode })
      );
    }
  }

  //socket listener for API input
  function socketListener() {
    //handle incomming message data or new url data - used in socketListener()
    function handleWebsocketData(data: string) {
      const parsedData = JSON.parse(data);
      //objects that have CODE are chatlogs, with code identifying the instance
      if (parsedData.action === "code") {
        setChatCode(parsedData.payload);
        console.log("API sent CODE");
      }
      //objects that have URL are chatlog instance identifiers used for connecting
      else if (parsedData.action === "update") {
        updateChatlog(JSON.parse(parsedData.payload));
        console.log("api sent UPDATE");
      }
    }

    //if websocket is defined
    if (webSocket) {
      //handle the possible incomming data
      webSocket.onmessage = function (event) {
        console.log(JSON.parse(event.data));
        handleWebsocketData(event.data);
      };
    } else {
      console.log("Websocket might be undefined");
    }
  }

  //this handles the webSocket messages
  socketListener();

  //Scroll down chat window as new messages pop in
  React.useEffect(() => {
    (document.querySelector(".chatEnd2") as HTMLElement).scrollIntoView(/*{
      behavior: "smooth",
    }*/);
  }, [chat]);

  return (
    <div className="site">
      <div className="menu">
        <button className="menuBtn" onClick={getChatCode}>
          LINK
        </button>
        <Themes />
      </div>
      {/*entire chat section*/}
      <div className="talk">
        {/*TOP SECTION OF CHAT*/}
        <section className="contact">
          <Connection chatCode={chatCode} webSocket={webSocket} />
          <User2Status />
        </section>
        {/*CHAT ITSELF*/}
        <div className="dialogue">
          {chat}
          <div className="chatEnd"></div>
          <div className="chatEnd2"></div>
        </div>
        {/*INPUT SECTION*/}
        <section className="input">
          <img className="emoji" src={emoji} alt="emo"></img>

          <MessageInputField
            setChat={setChat}
            chat={chat}
            setLastMessageObject={setLastMessageObject}
          />
        </section>
      </div>
    </div>
  );
}
