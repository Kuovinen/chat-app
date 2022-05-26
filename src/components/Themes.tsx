import React from "react";
import "./Themes.css";
export default function Themes() {
  function applyTheme(color: string): void {
    document.documentElement.style.setProperty("--cp-MainBKG", `${color}`);
  }
  //array that maps out the theme buttons, add more HSL colors for more options
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
      {arrColors.map((element, index) => (
        <button
          key={index}
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
