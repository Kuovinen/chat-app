import React from "react";
import messageData from "./components/messageData.js";
import Message from "./components/Message.js";
import MessageHstr from "./components/MessageHstr.js";
import MessageInputField from "./components/MessageInputField.js";
import "./App.css";
import ava1 from "./avatar.jpeg";
import ava2 from "./avatar2.jpeg";
import TypingText from "./components/TypingText.js";
import emoji from "./emoji.svg";

export default function App() {
  //State controlled elements:
  const [chat, setChat] = React.useState([]);
  const [inputTXT, setInputTXT] = React.useState<string>("");

  // chatlog message elements based on the database
  // array ommiting deleted messages
  // owner should be chosen by aslias name
  function updateChatlog(array) {
    const history: [] = array.map((element) => {
      if (!element.deleted) {
        return (
          <MessageHstr
            key={element.id}
            owner={element.owner === "zuro" ? "mine" : "her"}
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
      }
    });
    setChat(history);
  }
  // call the server and parse the recieved json message data
  function callApi() {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => {
        updateChatlog(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(`Got error while trying to access server data.`);
        console.log(err);
      });
  }
  //generate chalog upon app start
  React.useEffect(callApi, []);

  function sendMessage(event) {
    event.preventDefault();
    // if there is text in input field (then it's "trufy")
    // make a message element with the text value
    inputTXT &&
      setChat((previous) => [
        ...previous,
        <Message
          key={chat.length + 2}
          edit={false}
          owner="mine"
          txt={inputTXT}
        />,
      ]);
    setInputTXT("");
  }
  //Scroll down chat window as new messages pop in
  React.useEffect(() => {
    document.querySelector(".chatEnd2").scrollIntoView(/*{
      behavior: "smooth",
    }*/);
  }, [chat]);

  return (
    <div className="site">
      {/*side menu*/}
      <div className="menu">
        <div className="menuBtn"></div>
        <img id="ava2" src={ava2} alt="ava"></img>
      </div>
      {/*entire chat section*/}
      <div className="talk">
        {/*TOP SECTION OF CHAT*/}
        <section className="contact">
          <input className="search" placeholder="search"></input>
          <h1 className="alias">ALIAS</h1>
          <img id="ava" src={ava1} alt="ava"></img>
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

          <div className="send"></div>
        </section>
        <TypingText />
      </div>
    </div>
  );
}
