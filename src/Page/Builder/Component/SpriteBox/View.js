import React from "react";
import AssetLibrary from "../../utils/assetLibrary";
import closeImg from "../../../../Image/builder/x-copy-3.svg";
import closeImg_darkmode from "../../../../Image/builder/x-copy-3_darkmode.svg";
import searchImg from "../../../../Image/builder/group-copy-2.svg";
import "./index.scss";
import { FormattedMessage } from "react-intl";
import ButtonIndicator from "../ButtonIndicator";
import DrawerAnimationItem from "./Component/DrawerAnimationItem";
import { getColorTheme } from "../../utils/colorThemeUtil";

function getLocalName(item) {
  const lang = localStorage.getItem("wizLang");
  let title;
  try {
    title =
      JSON.parse(item.localeName)[lang] ||
      JSON.parse(item.localeName)["default"] ||
      item.name;
  } catch (err) {
    title = item.name;
  }
  return title;
}

export default function(props) {
  const {
    currentCategory,
    currentSubCategory,
    assets,
    setCurrentCategory,
    // selectedAssetId,
    // handleSelectAsset,
    handleAddAsset,
    handleOpenDrawing,
    handleOpenTextbox,
    handleSelectTab,
    handleChangeZIndex,
    handleOnChange,
    inputValue,
    email,
    hoverAsset,
    handleAnimationHide
  } = props;
  const category = AssetLibrary.categories.find(
    category => category.name === currentCategory
  );
  let subCategories = category.subCategories;
  if (category.name === "new") {
    subCategories = [];
  } else {
    subCategories = [
      {
        name: "ALL",
        localeName: JSON.stringify({
          ko: "전체",
          zh: "All",
          default: "All"
        })
      },
      ...subCategories
    ];
  }
  let currentCategoryName, currentSubCategoryName;
  const colorTheme = getColorTheme();
  return (
    <div
      className="SpriteBox"
      onMouseDown={() => handleChangeZIndex("spriteBox")}
    >
      {/* title */}
      <div className="SpriteBoxTitleLine handle">
        <div className="SpriteBoxTitle">
          <FormattedMessage id="ID_SPRITEBOX_TITLE" />
        </div>
        <div
          className="SpriteBoxClose"
          onClick={() => handleSelectTab("spriteBox")}
          onTouchEnd={() => handleSelectTab("spriteBox")}
        >
          <img
            src={colorTheme === "darkMode" ? closeImg_darkmode : closeImg}
            alt="img"
          />
        </div>
      </div>

      {/* content */}
      <div className="SpriteBoxContent">
        <div className="SpriteBoxContentLeft">
          <div className="SpriteSearch">
            <img src={searchImg} alt="search img" />
            <input
              type="text"
              value={inputValue}
              onChange={handleOnChange}
              placeholder="Search"
            />
          </div>
          <div className="SpriteBoxCategoryList">
            {AssetLibrary.getCategories(email)
              .filter(c => c.name !== "bgm" && c.name !== "sfx")
              .map((category, index) => {
                let isSelected = category.name === currentCategory;
                if (isSelected) currentCategoryName = getLocalName(category);
                return (
                  <div
                    key={index}
                    className={`SpriteBoxCategoryItem ${isSelected &&
                      "SpriteBoxCategoryItemActive"}`}
                  >
                    <ButtonIndicator buttonId={category.name}>
                      <div
                        className="SpriteBoxCategoryItemName"
                        onClick={() => setCurrentCategory(category.name)}
                      >
                        {getLocalName(category)}
                      </div>
                    </ButtonIndicator>
                    {isSelected && subCategories.length > 0 && (
                      <div className="SpriteBoxSubCategories">
                        {subCategories.map((subCategory, index) => {
                          let isSelected =
                            subCategory.name === currentSubCategory;
                          if (
                            currentCategory === currentSubCategory &&
                            subCategory.name === "ALL"
                          ) {
                            isSelected = true;
                          }
                          if (isSelected)
                            currentSubCategoryName = getLocalName(subCategory);
                          return (
                            <div
                              key={index}
                              className={`SpriteBoxSubCategoryItem ${isSelected &&
                                "SpriteBoxSubCategoryItemActive"}`}
                              onClick={() => {
                                if (subCategory.name !== "ALL") {
                                  setCurrentCategory(
                                    currentCategory,
                                    subCategory.name
                                  );
                                } else {
                                  setCurrentCategory(
                                    currentCategory,
                                    currentCategory
                                  );
                                }
                              }}
                            >
                              <div className="SpriteBoxSubCategoryItemName">
                                {getLocalName(subCategory)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            <div
              className={`SpriteBoxCategoryItem`}
              onClick={handleOpenDrawing}
            >
              <ButtonIndicator buttonId="drawingEditor">
                <div className="SpriteBoxCategoryItemName">
                  <FormattedMessage id="ID_DRAWING_EDITOR_TITLE" />
                </div>
              </ButtonIndicator>
            </div>
            <div
              className={`SpriteBoxCategoryItem`}
              onClick={handleOpenTextbox}
            >
              <ButtonIndicator buttonId="textEditor">
                <div className="SpriteBoxCategoryItemName">
                  <FormattedMessage id="ID_TEXT_BOX_TITLE" />
                </div>
              </ButtonIndicator>
            </div>
          </div>
        </div>

        <div className="SpriteBoxContentRight">
          <div className="SpriteBoxAssetTitle">
            <div className="SpriteBoxAssetTitleCategory">
              {/* {getLocalName(currentCategoryName)} */}
              {currentCategoryName}
            </div>
            <div className="SpriteBoxAssetTitleSubCategory">
              {/* {getLocalName(currentSubCategoryName)} */}
              {currentSubCategoryName}
            </div>
          </div>
          <div className="SpriteBoxAssets">
            {assets
              .filter(c => c.type !== "sound")
              .map((_asset, index) => {
                const assetId = _asset.assetId;
                const asset = AssetLibrary.getAsset(assetId);

                // const isSelected = assetId === selectedAssetId;
                return (
                  <div
                    key={index}
                    className="SpriteBoxAsset"
                    onClick={() => {
                      handleAddAsset(asset);
                    }}
                    // onMouseEnter={e => {
                    //   handleShowAnimation(e, asset);
                    // }}
                    // onMouseLeave={e => {
                    //   handleHideAnimation();
                    // }}
                  >
                    <div className="SpriteBoxAssetImage">
                      <img src={asset.thumb} alt="thumb" />
                    </div>
                    <div className="SpriteBoxAssetName">
                      {asset.defaultName}
                    </div>

                    {/* select */}
                    {/* {!isSelected && (
                      <div
                        className="SpriteBoxAssetSelect"
                        onClick={() => {
                          handleSelectAsset(assetId);
                        }}
                      />
                    )} */}

                    {/* add */}
                    {/* {isSelected && (
                      <div
                        className="SpriteBoxAssetAdd"
                        onClick={() => {
                          handleAddAsset(asset);
                        }}
                      >
                        <div className="SpriteBoxAssetAddIcon">추가</div>
                      </div>
                    )} */}
                  </div>
                );
              })}
            {hoverAsset && AnimationView(hoverAsset, handleAnimationHide)}
          </div>
        </div>
      </div>
    </div>
  );
}

const AnimationView = (hoverAsset, handleAnimationHide) => {
  return (
    <div className="SpriteBox_Animation">
      <div className="AnimationTitleLine handle">
        <div className="AnimationTitle">
          <FormattedMessage id="ID_ANIMATION_TITLE" />
        </div>
        <div className="AnimationClose" onClick={handleAnimationHide}>
          <img src={closeImg} alt="img" />
        </div>
      </div>

      <div className="AnimationContent">
        {
          <div className="AnimationSection">
            <div className="AnimationAnimations">
              {Object.keys(hoverAsset.spriteAnimations).map((id, index) => {
                return (
                  <div className="DrawerAnimationItem__wrapper" key={index}>
                    <DrawerAnimationItem
                      index={index}
                      key={id}
                      sprite={hoverAsset}
                      item={hoverAsset.spriteAnimations[id]}
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
        }
      </div>
    </div>
  );
};
