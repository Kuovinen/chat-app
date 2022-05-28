import React from "react";
import messageData from "./components/messageData";
import Message from "./components/Message";
import MessageHstr from "./components/MessageHstr";
import MessageInputField from "./components/MessageInputField";
import Themes from "./components/Themes";
import Connection from "./components/Connection";
import User2Status from "./components/User2Status";
import "./App.css";
import emoji from "./emoji.svg";

export default function App() {
  //State controlled elements:
  let [chat, setChat] = React.useState<JSX.Element[]>([]);
  const [inputTXT, setInputTXT] = React.useState("");
  const [webSocket, setWebSocket] = React.useState<undefined | WebSocket>(
    undefined
  );
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
  // chatlog message elements based on the database
  // array ommiting deleted messages
  // owner should be chosen by aslias name
  function updateChatlog(array: messageData[]) {
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
  //initial api connection set up with useEffect
  function callApi() {
    let webSocket: WebSocket = new WebSocket("ws://127.0.0.1:8080");
    setWebSocket(webSocket);
  }
  //initial api connection set up with useEffect
  React.useEffect(callApi, []);

  //function to get a new link
  function getLink() {
    console.log("clicked get link");
    console.log(webSocket);
    if (webSocket) {
      webSocket.send("get");
    }
  }
  //socket listener for API input
  function socketListener() {
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
  //handle incomming message data or new url data - used in socketListener()
  function handleWebsocketData(data: string) {
    const parsedData = JSON.parse(data);
    //objects that have CODE are chatlogs, with code identifying the instance
    if (parsedData.code) {
      updateChatlog(parsedData.messages);
    }
    //objects that have URL are chatlog instance identifiers used for connecting
    else if (parsedData.url) {
      console.log(parsedData.url);
    }
  }
  //this handles the webSocket messages
  socketListener();

  function sendMessage(event: Event) {
    event.preventDefault();
    // if there is text in input field (then it's "trufy")
    // make a message element with the text value
    inputTXT &&
      setChat((previous): JSX.Element[] => [
        ...previous,
        <Message
          key={chat.length + 2 + ""}
          edit={false}
          owner="mine"
          txt={inputTXT}
        />,
      ]);
    setInputTXT("");
  }
  //Scroll down chat window as new messages pop in
  React.useEffect(() => {
    (document.querySelector(".chatEnd2") as HTMLElement).scrollIntoView(/*{
      behavior: "smooth",
    }*/);
  }, [chat]);

  return (
    <div className="site">
      <div className="menu">
        <button className="menuBtn" onClick={getLink}>
          LINK
        </button>
        <Themes />
      </div>
      {/*entire chat section*/}
      <div className="talk">
        {/*TOP SECTION OF CHAT*/}
        <section className="contact">
          <Connection />
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
            sendMessage={sendMessage}
            setChat={setChat}
            inputTXT={inputTXT}
            setInputTXT={setInputTXT}
          />
        </section>
      </div>
    </div>
  );
}
