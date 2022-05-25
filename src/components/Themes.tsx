import React from "react";
import "./Themes.css";
export default function Themes() {
  function applyTheme(color: string): void {
    document.documentElement.style.setProperty("--cp-MainBKG", `${color}`);
  }
  const arrColors = [
    "hsl(20, 28%, 14%)",
    "hsl(80, 28%, 14%)",
    "hsl(120, 28%, 14%)",
    "hsl(180, 28%, 14%)",
    "hsl(220, 28%, 14%)",
    "hsl(280, 28%, 14%)",
  ];
  return (
    <div id="themesGrid">
      {arrColors.map((element) => (
        <button
          className="thm"
          onClick={() => {
            applyTheme(`${element}`);
          }}
          style={{ background: `${element}` }}
        ></button>
      ))}
    </div>
  );
}
