import React from "react";
import AssetLibrary from "../../utils/assetLibrary";
import addImg from "../../../../Image/builder/light-mode-sound-plus.svg";
import addImg_darkmode from "../../../../Image/builder/dark-mode-sound-plus.svg";
import playImg from "../../../../Image/builder/iconspace-not-b-25-px-copy.svg";
import pauseImg from "../../../../Image/builder/group-4.svg";
import trashImg from "../../../../Image/builder/group-5.svg";
import "./index.scss";
import ButtonIndicator from "../ButtonIndicator";
import { getColorTheme } from "../../utils/colorThemeUtil";

export default function(props) {
  const {
    soundIds,
    selectedItemId,
    handleOpenSoundPopup,
    handleItemSelect,
    handleItemRemove,
    jukebox,
    intl
  } = props;
  const getClassName = isSelected => {
    if (isSelected) {
      return "Sound_Item Sound_Item_Active";
    } else {
      return "Sound_Item";
    }
  };
  const getThumb = isSelected => {
    if (isSelected && jukebox.isPlaying) {
      return pauseImg;
    } else {
      return playImg;
    }
  };
  const colorTheme = getColorTheme();

  return (
    <div className="SoundContainer">
      <div className="SoundContainer_Sounds">
        {soundIds.map((key, index) => {
          const isSelected = selectedItemId === key;

          return (
            <div className={getClassName(isSelected)} key={index}>
              <ButtonIndicator buttonId={`${index}`}>
                <div className="SoundItemThumb">
                  <img
                    className="SoundItemThumbImg"
                    src={getThumb(isSelected)}
                    alt="sound icon"
                    onClick={() => handleItemSelect(key)}
                  />
                </div>
              </ButtonIndicator>
              <div
                className="SoundItemName"
                data-tip={AssetLibrary.getSoundAsset(key).defaultName}
              >
                {AssetLibrary.getSoundAsset(key).defaultName}
              </div>

              {isSelected && (
                <div
                  className="SoundRemoveButton"
                  onClick={() => handleItemRemove(key)}
                >
                  <img
                    src={trashImg}
                    alt="trash icon"
                    data-tip={intl.formatMessage({
                      id: "ID_TOOLTIP_SOUND_DELETE"
                    })}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="SoundContainer_Line" />
      <div className="SoundContainer_Tools">
        <ButtonIndicator buttonId="soundAddImg">
          <div
            className="Sound_Add"
            onClick={handleOpenSoundPopup}
            data-tip={intl.formatMessage({
              id: "ID_TOOLTIP_SOUND_ADD"
            })}
          >
            <img
              className="Sound_Add_Img"
              src={colorTheme === "darkMode" ? addImg_darkmode : addImg}
              alt="add sound"
            />
          </div>
        </ButtonIndicator>
      </div>
    </div>
  );
}
