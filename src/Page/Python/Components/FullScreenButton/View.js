import React from "react";
import "./index.scss";
import FullBtnImg from "../../../../Image/newPython/fullscreen-btn.png"

export default function(props) {
  const { handleClickFullScreen } = props;
  return (
    <div className="FullScreenButton">
      <img onClick={handleClickFullScreen} src={FullBtnImg} alt="fullscreen button"/>
    </div>
  );
}
