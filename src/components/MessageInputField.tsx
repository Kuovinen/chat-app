import React from "react";
import "./MessageInputField.css";
import clip from "../clip.svg";
import Message from "./Message";
interface inputProps {
  setChat: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  chat: JSX.Element[];
}

export default function Input(props: inputProps) {
  console.log("RENDERED INPUT");
  const [inputTXT, setInputTXT] = React.useState<string>("");
  //set the input text to what the input fields value is
  function writeText(event: React.FormEvent<HTMLInputElement>) {
    setInputTXT(() => (event.target as HTMLInputElement).value);
  }

  function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    // if there is text in input field (then it's "trufy")
    // make a message element with the text value
    inputTXT &&
      props.setChat((previous): JSX.Element[] => [
        ...previous,
        <Message
          key={props.chat.length + 2 + ""}
          edit={false}
          owner="user1"
          txt={inputTXT}
        />,
      ]);
    setInputTXT("");
  }

  return (
    <form onSubmit={sendMessage} className="message">
      <input
        type="text"
        value={inputTXT}
        placeholder="Message"
        className="textInput"
        onChange={writeText}
      ></input>
      <button className="sendMsg">SEND</button>
      {/* <img className="file" src={clip} alt="f" />*/}
    </form>
  );
}
