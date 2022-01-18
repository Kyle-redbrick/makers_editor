import React from "react";
import "./index.scss";
import { LeftBarTab } from "./Container";
import Sprite from "../Sprite";
import Sound from "../Sound";
import ButtonIndicator from "../ButtonIndicator";

export default function(props) {
  const { selectedLeftTab, handleSelectLeftTab, handleSelectTab, intl, isLeftBarButtonsHidden, isSceneToolHidden } = props;
  return (
    <div className="LeftBar">
      <div className={`LeftBarButtons ${isLeftBarButtonsHidden && "hidden"}`}>
        <ButtonIndicator buttonId="sceneImg">
          <div
            onClick={() => handleSelectLeftTab(LeftBarTab.SCENES)}
            className={`LeftBarButton ${selectedLeftTab === LeftBarTab.SCENES &&
              "LeftBarButtonActive"}`}
          >
            <div
              className="LeftBarButtonImg LeftBarButtonImgScene"
              data-tip={intl.formatMessage({
                id: "ID_TOOLTIP_SPRITE_SCENE"
              })}
            />
          </div>
        </ButtonIndicator>
        <ButtonIndicator buttonId="soundImg">
          <div
            onClick={() => handleSelectLeftTab(LeftBarTab.SOUNDS)}
            className={`LeftBarButton ${selectedLeftTab === LeftBarTab.SOUNDS &&
              "LeftBarButtonActive"}`}
          >
            <div
              className="LeftBarButtonImg LeftBarButtonImgSound"
              data-tip={intl.formatMessage({
                id: "ID_TOOLTIP_SOUND"
              })}
            />
          </div>
        </ButtonIndicator>
      </div>
      <div className="LeftBarView">
        {selectedLeftTab === LeftBarTab.SCENES && (
          <Sprite handleSelectTab={handleSelectTab} isSceneToolHidden={isSceneToolHidden}/>
        )}
        {selectedLeftTab === LeftBarTab.SOUNDS && (
          <Sound handleSelectTab={handleSelectTab} />
        )}
      </div>
    </div>
  );
}
