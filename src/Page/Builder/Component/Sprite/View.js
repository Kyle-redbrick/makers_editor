import React from "react";
import SpriteItem from "./Component/SpriteItem";
import addImg from "../../../../Image/builder/light-mode-sound-plus.svg";
import addImg_darkmode from "../../../../Image/builder/dark-mode-sound-plus.svg";
import lockImg from "../../../../Image/builder/group-14.svg";
import deleteImg from "../../../../Image/builder/group-10-copy-15.svg";
import "./index.scss";
import ButtonIndicator from "../ButtonIndicator";
import { getColorTheme } from "../../utils/colorThemeUtil";

export default function (props) {
  const {
    sprites,
    spriteIds,
    selectedObject,
    handleSelectSprite,
    handleRemoveSprite,
    moveDndSprite,
    selectedScene,
    handleSelectTab,
    handleRemoveAll,
    handleHideLocks,
    isSceneToolHidden,
  } = props;
  const imgUrl = selectedScene.preview
    ? selectedScene.preview
    : "https://wizschool-assets.s3.ap-northeast-2.amazonaws.com/background/black_background.png";
  const colorTheme = getColorTheme();
  return (
    <div className="SpriteContainer">
      <div className="SpriteContainer_Scene">
        <ButtonIndicator buttonId="sceneThumb">
          <div className="SpriteContainer_SceneImg">
            <img
              src={imgUrl.THUMBNAIL_ALI()}
              alt="scene thumb"
              onClick={() => handleSelectTab("scene")}
            />
          </div>
        </ButtonIndicator>
        <div className="SpriteContainer_SceneName">
          {selectedScene.sceneName}
        </div>
      </div>
      <div className="SpriteContainer_Sprites">
        {spriteIds.map((key, index) => {
          const { type, assetId } = sprites[key];
          const isSelected = selectedObject.name === key;
          if (selectedScene.isHiddenLockSprites) {
            if (sprites[key].locked) {
              return <div key={index} />;
            }
          }
          return (
            <SpriteItem
              key={index}
              moveDndItem={moveDndSprite}
              handleRemoveSprite={handleRemoveSprite}
              handleSelectSprite={handleSelectSprite}
              spriteName={key}
              type={type}
              index={index}
              isSelected={isSelected}
              isLocked={sprites[key].locked}
              assetId={assetId}
            />
          );
        })}
      </div>
      <div
        className={`SpriteContainer_Line ${isSceneToolHidden && "hidden"}`}
      />
      <div
        className={`SpriteContainer_SceneTools ${
          isSceneToolHidden && "hidden"
        }`}
      >
        <ButtonIndicator buttonId="addImg">
          <div
            className="Sprite_Add"
            onClick={() => handleSelectTab("spriteBox", "SpriteView")}
          >
            <img
              className="Sprite_Add_Img"
              src={colorTheme === "darkMode" ? addImg_darkmode : addImg}
              alt="add scene"
            />
          </div>
        </ButtonIndicator>
        <div className="SpriteContainer_SceneTools_BottomBtns">
          <ButtonIndicator buttonId="lockImg">
            <div className="SpriteContainer_SceneTools_BottomBtn">
              <img
                className="SpriteContainer_SceneTools_BottomImg"
                src={lockImg}
                onClick={handleHideLocks}
                alt="lock"
              />
            </div>
          </ButtonIndicator>
          <ButtonIndicator buttonId="deleteImg">
            <div className="SpriteContainer_SceneTools_BottomBtn">
              <img
                className="SpriteContainer_SceneTools_BottomImg"
                onClick={handleRemoveAll}
                src={deleteImg}
                alt="delete"
              />
            </div>
          </ButtonIndicator>
        </div>
      </div>
    </div>
  );
}
