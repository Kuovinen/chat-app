import React from "react";
export default function TypingText() {
  const [typingTxt, setTypingTxt] = React.useState<string>("is ");
  const [intervalId, setIntervalId] = React.useState<number>(0);
  function updateTypingTxt() {
    setTypingTxt((original): string => {
      let newText: string;
      switch (original.length) {
        case 3:
          newText = original + "t";
          break;
        case 4:
          newText = original + "y";
          break;
        case 5:
          newText = original + "p";
          break;
        case 6:
          newText = original + "i";
          break;
        case 7:
          newText = original + "n";
          break;
        case 8:
          newText = original + "g";
          break;
        case 9:
          newText = "is ";
          break;
        default:
          newText = "something went wrong";
          break;
      }
      return newText;
    });
  }
  function startTyping() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }
    const interval = window.setInterval(updateTypingTxt, 200);
    setIntervalId(interval);
  }
  return (
    <div>
      <span
        style={{ color: "white", fontSize: "1.25rem", marginLeft: "3.5rem" }}
      >
        {typingTxt}
      </span>
      <button
        onClick={() => startTyping()}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        {intervalId ? "Stop" : "Start"}
      </button>
    </div>
  );
}
