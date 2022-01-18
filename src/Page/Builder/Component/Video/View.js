import React from "react";
import "./index.scss";
import closeImg from "../../../../Image/builder/x-copy-3.svg";
import closeImg_darkmode from "../../../../Image/builder/x-copy-3_darkmode.svg";
import { FormattedMessage } from "react-intl";
import { getColorTheme } from "../../utils/colorThemeUtil";
export default function(props) {
  const { handleSelectTab, handleChangeZIndex, videoURL, videoRef } = props;
  const colorTheme = getColorTheme();
  return (
    <div className="Video" onMouseDown={() => handleChangeZIndex("video")}>
      {/* title */}
      <div className="VideoTitleLine handle">
        <div className="VideoTitle">
          <FormattedMessage id="ID_VIDEO_TITLE" />
        </div>
        <div className="VideoClose" onClick={() => handleSelectTab("video")}>
          <img
            src={colorTheme === "darkMode" ? closeImg_darkmode : closeImg}
            alt="img"
          />
        </div>
      </div>

      {/* content */}
      <div className="VideoContent">
        <video
          className="VideoContainerVideo"
          controls
          playsInline
          controlsList="nodownload"
          ref={videoRef}
          onContextMenu={e => {
            e.preventDefault();
            return false;
          }}
        >
          <source src={videoURL} />
        </video>
      </div>
    </div>
  );
}
