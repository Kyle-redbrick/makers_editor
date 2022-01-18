import React, { Component } from "react";
import DndWrapper from "../../../../utils/dndWrapper";
import removeImg from "../../../../../../Image/builder/group-5.svg";
// import Sprite from "../../../Sprite";
import "./index.scss";

class SceneItem extends Component {
  render() {
    const {
      screenMode,
      isSelected,
      index,
      handleRemoveScene,
      handleSelectScene,
      // handleSelectTab,
      sceneId,
      scene
      // isOpened
    } = this.props;

    let sceneItemClassName = "Scene_Item";
    if (isSelected) sceneItemClassName += " Scene_Item_Selected";
    if (screenMode === "HORIZONTAL") {
      sceneItemClassName += " Scene_Item_Horizontal";
    } else {
      sceneItemClassName += " Scene_Item_Vertical";
    }

    const imgUrl = scene.preview
      ? scene.preview
      : "https://wizschool-assets.s3.ap-northeast-2.amazonaws.com/background/black_background.png";

    return (
      <div className={sceneItemClassName} key={index}>
        {/* scene info */}
        <div className="SceneInfo" onClick={() => handleSelectScene(sceneId)}>
          {/* thumb */}
          <div className="Scene_Thumb">
            <img className="Scene_Thumb_Img" src={imgUrl} alt="thumb" />
          </div>

          {/* name */}
          <div className="Scene_Name">{scene.sceneName}</div>

          {/* remove */}
          {isSelected && (
            <div
              className="Scene_Remove"
              onClick={() => handleRemoveScene(sceneId)}
            >
              <img src={removeImg} alt="scene remove" />
            </div>
          )}
        </div>
        {/* {isOpened && isSelected && <Sprite />} */}
      </div>
    );
  }
}

export default DndWrapper(SceneItem, "SCENE");
