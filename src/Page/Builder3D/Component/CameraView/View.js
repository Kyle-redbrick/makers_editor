import React from "react";
import Preview from "../Preview";
import "./index.scss";

import cameraIcon from "../../../../Image/builder3d/icon-32-camera-white.svg";

const { GAMEMODE } = window.BabylonConstant;

export default function(props) {
  const { cameraName } = props;
  return (
    <div className={`cameraView rndResizeHandler`}>
      <div className="cameraView_header rndDragHandler">
        <div className="cameraView_title">
          <img src={cameraIcon} alt="" />
          Camera View
        </div>
        <div className="cameraView_detail_title">
          {cameraName ? `${cameraName}` : ""}
        </div>
      </div>
      <div
        id="cameraViewCanvasContainer"
        className="cameraView_canvasContainer"
      >
        <Preview canvasId="cameraViewCanvas" mode={GAMEMODE.PREVIEW} />
      </div>
    </div>
  );
}
