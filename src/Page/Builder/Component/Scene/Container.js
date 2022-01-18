import React, { Component } from "react";
import { connect } from "react-redux";
import * as interactionActions from "../../Store/Reducer/interaction";
import * as sceneActions from "../../Store/Reducer/scene";
import { injectIntl } from "react-intl";
import { toast } from "react-toastify";
import RndWrapper from "../../utils/RndWrapper";
import View from "./View";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: true
    };
  }

  handleAddScene = () => {
    let num = this.props.sceneIds.reduce((acc, cur) => {
      return Math.max(acc, cur.replace(/scene/g, ""));
    }, 0);
    num += 1;
    const sceneId = "scene" + num;
    const sceneName = sceneId;
    this.props.addScene(sceneId, sceneName);
    this.props.selectScene(sceneId, sceneName);
  };

  handleCopyScene = () => {
    const { selectedSceneId } = this.props;

    let num = this.props.sceneIds.reduce((acc, cur) => {
      return Math.max(acc, cur.replace(/scene/g, ""));
    }, 0);
    num += 1;
    const sceneId = "scene" + num;
    const sceneName = sceneId;

    this.props.copyScene(sceneId, sceneName, selectedSceneId);
    this.props.selectScene(sceneId, sceneName);
  };

  handleRemoveScene = id => {
    const { scenes, sceneIds, selectedSceneId } = this.props;
    showPopUp(
      <PopUp.TwoButton
        confirmAction={() => {
          if (sceneIds.length === 1) {
            const toastText = this.props.intl.formatMessage({
              id: "ID_PROPERTY_SCENE_AT_LEAST"
            });
            toast.info(toastText, {
              position: toast.POSITION.BOTTOM_LEFT
            });
            return;
          }

          if (selectedSceneId === id) {
            let index = sceneIds.findIndex(key => key === id);
            index = index > 0 ? index - 1 : 1;
            const nextSceneId = sceneIds[index];
            const nextScene = scenes[nextSceneId];
            this.props.selectScene(nextSceneId, nextScene.sceneName);
          }
          this.props.removeScene(id);
        }}
        intl={this.props.intl}
        titleId="ID_BUILDER_ALERT_MSG_REMOVE_SCENE_QUESTION"
        confirmButtonNameId="ID_BUILDER_ALERT_MSG_REMOVE_SCENE_CONFIRM"
        cancelButtonNameId="ID_BUILDER_ALERT_MSG_REMOVE_SCENE_CANCEL"
      />
    );
  };

  handleSelectScene = id => {
    this.setState({ selectedSceneId: id });

    if (id === this.props.selectedSceneId) {
      this.setState({ isOpened: !this.state.isOpened });
    } else {
      this.props.selectScene(id);
    }
  };

  moveDndScene = (dragIndex, hoverIndex) => {
    const { reorderScene } = this.props;
    reorderScene(dragIndex, hoverIndex);
  };

  onDragStart = () => {};

  render() {
    const {
      handleAddScene,
      handleCopyScene,
      handleRemoveScene,
      handleSelectScene,
      moveDndScene,
      onDragStart
    } = this;
    const {
      scenes,
      sceneIds,
      selectedSceneId,
      screenMode,
      handleSelectTab,
      intl,
      isOn,
      zIndex,
      handleChangeZIndex
    } = this.props;
    const { isOpened } = this.state;
    const selectedScene = scenes[selectedSceneId];

    if (!isOn) {
      return <div />;
    }

    return (
      <RndWrapper
        id="scene"
        style={{ zIndex }}
        defaultWidth={264}
        defaultHeight={420}
        defaultX={200}
        defaultY={50}
        minWidth={264}
        minHeight={420}
      >
        <View
          handleAddScene={handleAddScene}
          handleCopyScene={handleCopyScene}
          handleRemoveScene={handleRemoveScene}
          handleSelectScene={handleSelectScene}
          isOpened={isOpened}
          handleSelectTab={handleSelectTab}
          handleChangeZIndex={handleChangeZIndex}
          moveDndScene={moveDndScene}
          scenes={scenes}
          sceneIds={sceneIds}
          selectedSceneId={selectedSceneId}
          screenMode={screenMode}
          selectedScene={selectedScene}
          onDragStart={onDragStart}
          intl={intl}
        />
      </RndWrapper>
    );
  }
}

export default connect(
  state => ({
    scenes: state.scene.scenes,
    sceneIds: state.scene.sceneIds,
    selectedSceneId: state.interaction.selected.scene,
    screenMode: state.preview.screenMode
  }),
  {
    addScene: sceneActions.addScene,
    copyScene: sceneActions.copyScene,
    removeScene: sceneActions.removeScene,
    selectScene: interactionActions.selectScene,
    reorderScene: sceneActions.reorderScene
  }
)(injectIntl(Container));
