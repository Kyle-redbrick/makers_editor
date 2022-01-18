class BabylonScene {
  constructor(config) {
    const { id, name, game } = config;
    this.id = id;
    this.name = name;
    this.game = game;
    this.scene = new BABYLON.Scene(game.engine);
    this.keyInputMap = {};
    this.keyCodeInputMap = {};
    this.sounds = {};
    this.gameObjects = {};
    this.selectedGameObject = null;
    this.assetsManager = null;
    if (this.game.isPlayMode()) {
      this.timer = {
        startedTime: 0,
        duration: 0,
        pausedTime: 0,
        isRunning: false
      };
      setSceneApiFunctions(this);
    }
  }

  render() {
    if (this.scene && this.scene.activeCamera) {
      this.scene.render();
    }
  }
  dispose() {
    this.scene.dispose();
  }
  static create(config) {
    const { game, data } = config;
    const { id, name, soundIds, gameObjectIds, gameObjects } = data;
    const scene = new BabylonScene({ id, name, game });
    const isPlayMode = scene.game.isPlayMode();

    if (scene.game.isEditMode()) {
      scene.setEditorCamera(data.editorCamera);
      scene.setGizmoLayers();
      scene.setPointerPicker();
    }

    if (isPlayMode) {
      scene.setPhysicsEngine();
      scene.setActionManager();
    }

    scene.setGUI();
    scene.addFirstRenderObserver();

    const assetsManager = new BABYLON.AssetsManager(scene.scene);
    if (scene.game.isPreviewMode()) {
      assetsManager.useDefaultLoadingScreen = false;
    }
    scene.assetsManager = assetsManager;

    if (isPlayMode && soundIds && soundIds.length > 0) {
      const soundDatas = scene.game.getSoundAssets();
      soundIds.forEach(soundId => {
        BabylonSound.create({
          scene: scene,
          data: soundDatas[soundId]
        });
      });
    } else {
      scene.allSoundsAdded = true;
    }

    if (gameObjectIds && gameObjectIds.length > 0) {
      gameObjectIds.forEach(gameObjectId => {
        const gameObjectData = gameObjects[gameObjectId];
        BabylonGameObject.create({
          scene: scene,
          data: gameObjectData,
          oncreate: babylonGameObj => {
            scene.addGameObject(babylonGameObj);
            scene.checkAllGameObjectAdded();
          }
        });
      });
    } else {
      scene.allGameObjectsAdded = true;
    }

    if (scene.assetsManager._tasks.length > 0) {
      scene.loadAssetsManager();
    } else {
      scene.checkAllAssetsAdded();
    }

    return null;
  }

  addMeshTask(taskName, meshesName, rootUrl, sceneFilename) {
    const task = this.assetsManager.addMeshTask(
      taskName,
      meshesName,
      rootUrl,
      sceneFilename
    );
    return task;
  }
  addBinaryFileTask(taskName, url) {
    const task = this.assetsManager.addBinaryFileTask(taskName, url);
    return task;
  }
  loadAssetsManager(onLoadFinish) {
    if (this.assetsManager._tasks.length === 0) {
      return;
    }
    this.assetsManager.onFinish = () => {
      this.assetsManager.reset();
      if (onLoadFinish) {
        onLoadFinish();
      }
    };
    this.assetsManager.load();
  }

  runAllUserScript() {
    if (this.getGameObjectCount() === 0) {
      return;
    }
    for (const objectId in this.gameObjects) {
      this.gameObjects[objectId].runUserScript();
    }
  }

  addFirstRenderObserver() {
    this.onAfterRenderObserver = this.scene.onAfterRenderObservable.add(
      this.onAfterFirstRender.bind(this)
    );
  }
  onAfterFirstRender() {
    this.updateAllGUITransforms();
    this.scene.onAfterRenderObservable.remove(this.onAfterRenderObserver);
  }
  addBeforeRenderObservable(func) {
    return this.scene.onBeforeRenderObservable.add(func);
  }
  removeBeforeRenderObservable(observer) {
    return this.scene.onBeforeRenderObservable.remove(observer);
  }
  updateAllGUITransforms() {
    for (let gameObjectId in this.gameObjects) {
      const gameObject = this.gameObjects[gameObjectId];
      if (gameObject instanceof BabylonGui) {
        gameObject.updateGUIProperties();
      }
    }
  }

  addSound(sound) {
    if (!this.checkSoundValid(sound)) {
      sound.dispose();
    }
    this.sounds[sound.name] = sound;
    if (
      this.getSoundCount() === this.game.getSceneData(this.id).soundIds.length
    ) {
      this.onAllSoundsAdded();
    }
  }
  addGameObject(gameObj) {
    if (this.checkGameObjectValid(gameObj)) {
      this.gameObjects[gameObj.id] = gameObj;
      if (gameObj instanceof BabylonGui) {
        this.addGUI(gameObj);
      }
    } else {
      gameObj.dispose();
    }
  }
  removeGameObject(gameObjId) {
    if (gameObjId in this.gameObjects) {
      this.getGameObject(gameObjId).dispose();
      delete this.gameObjects[gameObjId];
    }
  }
  getSound(name) {
    return name in this.sounds ? this.sounds[name] : null;
  }
  getGameObject(id) {
    return id in this.gameObjects ? this.gameObjects[id] : null;
  }
  getFirstGameObjectWithName(name) {
    if (this.getGameObjectCount() === 0) {
      return null;
    }
    for (const objectId in this.gameObjects) {
      if (this.gameObjects[objectId].name === name) {
        return this.gameObjects[objectId];
      }
    }
    return null;
  }
  getGameObjectsWithName(names) {
    if (this.getGameObjectCount() === 0) {
      return null;
    }

    let _names;
    if (!Array.isArray(names)) {
      _names = [names];
    } else {
      _names = names;
    }

    const objects = [];
    for (const objectId in this.gameObjects) {
      if (_names.includes(this.gameObjects[objectId].name)) {
        objects.push(this.gameObjects[objectId]);
      }
    }
    return objects;
  }
  getSoundCount() {
    return Object.keys(this.sounds).length;
  }
  getGameObjectCount() {
    return Object.keys(this.gameObjects).length;
  }
  checkSoundValid(sound) {
    if (!sound.id || sound.id === "") {
      return false;
    }
    if (this.getSound(sound.name)) {
      return false;
    }
    return true;
  }
  checkGameObjectValid(gameObj) {
    if (!gameObj.id || gameObj.id === "") {
      return false;
    }
    if (this.getGameObject(gameObj.id)) {
      return false;
    }
    return true;
  }

  setSoundVolume(value) {
    let volume = value;
    if (volume < 0) {
      volume = 0;
    } else if (volume > 1) {
      volume = 1;
    }
    BABYLON.Engine.audioEngine.setGlobalVolume(volume);
  }
  getSoundVolume() {
    return BABYLON.Engine.audioEngine.getGlobalVolume();
  }

  setEditorCamera(data) {
    const {
      target = { x: 0, y: 0, z: 0 },
      position = { x: 10, y: 5, z: -10 }
    } = data || {};
    const editorCamera = new BABYLON.UniversalCamera(
      "EditorCamera",
      new BABYLON.Vector3(position.x, position.y, position.z),
      this.scene
    );
    editorCamera.speed = 0.6;
    editorCamera.setTarget(new BABYLON.Vector3(target.x, target.y, target.z));
    editorCamera.attachControl(this.game.canvas, true);
    this.scene.activeCamera = editorCamera;
    this.editorCamera = editorCamera;

    this.scene.onAfterRenderObservable.add(
      this.watchEditorCameraTransformChange.bind(this)
    );
  }
  setEditorCameraFocus(focusObjectId) {
    if (!this.editorCamera) {
      this.editorCameraFocus = focusObjectId;
      return;
    }
    const focusObj = this.getGameObject(focusObjectId);
    if (focusObj) {
      const target = focusObj.gameObject.position;
      if (!target) {
        return;
      }

      const distance = BABYLON.Vector3.Distance(
        target,
        this.editorCamera.position
      );
      if (BabylonConstant.EDITOR_CAMERA_FOCUS_DISTANCE !== distance) {
        const targetDistRatio =
          BabylonConstant.EDITOR_CAMERA_FOCUS_DISTANCE / distance;
        const closerPosition = BABYLON.Vector3.Lerp(
          target,
          this.editorCamera.position,
          targetDistRatio
        );
        this.editorCamera.position = closerPosition;
      }

      this.editorCamera.setTarget(target);
    }
  }
  watchEditorCameraTransformChange() {
    if (!this.editorCamera) {
      return;
    }

    if (this.checkEditorCameraTransformChanged()) {
      if (this.onChangeEditorCameraTransfomTimeout) {
        clearTimeout(this.onChangeEditorCameraTransfomTimeout);
        this.onChangeEditorCameraTransfomTimeout = undefined;
      }
      this.onChangeEditorCameraTransfomTimeout = setTimeout(
        this.onChangeEditorCameraTransform.bind(this),
        500
      );
    }
    this.prevEditorCameraPosition = this.editorCamera.position.clone();
    this.prevEditorCameraTarget = this.editorCamera.target.clone();
  }
  checkEditorCameraTransformChanged() {
    return !(
      this.editorCamera.position.equals(this.prevEditorCameraPosition) &&
      this.editorCamera.target.equals(this.prevEditorCameraTarget)
    );
  }
  onChangeEditorCameraTransform() {
    const sceneId = this.id;
    const position = {
      x: this.trimFloat(this.editorCamera.position.x),
      y: this.trimFloat(this.editorCamera.position.y),
      z: this.trimFloat(this.editorCamera.position.z)
    };
    const target = {
      x: this.trimFloat(this.editorCamera.target.x),
      y: this.trimFloat(this.editorCamera.target.y),
      z: this.trimFloat(this.editorCamera.target.z)
    };
    const payload = { sceneId, position, target };
    this.game.triggerListener("editorCameraTransformChange", payload);
  }
  trimFloat(value) {
    return parseFloat(parseFloat(value).toFixed(5));
  }

  setGizmoLayers() {
    this.gizmoLayer = new BABYLON.UtilityLayerRenderer(this.scene);
  }

  setPointerPicker() {
    this.scene.onPointerDown = function() {
      this.pointerPickedObject = this.getPointerPickedGameObject();
    }.bind(this);

    this.scene.onPointerUp = function() {
      const gameObj = this.getPointerPickedGameObject();
      if (gameObj === this.pointerPickedObject) {
        this.onPointerPickGameObject(gameObj);
      }
    }.bind(this);
  }
  getPointerPickedGameObject() {
    const ray = this.createPickingRay();
    const hit = this.scene.pickWithRay(ray);
    const gameObj = hit.pickedMesh
      ? this.getGameObject(hit.pickedMesh.id)
      : null;
    return gameObj;
  }
  createPickingRay() {
    return this.scene.createPickingRay(
      this.scene.pointerX,
      this.scene.pointerY,
      BABYLON.Matrix.Identity(),
      this.scene.activeCamera
    );
  }
  onPointerPickGameObject(gameObj) {
    this.game.triggerListener("gameObjectSelect", {
      sceneId: this.id,
      gameObjectId: gameObj ? gameObj.id : null
    });
  }
  selectGameObjectWithId(gameObjId) {
    const gameObj = this.getGameObject(gameObjId);
    if (gameObj) {
      this.selectGameObject(gameObj);
    }
  }
  selectGameObject(gameObj) {
    if (this.selectedGameObject === gameObj) {
      return;
    }
    if (this.selectedGameObject) {
      this.deselectGameObject(this.selectedGameObject);
      this.selectedGameObject = null;
    }
    if (gameObj) {
      this.selectedGameObject = gameObj;
      gameObj.onSelected();
      if (gameObj instanceof BabylonGui) {
        this.showGUIEditor();
      } else {
        this.hideGUIEditor();
      }
    }
  }
  deselectGameObject(gameObj) {
    gameObj.onDeselected();
  }

  setPhysicsEngine() {
    const physicsPlugin = new BABYLON.CannonJSPlugin();
    const gravityVector = new BABYLON.Vector3(0, -10, 0);
    this.scene.enablePhysics(gravityVector, physicsPlugin);
  }
  getPhysicsEngine() {
    return this.scene.getPhysicsEngine();
  }
  isPhysicsEnabled() {
    return !!this.getPhysicsEngine();
  }

  setActionManager() {
    const actionManager = new BABYLON.ActionManager(this.scene);
    actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyDownTrigger,
        evt => {
          this.keyInputMap[evt.sourceEvent.key] =
            evt.sourceEvent.type == "keydown";
          this.keyCodeInputMap[evt.sourceEvent.keyCode] =
            evt.sourceEvent.type == "keydown";
        }
      )
    );
    actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyUpTrigger,
        evt => {
          this.keyInputMap[evt.sourceEvent.key] =
            evt.sourceEvent.type == "keydown";
          this.keyCodeInputMap[evt.sourceEvent.keyCode] =
            evt.sourceEvent.type == "keydown";
        }
      )
    );
    this.scene.actionManager = actionManager;
  }
  getActionManager() {
    return this.scene.actionManager;
  }

  setGUI() {
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      "FullscreenUI",
      true
    );
    this.scene.advancedTexture = advancedTexture;

    if (this.game.isEditMode()) {
      this.setGUIEditor();
    }
  }
  addGUI(babylonGui) {
    if (this.game.isEditMode()) {
      this.guiContainer.addControl(babylonGui.gameObject);
    } else {
      this.scene.advancedTexture.addControl(babylonGui.gameObject);
    }
  }
  removeGUI(babylonGui) {
    if (this.game.isEditMode()) {
      this.guiContainer.removeControl(babylonGui.gameObject);
    } else {
      this.scene.advancedTexture.removeControl(babylonGui.gameObject);
    }
  }
  setGUIEditor() {
    const guiEditorContainer = new BABYLON.GUI.Container("guiEditorContainer");
    guiEditorContainer.width = 1;
    guiEditorContainer.height = 1;
    this.scene.advancedTexture.addControl(guiEditorContainer);
    this.guiEditorContainer = guiEditorContainer;

    const guiContainerVisibleRect = new BABYLON.GUI.Rectangle(
      "guiContainerVisibleRect"
    );
    guiContainerVisibleRect.width = 0.6;
    guiContainerVisibleRect.fixedRatio = 9 / 16;
    guiContainerVisibleRect.color = "white";
    guiContainerVisibleRect.thickness = 3;
    guiContainerVisibleRect.cornerRadius = 12;
    guiContainerVisibleRect.clipContent = false;
    guiContainerVisibleRect.shadowColor = "black";
    guiEditorContainer.addControl(guiContainerVisibleRect);
    this.guiContainerVisibleRect = guiContainerVisibleRect;

    const guiContainerVisibleTitle = new BABYLON.GUI.TextBlock(
      "guiContainerVisibleTitle"
    );
    guiContainerVisibleTitle.top = "12px";
    guiContainerVisibleTitle.left = "12px";
    guiContainerVisibleTitle.textHorizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    guiContainerVisibleTitle.textVerticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    guiContainerVisibleTitle.text = "GUI";
    guiContainerVisibleTitle.fontSize = 18;
    guiContainerVisibleTitle.color = "white";
    guiContainerVisibleRect.addControl(guiContainerVisibleTitle);
    this.guiContainerVisibleTitle = guiContainerVisibleTitle;

    const guiContainer = new BABYLON.GUI.Container("guiContainer");
    guiContainer.width = 0.6;
    guiContainer.fixedRatio = 9 / 16;
    guiContainer.clipContent = true;
    guiEditorContainer.addControl(guiContainer);
    this.guiContainer = guiContainer;

    this.hideGUIEditor();
  }
  getGUISizeInPixels() {
    const width = this.game.isEditMode()
      ? this.guiContainer.widthInPixels
      : this.game.engine.getRenderWidth();
    const height = this.game.isEditMode()
      ? (this.guiContainer.widthInPixels * 9) / 16
      : this.game.engine.getRenderHeight();
    return { width, height };
  }
  showGUIEditor() {
    if (this.game.isEditMode()) {
      this.guiContainerVisibleRect.isVisible = true;
      this.guiContainerVisibleTitle.isVisible = true;
    }
  }
  hideGUIEditor() {
    if (this.game.isEditMode()) {
      this.guiContainerVisibleRect.isVisible = false;
      this.guiContainerVisibleTitle.isVisible = false;
    }
  }

  onChangeCurrentGizmoType(gizmoType) {
    if (this.selectedGameObject) {
      this.selectedGameObject.onChangeCurrentGizmoType(gizmoType);
    }
  }

  onAllSoundsAdded() {
    this.allSoundsAdded = true;
    this.checkAllAssetsAdded();
  }

  checkAllGameObjectAdded() {
    if (
      this.getGameObjectCount() ===
      this.game.getSceneData(this.id).gameObjectIds.length
    ) {
      this.onAllGameObjectsAdded();
    }
  }
  onAllGameObjectsAdded() {
    for (let gameObjId in this.gameObjects) {
      const gameObj = this.gameObjects[gameObjId];
      gameObj.onAllGameObjectsAdded();
    }
    if (this.editorCameraFocus) {
      this.editorCameraFocus = null;
      this.setEditorCameraFocus(this.editorCameraFocus);
    }

    this.allGameObjectsAdded = true;
    this.checkAllAssetsAdded();
  }

  checkAllAssetsAdded() {
    if (this.allSoundsAdded && this.allGameObjectsAdded) {
      if (this.assetsManager._tasks.length > 0) {
        this.assetsManager.onFinish();
        this.assetsManager.onFinish = null;
      }
      this.game.onSceneLoaded(this);
      this.allSoundsAdded = undefined;
      this.allGameObjectsAdded = undefined;
    }
  }

  getLightObject() {
    for (let gameObjId in this.gameObjects) {
      const gameObj = this.gameObjects[gameObjId];
      if (gameObj instanceof BabylonLight) {
        return gameObj;
      }
    }
  }

  startTimer() {
    this.timer.isRunning = true;
    this.timer.startedTime = new Date().getTime();
  }

  pauseTimer() {
    this.timer.pausedTime = new Date().getTime();
    this.timer.isRunning = false;
  }

  resumeTimer() {
    if (this.timer.isRunning) return;
    this.timer.startedTime += new Date().getTime() - this.timer.pausedTime;
    this.timer.isRunning = true;
  }

  resetTimer() {
    this.timer.isRunning = false;
    this.timer.duration = 0;
  }

  getTimer() {
    if (this.timer.isRunning) {
      this.timer.duration = new Date().getTime() - this.timer.startedTime;
      this.timer.duration /= 1000;
      this.timer.duration = this.timer.duration.toFixed(1);
    }
    return parseFloat(this.timer.duration);
  }
}

window.BabylonScene = BabylonScene;
