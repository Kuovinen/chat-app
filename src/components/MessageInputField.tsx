import React from "react";
import "./MessageInputField.css";
import clip from "../clip.svg";
import Message from "./Message";

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

interface inputProps {
  setChat: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  chat: JSX.Element[];
  setLastMessageObject: React.Dispatch<
    React.SetStateAction<{} | MessageObject>
  >;
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
    const date = new Date();
    const hours =
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const hoursString = hours.toString();
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const minutesString = minutes.toString();
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const dayString = day.toString();
    const month =
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
    const monthString = month.toString();
    const year = date.getFullYear();
    const yearString = year.toString();
    inputTXT &&
      props.setChat((previous): JSX.Element[] => [
        ...previous,
        <Message
          key={props.chat.length + 2 + ""}
          edit={false}
          owner="user1"
          txt={inputTXT}
          hours={hoursString}
          minutes={minutesString}
          day={dayString}
          month={monthString}
          year={yearString}
        />,
      ]);
    const lastMessageObject = {
      id: props.chat.length,
      deleted: false,
      owner: "user1",
      hours: hoursString,
      minutes: minutesString,
      date: dayString,
      month: monthString,
      year: yearString,
      edited: false,
      attachment: null,
      txt: inputTXT,
    };
    props.setLastMessageObject(lastMessageObject);
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
