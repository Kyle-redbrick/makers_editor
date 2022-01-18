import React from "react";
import "./index.scss";
import FullBtnImg from "../../../../Image/builder-full-btn.svg"

export default function(props) {
  const { handleClickFullScreen } = props;
  return (
    <div className="FullScreenButton">
      <img onClick={handleClickFullScreen} src={FullBtnImg} alt="fullscreen button"/>
    </div>
  );
}
