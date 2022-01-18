class BabylonGame {
  constructor(canvas, config) {
    console.log("Babylon Game Init!!");
    this.canvas = canvas;
    this.config = {
      mode: BabylonConstant.GAMEMODE.PLAY,
      ...config
    };

    this.engine = null;
    this.currentScene = null;
    this.listeners = {};
    this.currentGizmoType = BabylonConstant.GIZMO.POSITION;
    this.disposeQueue = [];
  }
  static create(canvas, config) {
    const babylonGame = new BabylonGame(canvas, config);
    const { engineType } = babylonGame.config;
    babylonGame.initEngine(engineType, canvas);
    babylonGame.setLoadingScreen();
    if (babylonGame.isPlayMode()) {
      setGameApiFunctions(babylonGame);
    }
    return babylonGame;
  }
  dispose() {
    if (this.engine) {
      this.engine.dispose();
    }
  }
  getBaseUrl() {
    return this.config.assetBaseURL;
  }

  initEngine(type, canvas) {
    if (this.engine) return;

    let engine;
    switch (type) {
      default:
        engine = this.createDefaultEngine(canvas);
        break;
    }
    this.engine = engine;
    window.addEventListener("resize", engine.resize.bind(engine));
  }
  createDefaultEngine(canvas) {
    return new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true
    });
  }

  getErrorHandler() {
    return function(error, payload) {
      parent.postMessage({
        source: "wizlab",
        type: "error",
        error: error,
        payload: payload
      });
    };
  }

  createScene(sceneId) {
    const sceneData = this.getSceneData(sceneId);
    return BabylonScene.create({ game: this, data: sceneData });
  }
  getSceneData(sceneId) {
    return this.config.scenes[sceneId];
  }
  updateSceneData(sceneId, sceneData) {
    this.config.scenes[sceneId] = sceneData;
  }
  runScene(sceneId) {
    this.runRenderLoopIfNeed();

    const newScene = this.createScene(sceneId);
    if (newScene) {
      this.onSceneLoaded(newScene);
    }
  }
  async onSceneLoaded(scene) {
    const prevScene = this.currentScene;
    if (prevScene === scene) {
      return;
    }
    this.currentScene = scene;

    if (this.isPlayMode()) {
      this.currentScene.runAllUserScript();
    }

    if (prevScene) {
      this.disposeQueue.push(prevScene);
    }

    if (this.disposeQueue.length > 0) {
      if (this.currentScene.scene.isReady()) {
        this.disposeAllQueue();
      } else {
        await this.currentScene.scene.whenReadyAsync();
        this.disposeAllQueue();
      }
    }
  }
  disposeAllQueue() {
    const disposeCount = this.disposeQueue.length;
    if (disposeCount === 0) {
      return;
    }
    for (let i = 0; i < disposeCount; i++) {
      const scene = this.disposeQueue.pop();
      scene.dispose();
    }
  }
  runRenderLoopIfNeed() {
    if (!this.isRenderLoopRunning) {
      this.isRenderLoopRunning = true;
      this.engine.runRenderLoop(() => {
        if (this.currentScene) {
          this.currentScene.render();
        }
      });
    }
  }
  removeCurrentScene() {
    if (this.isRenderLoopRunning) {
      this.engine.stopRenderLoop();
      this.engine.clear();
      this.isRenderLoopRunning = false;
    }
    if (this.currentScene) {
      this.currentScene.dispose();
      this.currentScene = null;
    }
  }
  changeScene(sceneId) {
    this.runScene(sceneId);
  }
  changeSceneWithName(sceneName) {
    for (let sceneId in this.config.scenes) {
      const scene = this.config.scenes[sceneId];
      if (sceneName === scene.name) {
        this.changeScene(sceneId);
        return true;
      }
    }
    return false;
  }

  getSoundAssets() {
    return this.config.assets ? this.config.assets.sounds : null;
  }

  on(eventId, listener) {
    this.listeners[eventId] = listener;
  }
  getListener(eventId) {
    return this.listeners[eventId];
  }
  triggerListener(eventId, payload) {
    const listener = this.getListener(eventId);
    if (listener) listener(payload);
  }

  getCurrentGizmoType() {
    return this.currentGizmoType;
  }
  setCurrentGizmoType(gizmoType) {
    this.currentGizmoType = gizmoType;
    if (this.currentScene) {
      this.currentScene.onChangeCurrentGizmoType(gizmoType);
    }
  }

  isPlayMode() {
    return this.isModeEqualTo(BabylonConstant.GAMEMODE.PLAY);
  }
  isEditMode() {
    return this.isModeEqualTo(BabylonConstant.GAMEMODE.EDIT);
  }
  isPreviewMode() {
    return this.isModeEqualTo(BabylonConstant.GAMEMODE.PREVIEW);
  }
  isModeEqualTo(mode) {
    return this.config.mode === mode;
  }

  setLoadingScreen() {
    BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function() {
      let loadingScreenDiv = document.getElementById("babylonLoadingScreen");

      if (!loadingScreenDiv) {
        this._loadingDiv = document.createElement("div");
        this._loadingDiv.id = "babylonLoadingScreen";
        this._loadingDiv.innerHTML = `
          <div class="babylonLoadingScreen_content_container">
            <div class="babylonLoadingScreen_content_aspect">
              <div class="babylonLoadingScreen_content">
                <div class="babylonLoadingScreen_progress"></div>
                <div class="babylonLoadingScreen_title">
                  에셋 로딩 중...
                </div>
              </div>
            </div>
          </div>
        `;

        const customLoadingScreenCss = document.createElement("style");
        customLoadingScreenCss.innerHTML = `
          #babylonLoadingScreen{
            position: relative;
            display: flex;
            transition: opacity 0.6s;
            pointer-events: none;
          }
          .babylonLoadingScreen_content_container {
            margin: auto;
            width: 120px;
          }
          .babylonLoadingScreen_content_aspect {
            position: relative;
            padding-top: 100%;
          }
          .babylonLoadingScreen_content {
            position: absolute;
            display: flex;
            flex-direction: column;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 12px;
            background-color: #141821ee;
            box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.2);        
          }
          .babylonLoadingScreen_progress {
            margin: auto auto 0 auto;
            width: 36%;
            height: 36%;
            border: 5px solid #393e4f;
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          .babylonLoadingScreen_title {
            margin: 18px auto auto auto;
            color: white;
            font-size: 15px;
            font-weight: bold;
            font-family: Arial;
          }
        `;
        document
          .getElementsByTagName("head")[0]
          .appendChild(customLoadingScreenCss);

        this._resizeLoadingUI();
        window.addEventListener("resize", this._resizeLoadingUI);

        document.body.appendChild(this._loadingDiv);
        loadingScreenDiv = this._loadingDiv;
      }

      loadingScreenDiv.style.display = "flex";
      loadingScreenDiv.style.opacity = 1;
    };
    BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function() {
      const loadingScreenDiv = document.getElementById("babylonLoadingScreen");
      if (loadingScreenDiv) {
        loadingScreenDiv.style.opacity = 0;
        setTimeout(() => {
          loadingScreenDiv.style.display = "none";
        }, 600);
      }
    };
  }
}

window.BabylonGame = BabylonGame;
