import React, { Component } from "react";
import { connect } from "react-redux";
import * as request from "../../../../Common/Util/HTTPRequest";
import * as gameActions from "../../Store/Reducer/game";
import * as builderActions from "../../Store/Reducer/builder";
import * as interactionActions from "../../Store/Reducer/interaction";
import View from "./View";

import * as BABYLON from "babylonjs"; // eslint-disable-line no-unused-vars
import * as BABYLONGUI from "babylonjs-gui"; // eslint-disable-line no-unused-vars
import "babylonjs-loaders"; // eslint-disable-line no-unused-vars
const BabylonGame = window.BabylonGame; // eslint-disable-line no-unused-vars
const BabylonScene = window.BabylonScene; // eslint-disable-line no-unused-vars
const BabylonGameObject = window.BabylonGameObject; // eslint-disable-line no-unused-vars
const { GAMEMODE, GAMEOBJECT, PROPERTY_ID } = window.BabylonConstant; // eslint-disable-line no-unused-vars

class Preview extends Component {
  constructor(props) {
    super(props);
    const { canvasId, mode } = props;
    this.canvasId = canvasId || "previewCanvas";
    this.mode = mode || GAMEMODE.EDIT;
    this.preview = null;
  }
  componentDidMount() {
    const { currentScene } = this.props;
    this.initPreview(currentScene);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentSceneId !== this.props.currentSceneId) {
      this.onChangeCurrentScene(prevProps.currentScene);
    } else {
      if (prevProps.currentGameObjectId !== this.props.currentGameObjectId) {
        this.onChangeCurrentGameObject();
        if (this.mode === GAMEMODE.PREVIEW) {
          this.onChangeCurrentCamera();
        }
      }
      this.checkGameObjectChanges(prevProps);
    }
    if (prevProps.currentGizmoType !== this.props.currentGizmoType) {
      this.onChangeCurrentGizmoType();
    }
  }
  onChangeCurrentScene() {
    const { currentScene } = this.props;
    if (this.preview) {
      if (currentScene) {
        this.preview.updateSceneData(currentScene.id, currentScene);
        this.preview.changeScene(currentScene.id);
      } else {
        this.clearPreviewScene();
      }
    } else {
      this.initPreview(currentScene);
    }
  }
  onChangeCurrentGameObject() {
    if (!this.preview) {
      return;
    }

    const { currentGameObject } = this.props;
    const currentBabylonScene = this.preview.currentScene;
    if (currentGameObject) {
      currentBabylonScene.selectGameObjectWithId(currentGameObject.id);
    } else {
      currentBabylonScene.selectGameObject(null);
    }
    this.updateProjectThumbnail();
  }
  checkGameObjectChanges(prevProps) {
    const prevGameObjectIds = prevProps.currentGameObjectIds;
    const { currentGameObjectIds } = this.props;
    if (prevGameObjectIds.length > currentGameObjectIds.length) {
      const removedIds = prevGameObjectIds.filter(
        id => !currentGameObjectIds.includes(id)
      );
      this.onRemoveGameObjects(removedIds);
    }
    const added = [];
    for (let i in currentGameObjectIds) {
      const currentGameObjectId = currentGameObjectIds[i];
      if (prevGameObjectIds.includes(currentGameObjectId)) {
        const prevGameObject =
          prevProps.currentGameObjects[currentGameObjectId];
        const currentGameObject = this.props.currentGameObjects[
          currentGameObjectId
        ];
        this.checkGameObjectPropertyChanges(prevGameObject, currentGameObject);
      } else {
        added.push(currentGameObjectId);
      }
    }
    if (added.length > 0) {
      this.onAddGameObjects(added);
    }
  }
  checkGameObjectPropertyChanges(prevGameObject, currentGameObject) {
    const propertyIds = Object.values(PROPERTY_ID);
    propertyIds.forEach(propertyId => {
      if (
        JSON.stringify(prevGameObject[propertyId]) !==
        JSON.stringify(currentGameObject[propertyId])
      ) {
        this.onChangeGameObjectProperty(currentGameObject, propertyId);
      }
    });
  }
  onChangeGameObjectProperty(gameObj, propertyId) {
    const currentBabylonScene = this.preview.currentScene;
    const babylonGameObj = currentBabylonScene.getGameObject(gameObj.id);
    const property = gameObj[propertyId];
    babylonGameObj.setProperty(propertyId, property);
  }
  onAddGameObjects(gameObjIds) {
    if (gameObjIds.length === 0) return;
    if (!this.preview || !this.preview.currentScene) return;

    const { currentGameObjects, selectGameObject } = this.props;
    const added = [];
    gameObjIds.forEach(gameObjId => {
      const gameObjectData = currentGameObjects[gameObjId];
      const babylonGameObj = BabylonGameObject.create({
        scene: this.preview.currentScene,
        data: gameObjectData,
        oncreate: babylonGameObj => {
          this.preview.currentScene.addGameObject(babylonGameObj);
          added.push(babylonGameObj);

          if (added.length === gameObjIds.length) {
            added.forEach(gameObj => {
              gameObj.onAllGameObjectsAdded();
            });
            selectGameObject(this.preview.currentScene.id, gameObjIds[0]);
          }
        }
      });
      if (!babylonGameObj) {
        this.preview.currentScene.loadAssetsManager();
      }
    });
    this.updateProjectThumbnail();
  }
  onRemoveGameObjects(gameObjIds) {
    if (!this.preview || !gameObjIds) return;
    gameObjIds.forEach(gameObjId => {
      this.preview.currentScene.removeGameObject(gameObjId);
    });
    this.updateProjectThumbnail();
  }
  onChangeCurrentGizmoType() {
    const { currentGizmoType } = this.props;
    if (this.preview) {
      this.preview.setCurrentGizmoType(currentGizmoType);
    }
  }
  onChangeCurrentCamera() {
    if (!this.preview) {
      return;
    }

    const { currentGameObject } = this.props;
    if (currentGameObject && currentGameObject.type === GAMEOBJECT.CAMERA) {
      const currentBabylonScene = this.preview.currentScene;
      const currentBabylonCamera = currentBabylonScene.getGameObject(
        currentGameObject.id
      );
      currentBabylonScene.scene.activeCamera = currentBabylonCamera.gameObject;
    }
  }

  initPreview(scene) {
    if (!scene) return;

    const previewCanvas = document.getElementById(this.canvasId);
    const previewConfig = {
      scenes: { [scene.id]: scene },
      mode: this.mode
    };
    const preview = BabylonGame.create(previewCanvas, previewConfig);
    this.preview = preview;

    if (this.mode === GAMEMODE.EDIT) {
      this.props.setBabylonPreview(preview);
    }

    preview.on(
      "gameObjectPropertyChange",
      this.onPreviewChangeGameObjectProperty
    );
    preview.on("gameObjectSelect", this.onPreviewSelectGameObject);
    preview.on(
      "editorCameraTransformChange",
      this.onEditorCameraTransformChange
    );

    this.preview.updateSceneData(scene.id, scene);
    this.preview.runScene(scene.id);
  }
  clearPreviewScene() {
    this.preview.removeCurrentScene();
  }

  onPreviewChangeGameObjectProperty = payload => {
    this.props.updateGameObjectProperty(
      payload.sceneId,
      payload.id,
      payload.propertyId,
      payload.value
    );
    this.updateProjectThumbnail();
  };
  onPreviewSelectGameObject = payload => {
    const { sceneId, gameObjectId } = payload;
    this.props.selectGameObject(sceneId, gameObjectId);
  };
  onEditorCameraTransformChange = payload => {
    const { sceneId, position, target } = payload;
    this.props.setEditorCameraTransform(sceneId, position, target);
    this.updateProjectThumbnail();
  };

  updateProjectThumbnail() {
    if (this.mode !== GAMEMODE.EDIT) {
      return;
    }

    this.setProjectThumbnailUpdateTimer(() => {
      this.createProjectThumnailFor(
        this.props.currentSceneId,
        (sceneId, thumbnail) => {
          if (this.props.email) {
            this.updateDevelopingProjectIcon(thumbnail);
          }
          this.props.setGameThumbnail(thumbnail);
          this.props.setSceneThumbnail(sceneId, thumbnail);
        }
      );
    });
  }
  setProjectThumbnailUpdateTimer(ontimeout) {
    this.clearProjectThumbnailUpdateTimer();
    this.projectThumbnailUpdateTimer = setTimeout(ontimeout, 1000);
  }
  clearProjectThumbnailUpdateTimer() {
    if (this.projectThumbnailUpdateTimer) {
      clearTimeout(this.projectThumbnailUpdateTimer);
      this.projectThumbnailUpdateTimer = undefined;
    }
  }
  createProjectThumnailFor(sceneId, oncreate) {
    const previewCanvas = document.getElementById(this.canvasId);
    if (!previewCanvas) {
      return;
    }

    previewCanvas.toBlob(blob => {
      const data = new FormData();
      data.append("file", blob);
      request
        .upload(data)
        .then(res => res.json())
        .then(json => json.url)
        .then(thumbnail => {
          if (oncreate) {
            oncreate(sceneId, thumbnail);
          }
        })
        .catch(err => {
          console.error(err);
        });
    });
  }
  updateDevelopingProjectIcon(icon) {
    const { project } = this.props;
    const { pId, useCustomIcon } = project;
    if (!useCustomIcon) {
      const params = { pId, icon };
      request.postDevelopingProject(params);
    }
  }

  render() {
    const { currentScene } = this.props;
    return (
      <View
        canvasId={this.canvasId}
        isPlaceholderHidden={!!currentScene || this.mode !== GAMEMODE.EDIT}
        isPreviewHidden={!currentScene}
      />
    );
  }
}

export default connect(
  state => {
    const { project, game, interaction, userinfo } = state;
    const { scenes } = game;
    const { currentSceneId, currentGizmoType } = interaction;
    const email = userinfo ? userinfo.email : null;
    const currentScene = currentSceneId && scenes[currentSceneId];
    const currentGameObjectIds = currentScene ? currentScene.gameObjectIds : [];
    const currentGameObjects = currentScene ? currentScene.gameObjects : {};
    const currentGameObjectId =
      interaction.currentGameObjectIds[currentSceneId];
    const currentGameObject = currentGameObjects[currentGameObjectId];
    return {
      project,
      email,
      currentScene,
      currentSceneId,
      currentGizmoType,
      currentGameObjectIds,
      currentGameObjects,
      currentGameObjectId,
      currentGameObject
    };
  },
  {
    updateGameObjectProperty: gameActions.updateGameObjectProperty,
    setEditorCameraTransform: gameActions.setEditorCameraTransform,
    setGameThumbnail: gameActions.setGameThumbnail,
    setSceneThumbnail: gameActions.setSceneThumbnail,
    setBabylonPreview: builderActions.setBabylonPreview,
    selectGameObject: interactionActions.selectGameObject
  }
)(Preview);
