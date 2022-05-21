import React from "react";
export default function TypingText() {
  const [typingTxt, setTypingTxt] = React.useState<string>("Alias is ");
  const [intervalId, setIntervalId] = React.useState<number>(0);
  function updateTypingTxt() {
    setTypingTxt((original) => {
      switch (original.length) {
        case 9:
          return original + "t";
        case 10:
          return original + "y";
        case 11:
          return original + "p";
        case 12:
          return original + "i";
        case 13:
          return original + "n";
        case 14:
          return original + "g";
        case 15:
          return "Alias is ";
      }
    });
  }
  function startTyping() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }
    const interval: number = window.setInterval(updateTypingTxt, 200);
    setIntervalId(interval);
  }
  return (
    <div>
      <span style={{ color: "white" }}>{typingTxt}</span>
      <button onClick={() => startTyping()}>
        {intervalId ? "Stop" : "Start"}
      </button>
    </div>
  );
}
