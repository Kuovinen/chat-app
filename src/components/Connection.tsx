import React from "react";
import "./Connection.css";
import TypingText from "./TypingText";
interface Props {
  chatCode: string;
  setChatCode: React.Dispatch<React.SetStateAction<string>>;
  webSocket: undefined | WebSocket;
  conStatusTxt: string;
}

export default function Connection(props: Props) {
  console.log("RENDERED CONNECTION");
  const [tik, setTik] = React.useState<boolean>(true);
  const [input, setInput] = React.useState<string>("");
  React.useEffect(assignInput, [props.chatCode]);
  function assignInput() {
    setInput(props.chatCode);
  }

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
  function writeText(event: React.FormEvent<HTMLInputElement>) {
    setInput((event.target as HTMLInputElement).value);
  }
  //interval that checks connection status every 3 seconds
  let intervalID: NodeJS.Timeout;
  React.useEffect(() => {
    if (tik) {
      intervalID = setInterval(() => {
        setTik((tik) => !tik);
      }, 3000);
    }
    return () => clearInterval(intervalID);
  }, []);

  function connect(): void {
    props.setChatCode(input);
    if (props.webSocket) {
      props.webSocket.send(
        JSON.stringify({ action: "getChatUpdate", payload: input })
      );
    }
  }

  return (
    <form className="connectionContainer" onSubmit={(e) => e.preventDefault()}>
      <div id="statusContainer">
        <span id="connectionStatusDot" style={setStyle()}></span>
        <label id="conLable" htmlFor="connection">
          {props.conStatusTxt}
        </label>
      </div>
      <input
        id="chatCode"
        placeholder="Enter a chat code"
        value={input}
        onChange={writeText}
      ></input>
      <button id="connectionBTN" onClick={connect}>
        Connect
      </button>
    </form>
  );
}
