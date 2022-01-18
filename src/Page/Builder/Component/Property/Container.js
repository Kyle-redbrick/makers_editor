import React, { Component } from "react";
import { connect } from "react-redux";
import AssetLibrary from "../../utils/assetLibrary";
import RndWrapper from "../../utils/RndWrapper";
import * as sceneActions from "../../Store/Reducer/scene";
import * as interactionActions from "../../Store/Reducer/interaction";
import { SpriteType } from "../../../../Common/Util/Constant";
import View from "./View";
import * as TrackingUtil from "../../../../Common/Util/TrackingUtil";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";

class Container extends Component {
  handleOnChange = e => {
    const { name, value } = e.target;
    this.exportPreviewData({ [name]: value });
    if (this.eventTimer) {
      clearTimeout(this.eventTimer);
    }
    this.eventTimer = setTimeout(() => {
      TrackingUtil.sendGAEvent({
        category: "Builder",
        action: `PropertyActions`,
        label:
          name === "scale"
            ? "Size"
            : name === "left" || name === "top"
            ? "Position"
            : "Angle"
      });
    }, 1000);
  };

  handleVisibleToggle = e => {
    e.preventDefault();
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `PropertyActions`,
      label: "Visible"
    });
    const {
      sprites,
      selectedSceneId,
      selectedObject,
      setSpritePreview
    } = this.props;
    const name = selectedObject.name;
    const previewData = sprites[name].preview;
    const opacity = previewData.opacity === 0 ? 1 : 0;
    setSpritePreview(selectedSceneId, name, { opacity });
  };

  handleLockToggle = e => {
    e.preventDefault();
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `PropertyActions`,
      label: "Lock"
    });
    const { selectedSceneId, selectedObject } = this.props;
    const name = selectedObject.name;
    this.props.lockSprite(selectedSceneId, name);
  };

  handleRemoveSprite = e => {
    e.preventDefault();
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `DeleteSprite`,
      label: "Property"
    });
    const {selectedObject } = this.props;
    const name = selectedObject.name;

    showPopUp(
      <PopUp.TwoButton
        confirmAction={() => {
          const { selectedSceneId, sprites, spriteIds } = this.props;
          let index = spriteIds.findIndex(key => key === name);
          index = index > 0 ? index - 1 : 1;
          const nextSelectedName = spriteIds[index];
          const nextSprite = sprites[nextSelectedName];

          this.props.removeSprite(selectedSceneId, name);
          this.handleSelectSprite(nextSelectedName, nextSprite.type);
        }}
        intl={this.props.intl}
        titleId={"ID_BUILDER_ALERT_MSG_REMOVE_QUESTION"}
        titleValue={{ spriteName: selectedObject.name }}
        subtitleId="ID_BUILDER_ALERT_MSG_REMOVE_QUESTION_SUBTITLE"
        confirmButtonNameId="ID_BUILDER_ALERT_MSG_REMOVE_SPRITE_CONFIRM"
        cancelButtonNameId="ID_BUILDER_ALERT_MSG_REMOVE_SCENE_CANCEL"
      />
    );
  };

  handleSelectSprite = (name, type) => {
    const { selectedSceneId, selectedObject } = this.props;
    if (selectedObject.name !== name) {
      this.props.selectSprite(selectedSceneId, name, type);
    }
  };

  handleCopySprite = e => {
    e.preventDefault();
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `PropertyActions`,
      label: "Copy"
    });
    if (this.copyTimer) {
      clearTimeout(this.copyTimer);
    }
    this.copyTimer = setTimeout(() => {
      const { sprites, selectedObject, selectedSceneId } = this.props;
      const sprite = sprites[selectedObject.name];
      if (!sprite) return;

      const assetId = sprite.assetId;
      const type = sprite.type;
      const code = sprite.code;

      let preview = { ...sprite.preview };
      preview.left += 12;
      preview.top += 12;

      let name;
      if (type === SpriteType.TEXT) {
        name = "textbox";
      } else if (type === SpriteType.CUSTOM) {
        name = "custom";
      } else {
        name = AssetLibrary.getAsset(assetId).defaultName;
      }
      name = this.countUpSameName(name, this.props.spriteIds);

      const copyData = [{ assetId, name, type, preview, code }];
      this.props.addSprites(selectedSceneId, copyData);

      // const { formatMessage } = this.props.intl;
      // const title = formatMessage({ id: "ID_PROPERTY_COPIED" });
      // toast.info(title, {
      //   position: toast.POSITION.BOTTOM_RIGHT
      // });
    }, 100);
  };

  countUpSameName = (defaultName, nameArray) => {
    let max = nameArray.reduce((max, id) => {
      let name = id.replace(/\(\d+\)$/, "");
      let num;
      if (defaultName === name) {
        num = id.replace(defaultName, "").replace(/\(|\)/g, "");
        num = !!num ? Number(num) : 1;
        return Math.max(max, num);
      } else {
        return max;
      }
    }, 0);
    if (max > 0) {
      return `${defaultName}(${max + 1})`;
    } else {
      return defaultName;
    }
  };

  exportPreviewData = propertyData => {
    const { selectedSceneId, selectedObject, setSpritePreview } = this.props;
    const name = selectedObject.name;

    if (propertyData.scale !== undefined) {
      if (isNaN(propertyData.scale)) {
        propertyData.scale = 0;
      }
      propertyData.scaleX = Number(propertyData.scale) * 0.01;
      propertyData.scaleY = Number(propertyData.scale) * 0.01;
    } else {
      let propertyDataList = Object.entries(propertyData);
      propertyDataList.forEach(([key, value]) => {
        propertyData[key] = Number(value);
      });
    }
    setSpritePreview(selectedSceneId, name, propertyData);
  };

  render() {
    const {
      isOn,
      sprites,
      selectedObject,
      handleSelectTab,
      handleChangeZIndex,
      zIndex
    } = this.props;
    const {
      handleOnChange,
      handleVisibleToggle,
      handleLockToggle,
      handleCopySprite,
      handleRemoveSprite
    } = this;
    let type, sprite, spriteName;
    let asset = {};
    if (selectedObject.name) {
      type = selectedObject.type;
      sprite = sprites[selectedObject.name];
      if (!sprite) {
        return <div />;
      }
      spriteName = selectedObject.name;
      if (type === SpriteType.TEXT) {
        asset.thumb = AssetLibrary.textboxThumb;
      } else {
        asset = AssetLibrary.getAsset(sprite.assetId);
      }
    }

    if (!isOn) {
      return <div />;
    }
    return (
      <RndWrapper
        id="property"
        style={{ zIndex }}
        defaultX={500} //temp
        // defaultX={document.body.clientWidth - 365}
        defaultY={16}
        enableResizing={false}
      >
        <View
          type={type}
          asset={asset}
          sprite={sprite}
          spriteName={spriteName}
          handleSelectTab={handleSelectTab}
          handleChangeZIndex={handleChangeZIndex}
          handleOnChange={handleOnChange}
          handleVisibleToggle={handleVisibleToggle}
          handleLockToggle={handleLockToggle}
          handleCopySprite={handleCopySprite}
          handleRemoveSprite={handleRemoveSprite}
          zIndex={zIndex}
        />
      </RndWrapper>
    );
  }
}

export default connect(
  state => ({
    sprites: state.scene.scenes[state.interaction.selected.scene].sprites,
    spriteIds: state.scene.scenes[state.interaction.selected.scene].spriteIds,
    selectedObject:
      state.interaction.selected.objects[state.interaction.selected.scene],
    selectedSceneId: state.interaction.selected.scene
  }),
  {
    setSpritePreview: sceneActions.setSpritePreview,
    lockSprite: sceneActions.lockSprite,
    addSprites: sceneActions.addSprites,
    removeSprite: sceneActions.removeSprite,
    selectSprite: interactionActions.selectSprite
  }
)(Container);
