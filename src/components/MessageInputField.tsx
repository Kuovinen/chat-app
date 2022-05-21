import React from "react";
import clip from "../clip.svg";

export default function Input(props) {
  //set the input text to what the input fields value is
  function writeText(event) {
    props.setInputTXT(() => event.target.value);
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
