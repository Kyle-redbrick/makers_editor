import React from "react";
import { ASSET_CATEGORY as CATEGORY } from "../../Util/Constant";
import "./index.scss";
import closeIcon from "../../../../Image/builder3d/close-popup-icon.svg";
import meshIcon from "../../../../Image/builder3d/icon-32-mesh-white.svg";
import meshOffIcon from "../../../../Image/builder3d/icon-32-mesh-off-white.svg";
import skyboxIcon from "../../../../Image/builder3d/icon-32-skybox-white.svg";
import skyboxOffIcon from "../../../../Image/builder3d/icon-32-skybox-off-white.svg";
import lightIcon from "../../../../Image/builder3d/icon-32-light-white.svg";
import lightOffIcon from "../../../../Image/builder3d/icon-32-light-off-white.svg";
import cameraIcon from "../../../../Image/builder3d/icon-32-camera-white.svg";
import cameraOffIcon from "../../../../Image/builder3d/icon-32-camera-off-white.svg";
import guiIcon from "../../../../Image/builder3d/icon-32-gui-white.svg";
import guiOffIcon from "../../../../Image/builder3d/icon-32-gui-off-white.svg";
import textGuiIcon from "../../../../Image/builder3d/icon-32-texture-gui-white.svg";
import textGuiOffIcon from "../../../../Image/builder3d/icon-32-texture-gui-off-white.svg";

function View(props) {
  const { onClickClose } = props;
  return (
    <div className="objectBox rndResizeHandler">
      <div className="objectBox_header rndDragHandler">
        <div className="objectBox_title">Object Box</div>
        <div className="objectBox_closeBtn" onClick={onClickClose}>
          <img src={closeIcon} alt="" />
        </div>
      </div>
      <div className="objectBox_content">
        <div className="objectBox_content_left">
          <Categories {...props} />
        </div>
        <div className="objectBox_content_right">
          <Assets {...props} />
        </div>
      </div>
    </div>
  );
}

function Categories(props) {
  const { currentCategory, onClickCategory } = props;
  const imageSrc = (category, isCurrent) => {
    switch (category) {
      case "Mesh":
        return isCurrent ? meshIcon : meshOffIcon;
      case "Skybox":
        return isCurrent ? skyboxIcon : skyboxOffIcon;
      case "Light":
        return isCurrent ? lightIcon : lightOffIcon;
      case "Camera":
        return isCurrent ? cameraIcon : cameraOffIcon;
      case "GUI":
        return isCurrent ? guiIcon : guiOffIcon;
      case "Texture GUI":
        return isCurrent ? textGuiIcon : textGuiOffIcon;
      default:
        break;
    }
  };
  return (
    <div className="objectBox_categories">
      {/* <div className="objectBox_categories_title">CATEGORY</div> */}
      {Object.keys(CATEGORY).map(key => {
        const category = CATEGORY[key];
        const isCurrent = category === currentCategory;
        return (
          <div
            key={category}
            className={`objectBox_category${
              isCurrent ? " objectBox_category-current" : ""
            }`}
            onClick={() => {
              onClickCategory(category);
            }}
          >
            <div className="objectBox_category_title">
              <img src={imageSrc(category, isCurrent)} alt="" />
              <span>{category}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Assets(props) {
  const { currentAssets, currentCategory, onClickAsset } = props;
  // const title = currentCategory.toUpperCase();
  return (
    <div className="objectBox_assets">
      {/* <div className="objectBox_assets_title">{title}</div> */}
      {[CATEGORY.LIGHT, CATEGORY.CAMERA].includes(currentCategory) ? (
        <AssetsWithDescription
          assets={currentAssets}
          onClickAsset={onClickAsset}
        />
      ) : (
        <AssetsWithThumbnail
          assets={currentAssets}
          onClickAsset={onClickAsset}
        />
      )}
    </div>
  );
}
function AssetsWithThumbnail(props) {
  const { assets, onClickAsset } = props;
  return assets.map((asset, index) => {
    return (
      <div
        key={index}
        className="objectBox_asset"
        onClick={() => {
          onClickAsset(asset);
        }}
      >
        <div className="objectBox_asset_thumbnail">
          <img src={asset.thumbPath} alt="assetThumbnail" />
        </div>
        <div className="objectBox_asset_name">
          {asset.name ? asset.name : asset.subtype}
        </div>
      </div>
    );
  });
}
function AssetsWithDescription(props) {
  const { assets, onClickAsset } = props;
  return assets.map((asset, index) => {
    const { title, description } = asset.description || {
      title: asset.name,
      description: asset.name
    };
    return (
      <div
        key={index}
        className="objectBox_asset objectBox_asset-decription"
        onClick={() => {
          onClickAsset(asset);
        }}
      >
        {asset.thumbPath && (
          <div className="objectBox_asset_thumbnail">
            <img src={asset.thumbPath} alt="assetThumbnail" />
          </div>
        )}
        <div className="objectBox_asset_decription">
          <div className="objectBox_asset_decription_title">{title}</div>
          <div className="objectBox_asset_decription_decription">
            {description}
          </div>
        </div>
        <div className="objectBox_asset_plusBtn">+</div>
      </div>
    );
  });
}

export default View;
