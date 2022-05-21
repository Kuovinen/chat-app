import React from "react";
import edit from "../clip.svg";

interface Props {
  key: string;
  owner: string;
  txt: string;
  id: string;
  hours: number;
  minutes: number;
  date: number;
  month: number;
  year: number;
  edited: boolean;
  attachment: string | null;
}

export default function MessageHstr(props: Props) {
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
