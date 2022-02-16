import React from "react";
import edit from "../clip.svg";

export default function MessageHstr(props) {
  return (
    <div className={props.owner}>
      <div className="stamp">
        {props.hours}:{props.minutes} - {props.date}.{props.month}.{props.year}
      </div>
      <div className="txt">
        {props.txt}
        {props.edited && <img className="edit" src={edit} alt="edit" />}
      </div>
    </div>
  );
}
