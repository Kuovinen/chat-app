import React from "react";
import "./User2Status.css";
import TypingText from "./TypingText";
export default function User2Status() {
  return (
    <div className="div">
      <div className="user2Data">
        <span id="user2status"></span>
        <h1 className="alias">Contact</h1>
      </div>
      <TypingText />
    </div>
  );
}
