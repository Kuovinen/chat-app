import React from "react";
import clip from "../clip.svg";

interface inputProps {
  sendMessage: (event: any) => void;
  setChat: React.Dispatch<React.SetStateAction<never[]>>;
  inputTXT: string;
  setInputTXT: React.Dispatch<React.SetStateAction<string>>;
}

export default function Input(props: inputProps) {
  //set the input text to what the input fields value is
  function writeText(event: React.FormEvent<HTMLInputElement>) {
    props.setInputTXT(() => (event.target as HTMLInputElement).value);
  }

  return (
    <form onSubmit={props.sendMessage} className="message">
      <input
        type="text"
        value={props.inputTXT}
        placeholder="Message"
        className="textInput"
        onChange={writeText}
      ></input>
      <button className="sendMsg">SEND</button>
      <img className="file" src={clip} alt="f" />
    </form>
  );
}
