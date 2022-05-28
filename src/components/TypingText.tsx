import React from "react";
export default function TypingText() {
  const [typingTxt, setTypingTxt] = React.useState<string>("Alias is ");
  const [intervalId, setIntervalId] = React.useState<number>(0);
  function updateTypingTxt() {
    setTypingTxt((original): string => {
      let newText: string;
      switch (original.length) {
        case 9:
          newText = original + "t";
          break;
        case 10:
          newText = original + "y";
          break;
        case 11:
          newText = original + "p";
          break;
        case 12:
          newText = original + "i";
          break;
        case 13:
          newText = original + "n";
          break;
        case 14:
          newText = original + "g";
          break;
        case 15:
          newText = "Alias is ";
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
      <span style={{ color: "white" }}>{typingTxt}</span>
      <button
        onClick={() => startTyping()}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        {intervalId ? "Stop" : "Start"}
      </button>
    </div>
  );
}
