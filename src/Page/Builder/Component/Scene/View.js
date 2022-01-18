import React from "react";
import { FormattedMessage } from "react-intl";
import SceneItem from "./Component/SceneItem";
import addImg from "../../../../Image/builder/light-mode-sound-plus.svg";
import addImg_darkmode from "../../../../Image/builder/dark-mode-sound-plus.svg";
import copyImg from "../../../../Image/builder/light-mode-scene-copy.svg";
import copyImg_darkmode from "../../../../Image/builder/dark-mode-scene-copy.svg";
import closeImg from "../../../../Image/builder/x-copy-3.svg";
import closeImg_darkmode from "../../../../Image/builder/x-copy-3_darkmode.svg";
import { getColorTheme } from "../../utils/colorThemeUtil";
import "./index.scss";
export default function(props) {
  const {
    isOpened,
    handleAddScene,
    handleCopyScene,
    handleRemoveScene,
    handleSelectScene,
    handleSelectTab,
    handleChangeZIndex,
    moveDndScene,
    scenes,
    sceneIds,
    selectedSceneId,
    onDragStart,
    screenMode,
    intl
  } = props;
  const colorTheme = getColorTheme();

  return (
    <div
      className="SceneContainer"
      onMouseDown={() => handleChangeZIndex("scene")}
    >
      <div className="SceneTitleLine handle">
        <div className="SceneTitle">
          <FormattedMessage id="ID_SCENE_TITLE" />
        </div>
        <div className="SceneClose" onClick={() => handleSelectTab("scene")} onTouchEnd={() => handleSelectTab("scene")}>
          <img
            src={colorTheme === "darkMode" ? closeImg_darkmode : closeImg}
            alt="close btn"
          />
        </div>
      </div>
      <div className="SceneContent">
        {sceneIds.map((key, index) => {
          let scene = scenes[key];
          let isSelected = selectedSceneId === key;

          return (
            <SceneItem
              handleSelectTab={handleSelectTab}
              scene={scene}
              isSelected={isSelected}
              index={index}
              handleRemoveScene={handleRemoveScene}
              handleSelectScene={handleSelectScene}
              isOpened={isOpened}
              key={key}
              sceneId={key}
              moveDndItem={moveDndScene}
              onDragStart={onDragStart}
              screenMode={screenMode}
            />
          );
        })}
      </div>
      <div className="Scene_Setting">
        <div
          className="Scene_Add"
          onClick={() => handleAddScene()}
          data-tip={intl.formatMessage({
            id: "ID_TOOLTIP_SCENE_ADD"
          })}
        >
          <img
            className="Scene_Add_Img"
            src={colorTheme === "darkMode" ? addImg_darkmode : addImg}
            alt="add scene"
          />
        </div>
        <div
          className="Scene_Copy"
          onClick={handleCopyScene}
          data-tip={intl.formatMessage({
            id: "ID_TOOLTIP_SCENE_COPY"
          })}
        >
          <img
            className="Scene_Copy_Img"
            src={colorTheme === "darkMode" ? copyImg_darkmode : copyImg}
            alt="copy scene"
          />
        </div>
      </div>
    </div>
  );
}
