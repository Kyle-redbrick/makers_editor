import React, { Component } from "react";
import { connect } from "react-redux";
import RndWrapper from "../RndProvider/RndWrapper";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { currentCamera: null };
  }
  componentDidMount() {
    this.onChangeCurrentGameObject();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentGameObject !== this.props.currentGameObject) {
      this.onChangeCurrentGameObject();
    }
  }
  onChangeCurrentGameObject() {
    const { currentGameObject } = this.props;
    const { GAMEOBJECT } = window.BabylonConstant;
    if (currentGameObject && currentGameObject.type === GAMEOBJECT.CAMERA) {
      this.setState({ currentCamera: currentGameObject });
    } else {
      this.setState({ currentCamera: null });
    }
  }

  getRndWrapperConfig() {
    const rndProvider = document.getElementById("rndProvider");
    const providerWidth = rndProvider
      ? rndProvider.offsetWidth
      : window.innerWidth;
    const providerHeight = rndProvider
      ? rndProvider.offsetHeight
      : window.innerHeight;
    const lockAspectRatio = 16 / 9;
    const lockAspectRatioExtraHeight = 36;
    const defaultWidth = 300;
    const defaultHeight =
      defaultWidth / lockAspectRatio + lockAspectRatioExtraHeight;
    const defaultX = (providerWidth - defaultWidth) / 2;
    const defaultY = (providerHeight - defaultHeight) / 2;
    const minWidth = 240;
    const maxWidth = 420;
    return {
      defaultX,
      defaultY,
      defaultWidth,
      defaultHeight,
      minWidth,
      maxWidth,
      lockAspectRatio,
      lockAspectRatioExtraHeight
    };
  }

  render() {
    const { rndId, rndOrder, bringRndToTop, isCameraViewOn } = this.props;
    const { currentCamera } = this.state;
    const cameraName = currentCamera ? currentCamera.name : "";
    return isCameraViewOn ? (
      <RndWrapper
        rndId={rndId}
        rndOrder={rndOrder}
        bringRndToTop={bringRndToTop}
        {...this.getRndWrapperConfig()}
      >
        <View cameraName={cameraName} />
      </RndWrapper>
    ) : (
      <></>
    );
  }
}

export default connect(state => {
  const { scenes } = state.game;
  const { isCameraViewOn } = state.builder;
  const { currentSceneId, currentGameObjectIds } = state.interaction;
  const currentScene = currentSceneId && scenes[currentSceneId];
  const currentGameObjectId = currentGameObjectIds[currentSceneId];
  const currentGameObject =
    currentScene && currentScene.gameObjects[currentGameObjectId];
  return { isCameraViewOn, currentGameObject };
})(Container);
