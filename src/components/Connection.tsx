import React from "react";
import "./Connection.css";
import TypingText from "./TypingText";
interface Props {
  chatCode: string;
  webSocket: undefined | WebSocket;
}

export default function Connection(props: Props) {
  console.log("RENDERED CONNECTION");
  const [tik, setTik] = React.useState<boolean>(true);
  function setStyle() {
    let style = {};
    if (props.webSocket) {
      switch (props.webSocket.readyState) {
        case 0:
          style = { ...style, background: "yellow" };
          break;
        case 1:
          style = { ...style, background: "green" };
          break;
        case 2:
          style = { ...style, background: "orange" };
          break;
        case 3:
          style = { ...style, background: "var(--cp-MainBKG)" };
          break;
      }
    }
    return style;
  }
  let intervalID: NodeJS.Timeout;
  React.useEffect(() => {
    if (tik) {
      intervalID = setInterval(() => {
        setTik((tik) => !tik);
      }, 3000);
    }
    return () => clearInterval(intervalID);
  }, []);
  return (
    <form className="connectionContainer">
      <div id="statusContainer">
        <span id="connectionStatusDot" style={setStyle()}></span>
        <label id="conLable" htmlFor="connection">
          {"Not connected"}
        </label>
      </div>
      <input
        id="chatCode"
        placeholder="Enter a chat code"
        value={props.chatCode}
      ></input>
      <button id="connectionBTN">Connect</button>
    </form>
  );
}
