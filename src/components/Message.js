import React from "react";
import edit from "../clip.svg";

export default function Message(props) {
  const [txt, setTxt] = React.useState(props.txt);
  const [edited, setEdited] = React.useState(props.edit);
  const date = new Date();
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
  const year = date.getFullYear();

  function click() {
    setEdited(true);
    document.querySelector(".textInput").focus();
  }

  return (
    <div className={props.owner} onDoubleClick={click}>
      <div className="stamp">
        {hours}:{minutes} - {day}.{month}.{year}
      </div>
      <div className="txt">
        {txt}
        {edited && <img className="edit" src={edit} alt="edit" />}
      </div>
    </div>
  );
}
