var global = {};
var serverData = {};

function Game(param) {
  var screenWidth = param.screenWidth;
  var screenHeight = param.screenHeight;
  var screenMode = param.screenMode;
  var wrapperId = param.wrapperId;
  var scenes = param.scenes;
  var sceneIds = param.sceneIds;
  var soundIds = param.soundIds;
  var errorHandler = param.errorHandler;
  var preloadHandler = param.preloadHandler;
  var assets = param.assets;
  var wideScreen = param.wideScreen;
  var systemVolume = param.systemVolume;
  var isFromWizlab = param.isFromWizlab;
  localStorage.setItem("pId", param.pId);
  // this.pId = param.pId;
  this.errorHandler = errorHandler;
  this.gameScenes = [];
  this.game = new Phaser.Game({
    width: screenWidth,
    height: screenHeight,
    renderer: Phaser.WEBGL,
    parent: wrapperId,
    transparent: true
  });
  this.game.isFromWizlab = isFromWizlab;
  this.game.didStartRender = false;

  // init volumes
  this.game.systemVolume = systemVolume;
  this.game.gameVolume = 1;

  // game event
  this.game.sendGameEvent = function(event) {
    parent.postMessage({ type: "gameEvent", event: event }, "*");
  };
  this.setSocket();
  //create scenes
  var fontFamilies = {};
  var fontText = "";
  for (var i = 0; i < sceneIds.length; i++) {
    var sceneId = sceneIds[i];
    var gameScene = new GameScene({
      game: this.game,
      screenMode: screenMode,
      sceneId: sceneId,
      spriteData: scenes[sceneId],
      soundIds: soundIds,
      errorHandler: errorHandler,
      assets: assets,
      scenes: scenes,
      isFirstScene: i === 0,
      preloadHandler: preloadHandler,
      screenWidth: screenWidth,
      screenHeight: screenHeight,
      wideScreen: wideScreen,
      socketManager: this.socketManager
    });
    this.gameScenes.push(gameScene);
    this.game.state.add(sceneId, gameScene);
    var scene = scenes[sceneId];
    for (var j = 0; j < scene.spriteIds.length; j++) {
      var sprite = scene.sprites[scene.spriteIds[j]];
      if (sprite.type === SpriteType.TEXT) {
        fontFamilies[sprite.preview.fontFamily] = 1;
        fontText += sprite.preview.textValue;
      }
    }
  }

  if (window.WebFont && Object.keys(fontFamilies).length > 0) {
    window.WebFont.load({
      google: {
        families: Object.keys(fontFamilies),
        text: fontText
      },
      active: function() {
        this.game.state.start(sceneIds[0], true, false);
      }.bind(this),
      inactive: function() {
        this.game.state.start(sceneIds[0], true, false);
      }.bind(this)
    });
  } else {
    this.game.state.start(sceneIds[0], true, false);
  }
}

Game.prototype.destroy = function() {
  global = {};
  serverData = {};
  this.game.cache = new Phaser.Cache(this.game);
  this.game.load.reset();
  this.game.load.removeAll();
  this.game.destroy();
};

Game.prototype.onGyroChanged = function(x, y) {
  var currentSceneName = this.game.state.current;
  var currentScene = this.game.state.states[currentSceneName];
  currentScene.onGyroChanged(x, y);
};

Game.prototype.onListeningResult = function(msg) {
  var currentSceneName = this.game.state.current;
  var currentScene = this.game.state.states[currentSceneName];
  currentScene.onListeningResult(msg);
};

Game.prototype.onShaked = function() {
  var currentSceneName = this.game.state.current;
  var currentScene = this.game.state.states[currentSceneName];
  currentScene.onShaked();
};

Game.prototype.onFaceDetect = function(face) {
  var currentSceneName = this.game.state.current;
  var currentScene = this.game.state.states[currentSceneName];
  currentScene.onFaceDetect(face);
};

Game.prototype.onSaveGameData = function() {
  var currentSceneName = this.game.state.current;
  var currentScene = this.game.state.states[currentSceneName];
  currentScene.onSaveGameData();
};

Game.prototype.onResetGameData = function() {
  Object.keys(serverData).forEach(function(key) {
    delete serverData[key];
  });
  var currentSceneName = this.game.state.current;
  var currentScene = this.game.state.states[currentSceneName];
  currentScene.onResetGameData();
};

Game.prototype.onLoadGameData = function(data) {
  Object.keys(serverData).forEach(function(key) {
    delete serverData[key];
  });
  Object.assign(serverData, JSON.parse(data));
  var currentSceneName = this.game.state.current;
  var currentScene = this.game.state.states[currentSceneName];
  currentScene.onLoadGameData();
};

Game.prototype.onUpdateSystemVolume = function(volume) {
  this.game.systemVolume = volume;
  this.game.sound.volume =
    (this.game.gameVolume * this.game.systemVolume) / 100;
};

Game.prototype.onReceiveTFSignal = function(signal) {
  var currentSceneName = this.game.state.current;
  var currentScene = this.game.state.states[currentSceneName];
  currentScene.sendSignal(signal);
};

Game.prototype.setSocket = function() {
  this.socketManager = {
    isConnected: function() {
      if (!this.socket) return false;
      return this.socket.connected;
    },

    connect: function(fn) {
      if (this.socket) return;
      this.socket = io(GAME_SOCKET_SERVER);
      this.socket.roomId = localStorage.getItem("pId");

      this.socket.on(
        "connect",
        function() {
          this.socket.emit("join", {
            roomId: this.socket.roomId
          });
          fn();
        }.bind(this)
      );

      this.socket.on(
        "message",
        function(data) {
          // if (data.socketId !== this.socket.id) {
          if (this.onReceive) {
            this.onReceive(data.data);
          }
          // }
        }.bind(this)
      );
    },

    disconnect: function() {
      if (!this.socket) return;

      this.socket.disconnect();
      this.socket = undefined;
    },

    emit: function(data) {
      if (!this.socket) return;
      if (!this.socket.connected) return;

      this.socket.emit("message", { roomId: this.socket.roomId, data: data });
    },

    getData: function(fn) {
      if (!this.socket) return;
      if (!this.socket.connected) return;

      this.socket.emit("getData", { roomId: this.socket.roomId });
      this.socket.once("getData", function(data) {
        fn(data);
      });
    },

    setData: function(data) {
      if (!this.socket) return;
      if (!this.socket.connected) return;

      this.socket.emit("setData", { roomId: this.socket.roomId, data: data });
    },

    joinRoom: function(roomId) {
      if (!this.socket) return;
      if (!this.socket.connected) return;
      if (!roomId) return;

      this.socket.emit("join", {
        roomId: this.socket.roomId + "_" + roomId
      });
    },

    leaveRoom: function(roomId) {
      if (!this.socket) return;
      if (!this.socket.connected) return;
      if (!roomId) return;

      this.socket.emit("leave", {
        roomId: this.socket.roomId + "_" + roomId
      });
    },

    emitRoom: function(roomId, data) {
      if (!this.socket) return;
      if (!this.socket.connected) return;
      if (!roomId) return;

      this.socket.emit("message", {
        roomId: this.socket.roomId + "_" + roomId,
        data: data
      });
    },

    onReceive: function() {}
  };
};
