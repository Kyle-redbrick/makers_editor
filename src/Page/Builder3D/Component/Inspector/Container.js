import React, { Component } from "react";
import { connect } from "react-redux";
import * as gameActions from "../../Store/Reducer/game";
import * as builderActions from "../../Store/Reducer/builder";
import * as interactionActions from "../../Store/Reducer/interaction";
import { createDefaultGameObjId } from "../../Util/NameApis";
import View from "./View";

const { GAMEOBJECT, PROPERTY_ID } = window.BabylonConstant;

class Container extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.currentSceneId !== this.props.currentSceneId) {
      this.onChangeCurrentScene();
    }
    if (prevProps.currentGameObjectId !== this.props.currentGameObjectId) {
      this.onChangeCurrentGameObject();
    }
  }
  onChangeCurrentScene() {
    this.updateNameInputManually();
  }
  onChangeCurrentGameObject() {
    this.updateNameInputManually();
  }
  updateNameInputManually() {
    const nameInput = document.getElementById("inspector_info_nameInput");
    if (nameInput) {
      nameInput.value = this.props.currentGameObject.name;
    }
  }

  onChangeProperty = (id, value) => {
    switch (id) {
      case "positionX":
        this.onChangePropertyWithAxis(PROPERTY_ID.POSITION, "x", value);
        break;
      case "positionY":
        this.onChangePropertyWithAxis(PROPERTY_ID.POSITION, "y", value);
        break;
      case "positionZ":
        this.onChangePropertyWithAxis(PROPERTY_ID.POSITION, "z", value);
        break;
      case "rotationX":
        this.onChangePropertyWithAxis(PROPERTY_ID.ROTATION, "x", value);
        break;
      case "rotationY":
        this.onChangePropertyWithAxis(PROPERTY_ID.ROTATION, "y", value);
        break;
      case "rotationZ":
        this.onChangePropertyWithAxis(PROPERTY_ID.ROTATION, "z", value);
        break;
      case "scaleX":
        this.onChangePropertyWithAxis(PROPERTY_ID.SCALE, "x", value);
        break;
      case "scaleY":
        this.onChangePropertyWithAxis(PROPERTY_ID.SCALE, "y", value);
        break;
      case "scaleZ":
        this.onChangePropertyWithAxis(PROPERTY_ID.SCALE, "z", value);
        break;
      case "directionX":
        this.onChangePropertyWithAxis(PROPERTY_ID.DIRECTION, "x", value);
        break;
      case "directionY":
        this.onChangePropertyWithAxis(PROPERTY_ID.DIRECTION, "y", value);
        break;
      case "directionZ":
        this.onChangePropertyWithAxis(PROPERTY_ID.DIRECTION, "z", value);
        break;
      case "isActiveCamera":
        this.onChangeIsActiveCamera(value);
        break;
      default:
        this.onChangePlainProperty(id, value);
        break;
    }
  };
  onBlurProperty = (id, value) => {
    let parsedValue = value;
    switch (id) {
      case "text":
        break;
      case "size":
      case "width":
      case "height":
        parsedValue = parseFloat(parseFloat(value).toFixed(0)) || 0;
        break;
      default:
        parsedValue = parseFloat(parseFloat(value).toFixed(5)) || 0;
        break;
    }
    this.onChangeProperty(id, parsedValue);
  };
  onChangePlainProperty(propertyId, value) {
    const {
      currentSceneId,
      currentGameObject,
      updateGameObjectProperty
    } = this.props;
    updateGameObjectProperty(
      currentSceneId,
      currentGameObject.id,
      propertyId,
      value
    );
  }
  onChangePropertyWithAxis(propertyId, axis, value) {
    const {
      currentSceneId,
      currentGameObject,
      updateGameObjectProperty
    } = this.props;
    const propertyValue = { ...currentGameObject[propertyId] };
    propertyValue[axis] = value;
    updateGameObjectProperty(
      currentSceneId,
      currentGameObject.id,
      propertyId,
      propertyValue
    );
  }
  onChangeIsActiveCamera(isActiveCamera) {
    const {
      currentSceneId,
      currentGameObjectId,
      currentGameObjects,
      updateGameObjectProperty
    } = this.props;

    if (isActiveCamera) {
      Object.keys(currentGameObjects)
        .filter(gameObjId => gameObjId !== currentGameObjectId)
        .filter(
          gameObjId => currentGameObjects[gameObjId].type === GAMEOBJECT.CAMERA
        )
        .forEach(gameObjId => {
          updateGameObjectProperty(
            currentSceneId,
            gameObjId,
            PROPERTY_ID.IS_ACTIVE_CAMERA,
            false
          );
        });
    }

    updateGameObjectProperty(
      currentSceneId,
      currentGameObjectId,
      PROPERTY_ID.IS_ACTIVE_CAMERA,
      isActiveCamera
    );
  }

  onClickCode = object => {
    const {
      currentSceneId,
      currentObjectId,
      selectGameObject,
      setIsEditorOn
    } = this.props;
    const gameObjId = object.id;
    if (gameObjId !== currentObjectId) {
      selectGameObject(currentSceneId, gameObjId);
    }
    setIsEditorOn(true);
  };

  onClickCopy = () => {
    const {
      currentSceneId,
      currentGameObjects,
      currentGameObject,
      addGameObject
    } = this.props;

    const copiedGameObjAndChildren = this.getCopiedGameObjectAndChildren(
      currentGameObject,
      currentGameObjects
    );

    const copiedGameObj = copiedGameObjAndChildren[0];
    this.transformGameObjectLittle(copiedGameObj);

    copiedGameObjAndChildren.forEach(gameObj => {
      addGameObject(currentSceneId, gameObj);
    });
  };
  getCopiedGameObjectAndChildren(gameObj, gameObjs) {
    const copiedGameObjAndChildren = [];

    const gameObjIds = Object.keys(gameObjs).map(
      gameObjId => gameObjs[gameObjId].id
    );

    const traverse = (gameObj, parentGameObj, gameObjs) => {
      const copiedGameObj = JSON.parse(JSON.stringify(gameObj));
      const copiedGameObjId = createDefaultGameObjId(
        gameObjIds,
        copiedGameObj.type
      );
      copiedGameObj.id = copiedGameObjId;
      copiedGameObjAndChildren.push(copiedGameObj);

      gameObjIds.push(copiedGameObjId);

      if (parentGameObj) {
        copiedGameObj.parentId = parentGameObj.id;
      }

      for (let i in gameObjs) {
        if (gameObjs[i].parentId === gameObj.id) {
          traverse(gameObjs[i], copiedGameObj, gameObjs);
        }
      }
    };

    traverse(gameObj, null, gameObjs);
    return copiedGameObjAndChildren;
  }
  transformGameObjectLittle(gameObject) {
    if (gameObject.position) {
      if (!isNaN(gameObject.position.x)) {
        gameObject.position.x += 0.1;
      }
      if (!isNaN(gameObject.position.y)) {
        gameObject.position.y += 0.1;
      }
      if (!isNaN(gameObject.position.z)) {
        gameObject.position.z += 0.1;
      }
    }
  }

  onClickRemove = object => {
    const gameObjIdsToRemove = [];
    this.traverse(object, node => {
      gameObjIdsToRemove.push(node.id);
    });

    const { currentSceneId, removeGameObjects, selectGameObject } = this.props;
    selectGameObject(currentSceneId, null);
    removeGameObjects(currentSceneId, gameObjIdsToRemove);
  };

  traverse = (node, func) => {
    if (!node) {
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(_node => {
        this.traverse(_node, func);
      });
    } else {
      if (func) {
        func(node);
      }
      this.traverse(node.children, func);
    }
  };

  onClickLock = () => {
    const { currentGameObject } = this.props;
    const isLocked = !currentGameObject.isLocked;
    this.onChangePlainProperty(PROPERTY_ID.LOCK, isLocked);
  };

  onBlurNameInput = (gameObj, input) => {
    const gameObjName = input.value.trim();
    if (this.checkGameObjectNameValid(gameObjName)) {
      this.onChangePlainProperty(PROPERTY_ID.NAME, gameObjName);
      input.value = gameObjName;
    } else {
      input.value = gameObj.name;
    }
  };
  checkGameObjectNameValid(name) {
    if (!name || name === "") {
      return false;
    }
    return true;
  }

  render() {
    const {
      currentGameObjectIds,
      currentGameObjects,
      currentGameObjectId,
      currentGameObject
    } = this.props;
    return (
      <View
        gameObjectIds={currentGameObjectIds}
        gameObjects={currentGameObjects}
        gameObjectId={currentGameObjectId}
        gameObject={currentGameObject}
        onChangeProperty={this.onChangeProperty}
        onBlurProperty={this.onBlurProperty}
        onClickCode={this.onClickCode}
        onClickCopy={this.onClickCopy}
        onClickRemove={this.onClickRemove}
        onClickLock={this.onClickLock}
        onBlurNameInput={this.onBlurNameInput}
      />
    );
  }
}

export default connect(
  state => {
    const { scenes } = state.game;
    const { currentSceneId } = state.interaction;
    const currentScene = currentSceneId && scenes[currentSceneId];
    const currentGameObjectIds = currentScene ? currentScene.gameObjectIds : [];
    const currentGameObjects = currentScene ? currentScene.gameObjects : {};
    const currentGameObjectId =
      state.interaction.currentGameObjectIds[currentSceneId];
    const currentGameObject =
      currentScene && currentScene.gameObjects[currentGameObjectId];
    return {
      scenes,
      currentSceneId,
      currentGameObjectIds,
      currentGameObjects,
      currentGameObjectId,
      currentGameObject
    };
  },
  {
    addGameObject: gameActions.addGameObject,
    updateGameObjectProperty: gameActions.updateGameObjectProperty,
    removeGameObjects: gameActions.removeGameObjects,
    selectGameObject: interactionActions.selectGameObject,
    setIsEditorOn: builderActions.setIsEditorOn
  }
)(Container);
