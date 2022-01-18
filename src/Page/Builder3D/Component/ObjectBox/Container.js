import React, { Component } from "react";
import { connect } from "react-redux";
import * as gameActions from "../../Store/Reducer/game";
import * as builderActions from "../../Store/Reducer/builder";
import * as interactionActions from "../../Store/Reducer/interaction";
import {
  createDefaultGameObjId,
  createDefaultGameObjName
} from "../../Util/NameApis";
import AssetLibrary from "../../Util/AssetLibrary";
import { ASSET_CATEGORY } from "../../Util/Constant";
import RndWrapper from "../RndProvider/RndWrapper";
import View from "./View";

export class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAssets: [],
      currentCategory: undefined,
      currentSubCategory: undefined
    };
  }
  componentDidMount() {
    this.setCurrentCategory(ASSET_CATEGORY.MESH);
  }

  onClickCategory = category => {
    this.setCurrentCategory(category);
  };
  setCurrentCategory(category, subCategory) {
    AssetLibrary.loadAssetsFor(category, assets => {
      this.setState({
        currentAssets: assets,
        currentCategory: category,
        currentSubCategory: subCategory
      });
    });
  }

  onClickAsset = asset => {
    const { currentSceneId, currentScene, addGameObject } = this.props;
    const newGameObj = this.convertToGameObject(asset);

    if (newGameObj.type === "camera") {
      newGameObj.isActiveCamera = !this.getActiveCameraOfScene(currentScene);
    }

    addGameObject(currentSceneId, newGameObj);
  };
  convertToGameObject(asset) {
    const gameObject = JSON.parse(JSON.stringify(asset));
    // delete gameObject.thumbPath;
    delete gameObject.description;

    const { currentScene } = this.props;
    const gameObjectIds = currentScene.gameObjectIds;
    const gameObjectId = createDefaultGameObjId(gameObjectIds, asset.type);
    gameObject.id = gameObjectId;

    const gameObjectNames = gameObjectIds.map(
      gameObjectId => currentScene.gameObjects[gameObjectId].name
    );
    const gameObjectName = createDefaultGameObjName(
      gameObjectNames,
      asset.subtype
    );
    gameObject.name = gameObjectName;

    return gameObject;
  }
  getActiveCameraOfScene(scene) {
    for (let gameObjId in scene.gameObjects) {
      const gameObj = scene.gameObjects[gameObjId];
      if (gameObj.isActiveCamera) {
        return gameObj;
      }
    }
    return null;
  }

  onClickClose = () => {
    this.props.setIsObjectBoxOn(false);
  };

  getRndWrapperConfig() {
    const objectList = document.getElementById("objectList");
    const defaultWidth = 650;
    const defaultHeight = 450;
    const defaultX = objectList ? objectList.clientWidth + 12 : 36;
    const defaultY = objectList ? objectList.getBoundingClientRect().top : 36;
    const minWidth = 420;
    const minHeight = 420;
    const maxWidth = 600;
    const maxHeight = 600;
    return {
      defaultX,
      defaultY,
      defaultWidth,
      defaultHeight,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    };
  }

  render() {
    const { currentAssets, currentCategory, currentSubCategory } = this.state;
    const { rndId, rndOrder, bringRndToTop, isObjectBoxOn } = this.props;

    return isObjectBoxOn ? (
      <RndWrapper
        rndId={rndId}
        rndOrder={rndOrder}
        bringRndToTop={bringRndToTop}
        {...this.getRndWrapperConfig()}
      >
        <View
          currentAssets={currentAssets}
          currentCategory={currentCategory}
          currentSubCategory={currentSubCategory}
          onClickCategory={this.onClickCategory}
          onClickAsset={this.onClickAsset}
          onClickClose={this.onClickClose}
        />
      </RndWrapper>
    ) : (
      <></>
    );
  }
}

export default connect(
  state => {
    const { isObjectBoxOn } = state.builder;
    const { scenes } = state.game;
    const { currentSceneId } = state.interaction;
    const currentScene = scenes[currentSceneId];
    return { isObjectBoxOn, scenes, currentSceneId, currentScene };
  },
  {
    addGameObject: gameActions.addGameObject,
    setIsObjectBoxOn: builderActions.setIsObjectBoxOn,
    selectGameObject: interactionActions.selectGameObject
  }
)(Container);
