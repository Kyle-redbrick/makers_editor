import React, { Component } from "react";
import { connect } from "react-redux";
import * as sceneActions from "../../Store/Reducer/scene";
import * as interactionActions from "../../Store/Reducer/interaction";
import { injectIntl } from "react-intl";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";
import View from "./View";
import * as TrackingUtil from "../../../../Common/Util/TrackingUtil";

class Container extends Component {
  handleSelectSprite = (name, type) => {
    const { selectedSceneId } = this.props;
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `ClickSprite`,
      label: "SpriteView"
    });
    this.props.selectSprite(selectedSceneId, name, type, "SpriteView");
  };

  handleRemoveSprite = name => {
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `DeleteSprite`,
      label: "SpriteView"
    });
    const { spriteIds, selectedObject } = this.props;
    let index = spriteIds.findIndex(key => key === name);
    index = index > 0 ? index - 1 : 1;
    const nextSelectedName = spriteIds[index];

    showPopUp(
      <PopUp.TwoButton
        confirmAction={() => {
          const { selectedSceneId } = this.props;
          this.props.removeSprite(selectedSceneId, name);
          this.handleSelectSprite(nextSelectedName);
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

  moveDndSprite = (dragIndex, hoverIndex) => {
    const { selectedSceneId, reorderSprite } = this.props;
    reorderSprite(selectedSceneId, dragIndex, hoverIndex);
  };

  handleRemoveAll = () => {
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `SceneActions`,
      label: "DeleteAllSprite"
    });
    showPopUp(
      <PopUp.TwoButton
        confirmAction={() => {
          const { selectedSceneId } = this.props;
          this.props.removeAllSprite(selectedSceneId);
        }}
        intl={this.props.intl}
        titleId="ID_BUILDER_ALERT_MSG_REMOVEALL_QUESTION"
        confirmButtonNameId="ID_BUILDER_ALERT_MSG_REMOVE_SCENE_CONFIRM"
        cancelButtonNameId="ID_BUILDER_ALERT_MSG_REMOVE_SCENE_CANCEL"
      />
    );
  };

  handleHideLocks = () => {
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `SceneActions`,
      label: "LockHide"
    });
    const { selectedSceneId, selectedScene } = this.props;
    this.props.hideLockSprite(
      selectedSceneId,
      !selectedScene.isHiddenLockSprites
    );
  };

  render() {
    const {
      sprites,
      spriteIds,
      selectedObject,
      selectedScene,
      handleSelectTab,
      isSceneToolHidden
    } = this.props;
    const {
      handleSelectSprite,
      handleRemoveSprite,
      moveDndSprite,
      handleRemoveAll,
      handleHideLocks
    } = this;
    return (
      <View
        sprites={sprites}
        spriteIds={spriteIds}
        selectedObject={selectedObject}
        handleSelectSprite={handleSelectSprite}
        handleRemoveSprite={handleRemoveSprite}
        handleSelectTab={handleSelectTab}
        moveDndSprite={moveDndSprite}
        selectedScene={selectedScene}
        handleRemoveAll={handleRemoveAll}
        handleHideLocks={handleHideLocks}
        isSceneToolHidden={isSceneToolHidden}
      />
    );
  }
}

export default connect(
  state => ({
    selectedScene: state.scene.scenes[state.interaction.selected.scene],
    sprites: state.scene.scenes[state.interaction.selected.scene].sprites,
    spriteIds: state.scene.scenes[state.interaction.selected.scene].spriteIds,
    selectedSceneId: state.interaction.selected.scene,
    selectedObject:
      state.interaction.selected.objects[state.interaction.selected.scene]
  }),
  {
    selectSprite: interactionActions.selectSprite,
    removeSprite: sceneActions.removeSprite,
    reorderSprite: sceneActions.reorderSprite,
    removeAllSprite: sceneActions.removeAllSprite,
    hideLockSprite: sceneActions.hideLockSprite
  }
)(injectIntl(Container));
