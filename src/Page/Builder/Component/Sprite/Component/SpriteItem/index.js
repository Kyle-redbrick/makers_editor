import React, { Component } from "react";
import DndWrapper from "../../../../utils/dndWrapper";
import AssetLibrary from "../../../../utils/assetLibrary";
import { SpriteType } from "../../../../../../Common/Util/Constant";
import removeImg from "../../../../../../Image/builder/group-5.svg";
import lockImg from "../../../../../../Image/builder/lock-14.svg";
import "./index.scss";
import ButtonIndicator from "../../../ButtonIndicator";

class SpriteItem extends Component {
  render() {
    const {
      handleRemoveSprite,
      handleSelectSprite,
      spriteName,
      type,
      isSelected,
      assetId,
      isLocked
    } = this.props;
    const asset = AssetLibrary.getAsset(assetId);
    const thumb =
      type === SpriteType.TEXT ? AssetLibrary.textboxThumb : asset.thumb;
    let thumbClassName = "SpriteItemThumbImg";
    if (type === SpriteType.BACKGROUND)
      thumbClassName += " SpriteItemThumbImgBG";
    return (
      <div className={`SpriteItem ${isSelected && "SpriteItemSelected"}`}>
        <ButtonIndicator buttonId={spriteName}>
          <div
            className="SpriteItemThumb"
            onClick={e => {
              e.preventDefault();
              handleSelectSprite(spriteName, type);
            }}
          >
            <img className={thumbClassName} src={thumb} alt="thumb" />
          </div>
        </ButtonIndicator>
        <div
          className="SpriteItemName"
          onClick={() => handleSelectSprite(spriteName, type)}
        >
          {spriteName}
        </div>
        {isLocked ? (
          <div className="SpriteItemLock">
            <img src={lockImg} alt="sprite lock" />
          </div>
        ) : (
          isSelected && (
            <div
              onClick={e => {
                e.preventDefault();
                handleRemoveSprite(spriteName);
              }}
              className="SpriteItemRemove"
            >
              <img src={removeImg} alt="sprite remove" />
            </div>
          )
        )}
      </div>
    );
  }
}

export default DndWrapper(SpriteItem, "SPRITE");
