import React from "react";
import "./index.scss";

import positionIcon from "../../../../Image/builder3d/icon-38-tool-bar-position-white.svg";
import rotationIcon from "../../../../Image/builder3d/icon-38-tool-bar-rotation-white.svg";
import scaleIcon from "../../../../Image/builder3d/icon-38-tool-bar-scale-white.svg";
import cameraIcon from "../../../../Image/builder3d/icon-38-tool-bar-camera-view-white.svg";
import playIcon from "../../../../Image/builder3d/icon-38-tool-bar-play-white.svg";

export default function(props) {
  const {
    currentGizmoType,
    availableGizmoTypes,
    // onClickMenu,
    onClickPlay,
    onClickGizmoType,
    onClickCameraView
  } = props;
  const { GIZMO } = window.BabylonConstant;

  const imgSrc = type => {
    switch (type) {
      case "position":
        return positionIcon;
      case "rotation":
        return rotationIcon;
      case "scale":
        return scaleIcon;
      case "camera":
        return cameraIcon;
      default:
        break;
    }
  };

  return (
    <div className="toolbar">
      {/* <div
        className="toolbar_section toolbar_section-menu"
        onClick={onClickMenu}
      >
        메뉴
      </div> */}
      <div className="toolbar_section toolbar_section-gizmo">
        {Object.keys(GIZMO).map(key => {
          const gizmoType = GIZMO[key];
          const gizmoAvailable = availableGizmoTypes.includes(gizmoType);
          return (
            <div
              key={gizmoType}
              className={`toolbar_gizmoType toolbar_gizmoType-${gizmoType}${
                gizmoType === currentGizmoType
                  ? " toolbar_gizmoType-current"
                  : ""
              }${gizmoAvailable ? "" : " toolbar_gizmoType-disable"}`}
              onClick={() => {
                onClickGizmoType(gizmoType);
              }}
            >
              <img src={imgSrc(gizmoType)} alt="" />
            </div>
          );
        })}
        <div
          className="toolbar_gizmoType toolbar_section-camera"
          onClick={onClickCameraView}
        >
          <img src={imgSrc("camera")} alt="" />
        </div>
        <div className="toolbar_section-play" onClick={onClickPlay}>
          <img src={playIcon} alt="" />
          실행
        </div>
      </div>
    </div>
  );
}
