import React from "react";
import "./Connection.css";
import TypingText from "./TypingText";
export default function Connection() {
  return (
    <form className="connectionContainer">
      <div id="statusContainer">
        <span id="connectionStatusDot"></span>
        <label id="conLable" htmlFor="connection">
          {"Not connected"}
        </label>
      </div>
      <input id="chatCode" placeholder="Enter a chat code"></input>
      <button id="connectionBTN">Connect</button>
    </form>
  );
}
