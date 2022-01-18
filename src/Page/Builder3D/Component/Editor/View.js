import React from "react";
import AceEditor from "./Component/AceEditor";
import "./index.scss";
import apiImg from "../../../../Image/builder3d/api-box-icon.svg";
import closeIcon from "../../../../Image/builder3d/close-popup-icon.svg";

import meshIcon from "../../../../Image/builder3d/icon-32-mesh-off-white.svg";
import skyboxIcon from "../../../../Image/builder3d/icon-32-skybox-off-white.svg";
import lightIcon from "../../../../Image/builder3d/icon-32-light-off-white.svg";
import cameraIcon from "../../../../Image/builder3d/icon-32-camera-off-white.svg";
import guiIcon from "../../../../Image/builder3d/icon-32-gui-off-white.svg";
import textureGuiIcon from "../../../../Image/builder3d/icon-32-texture-gui-off-white.svg";

const imgSrc = type => {
  switch (type) {
    case "mesh":
      return meshIcon;
    case "skybox":
      return skyboxIcon;
    case "light":
      return lightIcon;
    case "camera":
      return cameraIcon;
    case "gui":
      return guiIcon;
    case "textureGui":
      return textureGuiIcon;
    default:
      break;
  }
};

export default function(props) {
  const { currentGameObject, onClickClose, onApiClick } = props;
  const subTitle = currentGameObject
    ? currentGameObject.name
    : "게임 오브젝트를 선택하세요.";
  return (
    <div id="editor_3d" className="editor rndResizeHandler">
      <div className="editor_header rndDragHandler">
        <div className="editor_title">Code Editor</div>
        <div className="editor_right">
          <div className="editor_subTitle">
            <img src={imgSrc(currentGameObject.type)} alt="icon" />
            {subTitle}
          </div>
          <div className="editor_closeBtn" onClick={onClickClose}>
            <img src={closeIcon} alt="" />
          </div>
        </div>
      </div>
      <div className="editor_container">
        <AceEditor />
        <div className="editor_apiBtn" onClick={onApiClick}>
          <img src={apiImg} alt="img" />
        </div>
      </div>
    </div>
  );
}
