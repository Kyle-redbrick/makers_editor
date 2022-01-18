import React from "react";
import "./index.scss";

import playImg from "../../../../Image/builder3d/icon-28-sound-box-play.svg";
import pauseImg from "../../../../Image/builder3d/icon-28-sound-box-pause.svg";
import trashImg from "../../../../Image/builder3d/delete-sound.svg";
import addSoundIcon from "../../../../Image/builder3d/add-sound-asset.svg";

function View(props) {
  const {
    containerRef,
    assetLibrary,
    soundIds,
    jukebox,
    onClickSound,
    onClickAdd,
    onRightClick,
    onClickRemove
  } = props;

  const getClassName = isSelected => {
    if (isSelected) {
      return "sounds_item sounds_item-current";
    } else {
      return "sounds_item";
    }
  };

  const getThumb = isSelected => {
    if (isSelected && jukebox.isPlaying) {
      return pauseImg;
    } else {
      return playImg;
    }
  };

  return (
    <div id="soundsList" className="objectList">
      <div className="sounds_list" ref={containerRef}>
        {soundIds &&
          soundIds.map((key, index) => {
            const isSelected = jukebox.isPlaying && jukebox.id === key;
            return (
              <div
                className={getClassName(isSelected)}
                key={index}
                onContextMenu={e => {
                  e.preventDefault();
                  onRightClick(key, e);
                }}
              >
                {/* <ButtonIndicator buttonId={`${index}`}> */}
                <div className="SoundItemThumb">
                  <img
                    className="SoundItemThumbImg"
                    src={getThumb(isSelected)}
                    alt="sound icon"
                    onClick={() => onClickSound(key)}
                  />
                </div>
                {/* </ButtonIndicator> */}
                <div
                  className="SoundItemName"
                  data-tip={assetLibrary.getSoundAsset(key).defaultName}
                >
                  {assetLibrary.getSoundAsset(key).defaultName}
                </div>
                <div
                  className="SoundItemDelete"
                  onClick={() => onClickRemove(key)}
                >
                  <img className="SoundItemDeleteImg" src={trashImg} alt="" />
                </div>
              </div>
            );
          })}

        <div className="soundList_addBtn" onClick={onClickAdd}>
          <img src={addSoundIcon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default View;
