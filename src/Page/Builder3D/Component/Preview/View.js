import React from "react";
import "./index.scss";

import deafalutSceneImg from "../../../../Image/builder3d/default-scene-icon.svg";
import deafalutCameraImg from "../../../../Image/builder3d/default-camera-icon.svg";

export default function(props) {
  const { canvasId, isPlaceholderHidden, isPreviewHidden } = props;
  return (
    <div className={`preview ${canvasId}`}>
      {isPlaceholderHidden || (
        <div className="preview_placeholder">
          <div className="preview_placeholder_wrapper">
            <img
              className="preview_placeholder_img"
              src={
                canvasId === "previewCanvas"
                  ? deafalutSceneImg
                  : deafalutCameraImg
              }
              alt="scene icon"
            />
            <p className="preview_placeholder_title">
              {canvasId === "previewCanvas"
                ? "선택된 장면이 없습니다"
                : "선택된 Camera가 없습니다"}
            </p>
            {canvasId === "previewCanvas" && (
              <p className="preview_placeholder_subtitle">
                좌측 상단의 Scenes 목록에서 장면을 선택해주세요.
              </p>
            )}
          </div>
        </div>
      )}
      <canvas
        id={canvasId}
        className={`previewCanvas${
          isPreviewHidden ? " previewCanvas-hidden" : ""
        }`}
      />
    </div>
  );
}
