import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as builderReducer from "../../Store/Reducer/builder";
import * as interactionReducer from "../../Store/Reducer/interaction";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { availableGizmoTypes: [] };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentGameObjectId !== this.props.currentGameObjectId) {
      this.onChangeCurrentGameObject();
    }
  }
  onChangeCurrentGameObject() {
    const { currentGameObject, babylonPreview } = this.props;
    if (currentGameObject) {
      try {
        const currentBabylonScene = babylonPreview.currentScene;
        const currentBabylongGameObject = currentBabylonScene.getGameObject(
          currentGameObject.id
        );
        const availableGizmoTypes = currentBabylongGameObject.constructor.getAvailableGizmoTypes();
        this.setState({ availableGizmoTypes });
      } catch {
        this.setState({ availableGizmoTypes: [] });
      }
    } else {
      this.setState({ availableGizmoTypes: [] });
    }
  }

  // onClickMenu = () => {};
  onClickPlay = () => {
    this.props.setIsPlaying(true);
  };
  onClickGizmoType = gizmoType => {
    const { currentGizmoType } = this.props;
    this.props.selectGizmoType(
      gizmoType === currentGizmoType ? null : gizmoType
    );
  };
  onClickCameraView = () => {
    this.props.setIsCameraViewOn(!this.props.isCameraViewOn);
  };

  render() {
    const { currentGizmoType } = this.props;
    const { availableGizmoTypes } = this.state;
    return (
      <View
        currentGizmoType={currentGizmoType}
        availableGizmoTypes={availableGizmoTypes}
        // onClickMenu={this.onClickMenu}
        onClickPlay={this.onClickPlay}
        onClickCameraView={this.onClickCameraView}
        onClickGizmoType={this.onClickGizmoType}
      />
    );
  }
}

export default connect(
  state => {
    const { game, interaction, builder } = state;
    const { scenes } = game;
    const { currentSceneId, currentGizmoType } = interaction;
    const { babylonPreview, isCameraViewOn } = builder;

    const currentScene = currentSceneId && scenes[currentSceneId];
    const currentGameObjects = currentScene ? currentScene.gameObjects : {};
    const currentGameObjectId = currentSceneId
      ? state.interaction.currentGameObjectIds[currentSceneId]
      : null;
    const currentGameObject = currentGameObjects[currentGameObjectId];

    return {
      babylonPreview,
      isCameraViewOn,
      currentGizmoType,
      currentGameObjectId,
      currentGameObject
    };
  },
  {
    setIsPlaying: builderReducer.setIsPlaying,
    setIsMenuOn: builderReducer.setIsMenuOn,
    setIsCameraViewOn: builderReducer.setIsCameraViewOn,
    selectGizmoType: interactionReducer.selectGizmoType
  }
)(withRouter(Container));
