import React from "react";
import edit from "../clip.svg";

interface messageProps {
  key: string;
  edit: boolean;
  owner: string;
  txt: string;
  hours: string;
  minutes: string;
  day: string;
  month: string;
  year: string;
}

export default function Message(props: messageProps) {
  let [txt, setTxt] = React.useState(props.txt);
  let [edited, setEdited] = React.useState(props.edit);

  function click() {
    setEdited(true);
    (document.querySelector(".textInput") as HTMLElement).focus();
  }

  return (
    <div className={props.owner} onDoubleClick={click}>
      <div className="stamp">
        {props.hours}:{props.minutes} - {props.day}.{props.month}.{props.year}
      </div>
      <div className="txt">
        {txt}
        {edited && <img className="edit" src={edit} alt="edit" />}
      </div>
    </div>
  );
}
