import React from "react";
import { FormattedMessage } from "react-intl";
import AssetLibrary from "../../utils/assetLibrary";
import closeImg from "../../../../Image/builder/x-copy-3.svg";
import closeImg_darkmode from "../../../../Image/builder/x-copy-3_darkmode.svg";
import playImg from "../../../../Image/builder/music-play.svg";
import pauseImg from "../../../../Image/builder/group-4.svg";
import trashImg from "../../../../Image/builder/delete-b.svg";
import addImg from "../../../../Image/builder/group-7-copy-5.svg";
import addImg_darkmode from "../../../../Image/builder/group-7-copy-5_darkmode.svg";
import { getColorTheme } from "../../utils/colorThemeUtil";
import "./index.scss";

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
    handleSelectTab,
    currentCategory,
    currentSubCategory,
    setCurrentCategory,
    assets,
    handleSelectAsset,
    handleAddAsset,
    handleRemoveAsset,
    soundIds,
    categories,
    jukebox,
    handleChangeZIndex
  } = props;
  let currentCategoryName, currentSubCategoryName;
  const colorTheme = getColorTheme();

  return (
    <div
      className="SoundBoxContainer"
      onMouseDown={() => handleChangeZIndex("soundBox")}
    >
      <div className="SoundBoxTitleLine handle">
        <div className="SoundBoxTitle">
          <FormattedMessage id="ID_SOUND_TITLE" />
        </div>
        <div
          className="SoundBoxClose"
          onClick={() => handleSelectTab("soundBox")}
          onTouchEnd={() => handleSelectTab("soundBox")}
        >
          <img
            src={colorTheme === "darkMode" ? closeImg_darkmode : closeImg}
            alt="close btn"
          />
        </div>
      </div>
      <div className="SoundBoxContent">
        <div className="SoundBoxContentLeft">
          {categories.map((category, index) => {
            if (category.name === currentCategory) {
              currentCategoryName = getLocalName(category);
            }
            return (
              <div key={index} className="SoundBoxCategoryItem">
                <div className="SoundBoxCategoryItemName">
                  {getLocalName(category)}
                </div>
                <div className="SoundBoxSubCategories">
                  {category.subCategories.map((subCategory, index) => {
                    if (subCategory.name === currentSubCategory) {
                      currentSubCategoryName = getLocalName(subCategory);
                    }
                    return (
                      <div
                        key={index}
                        className={`SoundBoxSubCategoryItem ${subCategory.name ===
                          currentSubCategory &&
                          "SoundBoxSubCategoryItemActive"}`}
                        onClick={() => {
                          if (subCategory.name !== "ALL") {
                            setCurrentCategory(category.name, subCategory.name);
                          } else {
                            setCurrentCategory(category.name, currentCategory);
                          }
                        }}
                      >
                        <div className="SoundBoxSubCategoryItemName">
                          {getLocalName(subCategory)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="SoundBoxContentRight">
          <div className="SoundBoxAssetTitle">
            <div className="SoundBoxAssetTitleCategory">
              {currentCategoryName}
            </div>
            <div className="SoundBoxAssetTitleSubCategory">
              {currentSubCategoryName}
            </div>
          </div>
          <div className="SoundBoxAssets">
            {assets
              .filter(c => c.type === "sound")
              .map((_asset, index) => {
                const assetId = _asset.assetId;
                const asset = AssetLibrary.getSoundAsset(assetId);
                const isExist = soundIds.includes(assetId);
                return (
                  <div key={index} className="SoundBoxAsset">
                    <div className="SoundBoxAssetImage">
                      {jukebox.id === _asset.assetId ? (
                        <img src={pauseImg} alt="play" />
                      ) : (
                        <img src={playImg} alt="play" />
                      )}
                    </div>
                    <div className="SoundBoxAssetName">{asset.defaultName}</div>

                    {/* select */}
                    <div
                      className="SoundBoxAssetSelect"
                      onClick={() => {
                        handleSelectAsset(assetId);
                      }}
                    />

                    {/* add */}
                    {!isExist && (
                      <div
                        className="SoundBoxAssetAdd"
                        onClick={() => {
                          handleAddAsset(asset);
                        }}
                      >
                        <img
                          src={
                            getColorTheme() === "darkMode"
                              ? addImg_darkmode
                              : addImg
                          }
                          alt="add"
                        />
                      </div>
                    )}

                    {/* remove */}
                    {isExist && (
                      <div
                        className="SoundBoxAssetRemove"
                        onClick={() => {
                          handleRemoveAsset(assetId);
                        }}
                      >
                        <img src={trashImg} alt="remove" />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
