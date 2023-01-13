import React from "react";
import DrawerAnimationItem from "./Component/DrawerAnimationItem";
import DrawerTextEditor from "./Component/DrawerTextEditor";
import { SpriteType } from "../../../../Common/Util/Constant";
import "./index.scss";
import closeImg from "../../../../Image/builder/x-copy-3.svg";
import closeImg_darkmode from "../../../../Image/builder/x-copy-3_darkmode.svg";
import unlockImg from "../../../../Image/builder/group-14.svg";
import lockImg from "../../../../Image/builder/group-13.svg";
import hideImg from "../../../../Image/builder/group-16.svg";
import hideImg_darkmode from "../../../../Image/builder/group-16_darkmode.svg";
import showImg from "../../../../Image/builder/group-15.svg";
import copyImg from "../../../../Image/builder/group-11-copy-3.svg";
import deleteImg from "../../../../Image/builder/group-10-copy-2-small.svg";
import { FormattedMessage } from "react-intl";
import { getColorTheme } from "../../utils/colorThemeUtil";

export default function View(props) {
  const {
    type,
    asset,
    sprite,
    spriteName,
    handleSelectTab,
    handleChangeZIndex,
    handleOnChange,
    handleVisibleToggle,
    handleLockToggle,
    handleCopySprite,
    handleRemoveSprite,
    zIndex,
    value,
    onChange
  } = props;
  const colorTheme = getColorTheme();
  if (!sprite) {
    return (
      <div
        className="Property"
        onMouseDown={() => handleChangeZIndex("property")}
        style={{ zIndex }}
      >
        <div className="PropertyTitleLine handle">
          <div className="PropertyTitle">-</div>
          <div
            className="PropertyClose"
            onClick={() => handleSelectTab("property")}
            onTouchEnd={() => handleSelectTab("property")}
          >
            <img
              src={colorTheme === "darkMode" ? closeImg_darkmode : closeImg}
              alt="img"
            />
          </div>
        </div>
        <div className="PropertyContent" />
      </div>
    );
  }

  let textPreviewData = undefined;
  if (type === SpriteType.TEXT) {
    textPreviewData = sprite.preview;
  }

  return (
    <div
      className="Property"
      onMouseDown={() => handleChangeZIndex("property")}
      style={{ zIndex }}
    >
      <div className="PropertyTitleLine handle">
        <div className="PropertyTitle">
          <FormattedMessage id="ID_PROPERTY_TITLE" />
        </div>
        <div
          className="PropertyClose"
          onClick={() => handleSelectTab("property")}
          onTouchEnd={() => handleSelectTab("property")}
        >
          <img src={closeImg} alt="img" />
        </div>
      </div>

      <div className="PropertyContent">
        {/* image,name,btns */}
        <div className="PropertySection section__top">
          <div className="PropertyIcon">
            {asset && <img src={asset.thumb} alt="thumb" />}
          </div>

          <div className="PropertyBtns">
            <div className="propertyBtns__title">{spriteName}</div>
            <div className="PropertyBtns__group">
              <div onClick={handleLockToggle} className="PropertyBtn">
                <img src={sprite.locked ? unlockImg : lockImg} alt="img" />
              </div>
              <div onClick={handleVisibleToggle} className="PropertyBtn">
                <img
                  src={
                    sprite.preview.opacity === 1
                      ? showImg
                      : colorTheme === "darkMode"
                      ? hideImg_darkmode
                      : hideImg
                  }
                  alt="img"
                />
              </div>
              <div onClick={handleCopySprite} className="PropertyBtn">
                <img src={copyImg} alt="img" />
              </div>
              <div onClick={handleRemoveSprite} className="PropertyBtn">
                <img src={deleteImg} alt="img" />
              </div>
            </div>
          </div>
        </div>

        {/* size,position,angle */}
        {type !== SpriteType.BACKGROUND && (
          <div className="PropertySection">
            {/* size */}
            <div className="PropertyValue">
              <div className="PropertyValueTitle">Size</div>
              <div className="PropertyValueInput">
                <input
                  type="number"
                  name="scale"
                  onChange={handleOnChange}
                  value={parseInt(sprite.preview.scaleX * 100)}
                  tabIndex='1'
                />
                <div className="PropertUnit">%</div>
              </div>
            </div>

            {/* angle */}
            <div className="PropertyValue">
              <div className="PropertyValueTitle">Angle</div>
              <div className="PropertyValueInput">
                <input
                  type="number"
                  name="angle"
                  onChange={handleOnChange}
                  value={parseInt(sprite.preview.angle)}
                  tabIndex='2'
                />
                <div className="PropertUnit">°</div>
              </div>
            </div>

            {/* position */}
            <div className="PropertyValue">
              <div className="PropertyValueTitle">Position</div>
              <div className="PropertyValueInput PropertyValue__position">
                <input
                  type="number"
                  name="top"
                  onChange={handleOnChange}
                  value={parseInt(sprite.preview.top)}
                  className="input__position"
                  tabIndex='4'
                />
                <div className="PropertUnit">Y</div>
              </div>
              <div className="PropertyValueInput PropertyValue__position">
                <input
                  type="number"
                  name="left"
                  onChange={handleOnChange}
                  value={parseInt(sprite.preview.left)}
                  className="input__position"
                  tabIndex='3'
                />
                <div className="PropertUnit">X</div>
              </div>
            </div>
          </div>
        )}
        {/* animations */}
        {asset && asset.spriteAnimations && (
          <div className="PropertySection">
            <div className="PropertyAnimationTitle PropertyValueTitle">
              Animation
            </div>
            <div className="PropertyAnimations">
              {Object.keys(asset.spriteAnimations).map((id, index) => {
                return (
                  <div className="DrawerAnimationItem__wrapper" key={index}>
                    <DrawerAnimationItem
                      index={index}
                      key={id}
                      sprite={asset}
                      item={asset.spriteAnimations[id]}
                      name={id}
                      listName="LIST_DRAWER"
                      width={60}
                      height={60}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* text property */}
        {type === SpriteType.TEXT && textPreviewData && (
          <div className="PropertySection">
            <div className="PropertyTextTitle PropertyValueTitle">Text</div>
            <div className="PropertyText">
              <DrawerTextEditor textPreviewData={textPreviewData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
