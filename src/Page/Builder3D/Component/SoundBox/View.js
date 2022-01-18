import React from "react";
import { FormattedMessage } from "react-intl";
import closeImg from "../../../../Image/builder3d/close-popup-icon.svg";
import playImg from "../../../../Image/builder3d/icon-28-sound-box-play.svg";
import pauseImg from "../../../../Image/builder3d/icon-28-sound-box-pause.svg";
import trashImg from "../../../../Image/builder3d/delete-sound.svg";
import addImg from "../../../../Image/builder3d/add-sound-asset.svg";
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
    containerRef,
    assetLibrary,
    currentCategory,
    currentSubCategory,
    setCurrentCategories,
    assets,
    handleSelectAsset,
    handleAddAsset,
    handleRemoveAsset,
    soundIds,
    categories,
    jukebox,
    onClickClose
  } = props;

  return (
    <div className="SoundBoxContainer rndResizeHandler" ref={containerRef}>
      <div className="SoundBoxTitleLine rndDragHandler handle">
        <div className="SoundBoxTitle">
          <FormattedMessage id="ID_SOUNDBOX_TITLE" />
        </div>
        <div className="SoundBoxClose" onClick={onClickClose}>
          <img src={closeImg} alt="close btn" />
        </div>
      </div>
      <div className="SoundBoxContent">
        <div className="SoundBoxContentLeft">
          {categories.map((category, index) => {
            return (
              <div key={index} className="SoundBoxCategoryItem">
                <div className="SoundBoxCategoryItemName">
                  {getLocalName(category)}
                </div>
                <div className="SoundBoxSubCategories">
                  {category.subCategories.map((subCategory, index) => {
                    return (
                      <div
                        key={index}
                        className={`SoundBoxSubCategoryItem ${subCategory.name ===
                          currentSubCategory &&
                          "SoundBoxSubCategoryItemActive"}`}
                        onClick={() => {
                          if (subCategory.name !== "ALL") {
                            setCurrentCategories(
                              category.name,
                              subCategory.name
                            );
                          } else {
                            setCurrentCategories(
                              category.name,
                              currentCategory
                            );
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
          <div className="SoundBoxAssets">
            {assets
              .filter(c => c.type === "sound")
              .map((_asset, index) => {
                const assetId = _asset.assetId;
                const asset = assetLibrary.getSoundAsset(assetId);
                const isExist = soundIds && soundIds.includes(assetId);
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
                        <img src={addImg} alt="add" />
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
