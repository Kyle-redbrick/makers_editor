import React from "react";
import addImg from "../../../../Image/builder/group-7-copy-5.svg";
import addImg_darkmode from "../../../../Image/builder/group-7-copy-5_darkmode.svg";
import rotateImg from "../../../../Image/builder/group.svg";
import rotateImg_darkmode from "../../../../Image/builder/group_darkmode.svg";
import ButtonIndicator from "../ButtonIndicator";
import PreviewCanvas from "./Component/PreviewCanvas";
import WorldSize from "./Component/WorldSize";
import { getColorTheme } from "../../../Builder/utils/colorThemeUtil";
import "./index.scss";

export default function(props) {
  const {
    handleChangeZIndex,
    handleSelectTab,
    selectedSceneId,
    handleChangeScreenMode,
    setPreivewCanvasRef,
    intl,
    fixed
  } = props;

  return (
    <div className="preview" onMouseDown={() => handleChangeZIndex("preview")}>
      {/* title */}
      {fixed || (
        <div className="preview_header">
          <div
            className="preview_button preview_button-rotate"
            onClick={handleChangeScreenMode}
            data-tip={intl.formatMessage({
              id: "ID_TOOLTIP_SCREEN_ROTATE"
            })}
          >
            <ButtonIndicator buttonId="rotateImg">
              <img
                src={
                  getColorTheme() === "darkMode"
                    ? rotateImg_darkmode
                    : rotateImg
                }
                alt="img"
              />
            </ButtonIndicator>
          </div>
          <div className="preview_header_title handle">{selectedSceneId}</div>
          <WorldSize />
          <div
            className="preview_button preview_button-add"
            onClick={() => handleSelectTab("spriteBox", "Preview")}
            data-tip={intl.formatMessage({
              id: "ID_TOOLTIP_SPRITE_ADD"
            })}
          >
            <ButtonIndicator buttonId="spriteAddImg">
              <img
                src={getColorTheme() === "darkMode" ? addImg_darkmode : addImg}
                alt="img"
              />
            </ButtonIndicator>
          </div>
        </div>
      )}
      {/* content */}
      <div id="preview_container" className="preview_container">
        <PreviewCanvas
          handleChangeZIndex={handleChangeZIndex}
          setRef={setPreivewCanvasRef}
          fixed={fixed}
        />
      </div>
    </div>
  );
}
