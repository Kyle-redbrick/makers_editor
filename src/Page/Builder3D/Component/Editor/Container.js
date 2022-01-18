import React, { Component } from "react";
import { connect } from "react-redux";
import RndWrapper from "../RndProvider/RndWrapper";
import * as builderActions from "../../Store/Reducer/builder";
import View from "./View";

class Container extends Component {
  onClickClose = () => {
    this.props.setIsEditorOn(false);
  };

  openApiList = () => {
    this.props.setIsApiOn(true);
  };

  getRndWrapperConfig() {
    const rndProvider = document.getElementById("rndProvider");
    const providerWidth = rndProvider
      ? rndProvider.offsetWidth
      : window.innerWidth;
    const providerHeight = rndProvider
      ? rndProvider.offsetHeight
      : window.innerHeight;
    const defaultWidth = 720;
    const defaultHeight = 720;
    const defaultX = (providerWidth - defaultWidth) / 2;
    const defaultY = (providerHeight - defaultHeight) / 2;
    const minWidth = 420;
    const minHeight = 420;
    return {
      defaultX,
      defaultY,
      defaultWidth,
      defaultHeight,
      minWidth,
      minHeight
    };
  }

  render() {
    const {
      rndId,
      rndOrder,
      bringRndToTop,
      isEditorOn,
      currentGameObject
    } = this.props;

    return isEditorOn ? (
      <RndWrapper
        rndId={rndId}
        rndOrder={rndOrder}
        bringRndToTop={bringRndToTop}
        {...this.getRndWrapperConfig()}
      >
        <View
          currentGameObject={currentGameObject}
          onClickClose={this.onClickClose}
          onApiClick={this.openApiList}
        />
      </RndWrapper>
    ) : (
      <></>
    );
  }
}

export default connect(
  state => {
    const { isEditorOn } = state.builder;
    const currentSceneId = state.interaction.currentSceneId;
    const currentScene = currentSceneId && state.game.scenes[currentSceneId];
    const currentGameObjectId =
      state.interaction.currentGameObjectIds[currentSceneId];
    const currentGameObject = currentScene
      ? currentScene.gameObjects[currentGameObjectId]
      : null;
    return { isEditorOn, currentGameObject };
  },
  {
    setIsEditorOn: builderActions.setIsEditorOn,
    setIsApiOn: builderActions.setIsApiOn
  }
)(Container);
