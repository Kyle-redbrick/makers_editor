var SpriteType = {
    SPRITE: "sprite",
    PLAIN: "plain",
    BACKGROUND: "background",
    TEXT: "text",
    CUSTOM: "custom",
    COMPONENT: "component"
  },
  ErrorType = {
    PARAMETER_INVALID_TYPE: "PARAMETER_INVALID_TYPE",
    PARAMETER_UNDEFINED: "PARAMETER_UNDEFINED",
    PARAMETER_NOT_FOUND: "PARAMETER_NOT_FOUND"
  },
  TRANSLATE_URL = "https://dreamapidev.wizlab.net",
  GAME_SOCKET_SERVER = "https://dev.wizschool.io:3003/",
  HTML_Colors = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    goldenrod: "#daa520",
    gold: "#ffd700",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavenderblush: "#fff0f5",
    lavender: "#e6e6fa",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  };
var global = {},
  serverData = {};
function Game(e) {
  var t = e.screenWidth,
    s = e.screenHeight,
    o = e.screenMode,
    a = e.wrapperId,
    n = e.scenes,
    i = e.sceneIds,
    c = e.soundIds,
    r = e.errorHandler,
    m = e.preloadHandler,
    h = e.assets,
    d = e.wideScreen,
    g = e.systemVolume,
    u = e.isFromWizlab;
  (this.errorHandler = r),
    (this.gameScenes = []),
    (this.game = new Phaser.Game({
      width: t,
      height: s,
      renderer: Phaser.WEBGL,
      parent: a,
      transparent: !0
    })),
    (this.game.isFromWizlab = u),
    (this.game.systemVolume = g),
    (this.game.gameVolume = 1),
    (this.game.sendGameEvent = function(e) {
      parent.postMessage({ type: "gameEvent", event: e }, "*");
    }),
    this.setSocket();
  for (var k = {}, l = "", p = 0; p < i.length; p++) {
    var v = i[p],
      f = new GameScene({
        game: this.game,
        screenMode: o,
        sceneId: v,
        spriteData: n[v],
        soundIds: c,
        errorHandler: r,
        assets: h,
        scenes: n,
        isFirstScene: 0 === p,
        preloadHandler: m,
        screenWidth: t,
        screenHeight: s,
        wideScreen: d,
        socketManager: this.socketManager
      });
    this.gameScenes.push(f), this.game.state.add(v, f);
    for (var y = n[v], G = 0; G < y.spriteIds.length; G++) {
      var I = y.sprites[y.spriteIds[G]];
      I.type === SpriteType.TEXT &&
        ((k[I.preview.fontFamily] = 1), (l += I.preview.textValue));
    }
  }
  window.WebFont && Object.keys(k).length > 0
    ? window.WebFont.load({
        google: { families: Object.keys(k), text: l },
        active: function() {
          this.game.state.start(i[0], !0, !1);
        }.bind(this),
        inactive: function() {
          this.game.state.start(i[0], !0, !1);
        }.bind(this)
      })
    : this.game.state.start(i[0], !0, !1);
}
(Game.prototype.destroy = function() {
  (global = {}),
    (serverData = {}),
    (this.game.cache = new Phaser.Cache(this.game)),
    this.game.load.reset(),
    this.game.load.removeAll(),
    this.game.destroy();
}),
  (Game.prototype.onGyroChanged = function(e, t) {
    var s = this.game.state.current;
    this.game.state.states[s].onGyroChanged(e, t);
  }),
  (Game.prototype.onListeningResult = function(e) {
    var t = this.game.state.current;
    this.game.state.states[t].onListeningResult(e);
  }),
  (Game.prototype.onShaked = function() {
    var e = this.game.state.current;
    this.game.state.states[e].onShaked();
  }),
  (Game.prototype.onFaceDetect = function(e) {
    var t = this.game.state.current;
    this.game.state.states[t].onFaceDetect(e);
  }),
  (Game.prototype.onSaveGameData = function() {
    var e = this.game.state.current;
    this.game.state.states[e].onSaveGameData();
  }),
  (Game.prototype.onResetGameData = function() {
    Object.keys(serverData).forEach(function(e) {
      delete serverData[e];
    });
    var e = this.game.state.current;
    this.game.state.states[e].onResetGameData();
  }),
  (Game.prototype.onLoadGameData = function(e) {
    Object.keys(serverData).forEach(function(e) {
      delete serverData[e];
    }),
      Object.assign(serverData, JSON.parse(e));
    var t = this.game.state.current;
    this.game.state.states[t].onLoadGameData();
  }),
  (Game.prototype.onUpdateSystemVolume = function(e) {
    (this.game.systemVolume = e),
      (this.game.sound.volume =
        (this.game.gameVolume * this.game.systemVolume) / 100);
  }),
  (Game.prototype.onReceiveTFSignal = function(e) {
    var t = this.game.state.current;
    this.game.state.states[t].sendSignal(e);
  }),
  (Game.prototype.setSocket = function() {
    this.socketManager = {
      isConnected: function() {
        return !!this.socket && this.socket.connected;
      },
      connect: function(e) {
        if (this.socket) return;
        (this.socket = io(GAME_SOCKET_SERVER)),
          (this.socket.roomId = "christest"),
          this.socket.on(
            "connect",
            function() {
              this.socket.emit("join", { roomId: this.socket.roomId }), e();
            }.bind(this)
          ),
          this.socket.on(
            "message",
            function(e) {
              this.onReceive && this.onReceive(e.data);
            }.bind(this)
          );
      },
      disconnect: function() {
        this.socket && (this.socket.disconnect(), (this.socket = void 0));
      },
      emit: function(e) {
        this.socket &&
          this.socket.connected &&
          this.socket.emit("message", { roomId: this.socket.roomId, data: e });
      },
      getData: function(e) {
        this.socket &&
          this.socket.connected &&
          (this.socket.emit("getData", { roomId: this.socket.roomId }),
          this.socket.once("getData", function(t) {
            e(t);
          }));
      },
      setData: function(e) {
        this.socket &&
          this.socket.connected &&
          this.socket.emit("setData", { roomId: this.socket.roomId, data: e });
      },
      joinRoom: function(e) {
        this.socket &&
          this.socket.connected &&
          e &&
          this.socket.emit("join", { roomId: this.socket.roomId + "_" + e });
      },
      leaveRoom: function(e) {
        this.socket &&
          this.socket.connected &&
          e &&
          this.socket.emit("leave", { roomId: this.socket.roomId + "_" + e });
      },
      emitRoom: function(e, t) {
        this.socket &&
          this.socket.connected &&
          e &&
          this.socket.emit("message", {
            roomId: this.socket.roomId + "_" + e,
            data: t
          });
      },
      onReceive: function() {}
    };
  });
function GameScene(e) {
  var t = e.game,
    i = e.screenMode,
    s = e.sceneId,
    a = e.spriteData,
    r = e.soundIds,
    n = e.errorHandler,
    o = e.preloadHandler,
    p = e.assets,
    h = e.socketManager;
  (this.errorHandler = n),
    (this.preloadHandler = o),
    (this.game = t),
    (this.screenMode = i),
    (this.sceneId = s),
    (this.spriteData = a.sprites),
    (this.spriteDataIds = a.spriteIds),
    (this.soundIds = r),
    (this.assets = p),
    (this.scenes = e.scenes),
    (this.isPreloaded = !e.isFirstScene),
    (this.screenWidth = e.screenWidth),
    (this.screenHeight = e.screenHeight),
    (this.wideScreen = e.wideScreen),
    (this.alphaImage =
      "https://s3.ap-northeast-2.amazonaws.com/wizschool-assets/sprite/alpha.png"),
    (this.socketManager = h),
    (this.sendGameEvent = function(e) {
      this.game.sendGameEvent(Object.assign({ sceneId: this.sceneId }, e));
    }),
    (this.figureDirection = function() {
      var e,
        t,
        i = this.game.input.activePointer.positionDown,
        s = this.game.input.activePointer.position,
        a = s.x - i.x,
        r = s.y - i.y,
        n = Math.atan2(r, a) * (180 / Math.PI);
      if (!(Math.sqrt(a * a + r * r) < 150))
        return (
          n < (t = -90) + 30 && n >= t - 30 && (e = "up"),
          n < (t = 90) + 30 && n >= t - 30 && (e = "down"),
          (t = 180),
          Math.abs(n) < t + 30 && Math.abs(n) >= t - 30 && (e = "left"),
          n < (t = 0) + 30 && n >= t - 30 && (e = "right"),
          e
        );
    });
}
(GameScene.prototype.preload = function() {
  if (!this.isPreloaded) {
    for (var e in (this.game.load.onLoadStart.add(this.loadStart, this),
    this.game.load.onLoadComplete.add(this.loadComplete, this),
    (this.isPreloaded = !0),
    (this.game.load.crossOrigin = "anonymous"),
    this.game.load.image(
      "default_bg",
      "https://wizschool-assets.s3.ap-northeast-2.amazonaws.com/background/black_background.png"
    ),
    this.game.load.image(
      "say_bg",
      "https://wizschool-assets.s3.ap-northeast-2.amazonaws.com/sprite/bubble.png"
    ),
    this.scenes)) {
      var t = this.scenes[e],
        i = t.spriteIds,
        s = t.sprites;
      for (var a in i) {
        var r = i[a],
          n = this.assets.sprites[s[r].assetId];
        s[r].type !== SpriteType.TEXT &&
          (s[r].type === SpriteType.COMPONENT
            ? "analog" === s[r].preview.subtype ||
              "dpad" === s[r].preview.subtype
              ? (this.game.load.image(
                  r + "_" + e + "_alpha",
                  this.alphaImage + "?phaser=1"
                ),
                this.load.atlas(
                  r + "_" + e,
                  n.spritePath + "?phaser=1",
                  n.spritePath.replace(".png", ".json") + "?phaser=1"
                ))
              : "camera" === s[r].preview.subtype
              ? this.game.load.image(r + "_" + e, n.path + "?phaser=1")
              : this.game.load.image(
                  r + "_" + e + "_alpha",
                  this.alphaImage + "?phaser=1"
                )
            : n.spriteAnimations
            ? this.game.load.spritesheet(
                r + "_" + e,
                n.spritePath + "?phaser=1",
                n.spriteSize[0],
                n.spriteSize[1]
              )
            : this.game.load.image(r + "_" + e, n.path + "?phaser=1"));
      }
    }
    if (this.soundIds)
      for (var o in this.soundIds) {
        var p = this.soundIds[o],
          h = this.assets.sounds[p];
        this.game.load.audio(h.defaultName, h.path + "?phaser=1");
      }
    this.game.isFromWizlab &&
      ((this.game.sound.volume =
        (this.game.gameVolume * this.game.systemVolume) / 100),
      (this.game.stage.disableVisibilityChange = this.game.isFromWizlab));
  }
}),
  (GameScene.prototype.loadStart = function() {
    this.loadStartTime = new Date().getTime();
  }),
  (GameScene.prototype.loadComplete = function() {
    console.log(new Date().getTime() - this.loadStartTime);
  }),
  (GameScene.prototype.shutdown = function() {
    for (var e in this.wizSprites) {
      var t = this.wizSprites[e];
      t.sprite && t.sprite.pad && t.sprite.pad.destroy();
    }
  }),
  (GameScene.prototype.onPause = function() {
    this.isTimerRunning && ((this.isTimerPausedByGame = !0), this.pauseTimer());
  }),
  (GameScene.prototype.onResume = function() {
    this.isTimerPausedByGame && this.resumeTimer();
  }),
  (GameScene.prototype.onUp = function() {
    if (this.isInputDown) {
      this.isInputDown = !1;
      var e = this.figureDirection();
      for (var t in this.wizSprites) {
        var i = this.wizSprites[t];
        e && i.onSlide(e), i.onScreenClickedUp();
      }
    }
  }),
  (GameScene.prototype.onDown = function() {
    for (var e in ((this.isInputDown = !0), this.wizSprites)) {
      this.wizSprites[e].onScreenClicked();
    }
  }),
  (GameScene.prototype.create = function() {
    var e, t;
    (this.debugMode = !1),
      (this.wizSprites = []),
      (this.overlapData = []),
      (this.overlapOnceDataQueue = []),
      (this.overlapOnceData = []),
      (this.overlapDataQueue = []),
      (this.collisionData = []),
      (this.collisionDataQueue = []),
      (this.sounds = {}),
      (this.clones = {}),
      (this.pressedKeys = {}),
      (this.updateFunctions = []),
      (this.isInputDown = !1),
      (this.timerStartedTime = 0),
      (this.timerDuration = 0),
      (this.timerPausedTime = 0),
      (this.isTimerRunning = !1),
      (this.isTimerPausedByGame = !1),
      (this.xOffset = 0),
      (this.yOffset = 0),
      this.wideScreen
        ? ((e = this.screenWidth), (t = this.screenHeight))
        : ((e = "HORIZONTAL" === this.screenMode ? 1280 : 720),
          (t = "HORIZONTAL" === this.screenMode ? 720 : 1280)),
      (this.spriteGroup = this.game.add.group()),
      this.wideScreen &&
        ("HORIZONTAL" === this.screenMode && 1280 !== e
          ? ((this.xOffset = (e - 1280) / 2),
            (this.spriteGroup.position.x = this.xOffset))
          : "VERTICAL" === this.screenMode &&
            1280 !== t &&
            ((this.yOffset = (t - 1280) / 2),
            (this.spriteGroup.position.y = this.yOffset))),
      this.game.scale.setGameSize(e, t),
      (this.game.renderer.renderSession.roundPixels = !0),
      (this.game.forceSingleUpdate = !1),
      (this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL),
      (this.game.sound.touchLocked = !1),
      this.preloadHandler &&
        (this.preloadHandler(), (this.preloadHandler = null)),
      this.game.input.keyboard.addCallbacks(
        this,
        this.onKeyDown,
        this.onKeyRelease,
        null
      ),
      this.initSounds(),
      this.drawDefaultBackground(),
      this.drawSprites(),
      this.game.onPause.add(this.onPause, this),
      this.game.onResume.add(this.onResume, this),
      this.game.input.onUp.add(this.onUp, this),
      this.game.input.onDown.add(this.onDown, this);
  }),
  (GameScene.prototype.update = function() {
    for (var e in (this.overlapDataQueue.length > 0 &&
      this.popOverlapDataQueue(),
    this.overlapData)) {
      var t = this.overlapData[e];
      if (
        this.game.physics.arcade.overlap(t.target1, t.target2, null, null, this)
      ) {
        var i = t.target1.key,
          s = t.target2[0].key;
        this.sendGameEvent({ api: "onOverlap", spriteId: i, name: s }),
          t.callback();
      }
    }
    for (var e in (this.overlapOnceDataQueue.length > 0 &&
      this.popOverlapOnceDataQueue(),
    this.overlapOnceData)) {
      t = this.overlapOnceData[e];
      if (
        this.game.physics.arcade.overlap(t.target1, t.target2, null, null, this)
      ) {
        t.callback(), this.overlapOnceData.splice(e, 1);
        break;
      }
    }
    for (var e in (this.collisionDataQueue.length > 0 &&
      this.popCollisionDataQueue(),
    this.collisionData)) {
      t = this.collisionData[e];
      this.game.physics.arcade.collide(t.target1, t.target2);
    }
    for (var e in this.updateFunctions) this.updateFunctions[e]();
    for (var e in this.wizSprites) this.wizSprites[e].update();
  }),
  (GameScene.prototype.render = function() {
    if (this.debugMode)
      for (var e in this.wizSprites) {
        var t = this.wizSprites[e];
        t.type !== SpriteType.BACKGROUND && this.game.debug.body(t.sprite);
      }
  }),
  (GameScene.prototype.initSounds = function() {
    if (this.soundIds)
      for (var e in this.soundIds) {
        var t = this.soundIds[e],
          i = this.assets.sounds[t];
        this.sounds[i.defaultName] = this.game.add.audio(i.defaultName);
      }
  }),
  (GameScene.prototype.drawDefaultBackground = function() {
    var e = this.game.add.tileSprite(
      0,
      0,
      this.game.world.bounds.width,
      this.game.world.bounds.height,
      "default_bg"
    );
    this.spriteGroup.add(e);
  }),
  (GameScene.prototype.drawSprites = function() {
    for (var e in ((this.wizSprites = []), this.spriteDataIds)) {
      var t = this.spriteDataIds[e],
        i = this.spriteData[t].preview,
        s = this.spriteData[t].code,
        a = this.drawSprite(i, s);
      this.wizSprites.push(a);
    }
    for (var e in this.wizSprites) {
      var r = this.wizSprites[e];
      r.isCloned || r.runCode();
    }
  }),
  (GameScene.prototype.drawSprite = function(e, t, i) {
    var s,
      a = e.left,
      r = e.top,
      n = e.angle,
      o = e.scaleX,
      p = e.scaleY,
      h = e.opacity,
      c = e.type,
      l = e.subtype,
      d = i ? e.originalName : e.name;
    switch (c) {
      case SpriteType.PLAIN:
      case SpriteType.SPRITE:
      case SpriteType.CUSTOM:
        (s = this.game.add.sprite(a, r, d + "_" + this.game.state.current)),
          this.spriteGroup.add(s);
        break;
      case SpriteType.COMPONENT:
        (s =
          "camera" === l
            ? this.game.add.sprite(a, r, d + "_" + this.game.state.current)
            : this.game.add.sprite(
                0,
                0,
                d + "_" + this.game.state.current + "_alpha"
              )),
          "dpad" === l
            ? ((s.pad = this.game.plugins.add(Phaser.VirtualJoystick)),
              (s.pad.stick = s.pad.addDPad(
                a,
                r,
                200,
                d + "_" + this.game.state.current
              )),
              (s.pad.stick.scale = o))
            : "analog" === l &&
              ((s.pad = this.game.plugins.add(Phaser.VirtualJoystick)),
              (s.pad.stick = s.pad.addStick(
                a,
                r,
                200,
                d + "_" + this.game.state.current
              )),
              (s.pad.stick.scale = o));
        break;
      case SpriteType.BACKGROUND:
        var u = this.scenes[this.sceneId],
          m = u.worldWidth,
          g = u.worldHeight,
          S = this.game.cache.getImage(d + "_" + this.game.state.current).width;
        S = S < m ? m : S;
        var v = this.game.cache.getImage(d + "_" + this.game.state.current)
          .height;
        (v = v < g ? g : v),
          (s = this.game.add.tileSprite(
            m / 2 - this.xOffset,
            g / 2 - this.yOffset,
            S,
            v,
            d + "_" + this.game.state.current
          )),
          this.game.world.setBounds(0, 0, m, g),
          this.spriteGroup.add(s);
        break;
      case SpriteType.TEXT:
        var f = this.spriteData[d].preview,
          y = {
            font: f.fontSize + "px " + f.fontFamily,
            fill: f.fontColor,
            fontWeight: f.fontWeight,
            fontStyle: f.fontStyle
          };
        ((s = this.game.add.text(a, r, f.textValue, y)).fontFamily =
          f.fontFamily),
          this.spriteGroup.add(s);
    }
    (s.angle = n),
      s.scale.set(o, p),
      (s.alpha = h),
      (s.inputEnabled = 1 === h),
      s.anchor.set(0.5),
      this.game.physics.arcade.enable(s),
      s.events.onInputDown.add(this.onClick, this),
      s.events.onInputUp.add(this.onClickUp, this);
    var w = e.name;
    s.key = w;
    var D = new WizSprite({
      game: this.game,
      type: c,
      subtype: l,
      sprite: s,
      codeData: t,
      gameScene: this,
      spriteName: w,
      originalName: d,
      asset: this.assets.sprites[this.spriteData[d].assetId],
      errorHandler: this.errorHandler,
      socketManager: this.socketManager
    });
    return (
      this.clones[d] || (this.clones[d] = []), this.clones[d].push(D.sprite), D
    );
  }),
  (GameScene.prototype.cloneSprite = function(e) {
    var t = e.spriteName,
      i = e.originalName,
      s = this.spriteData[i].code,
      a = i + "_clone_" + new Date().getTime();
    a += "_" + this.clones[i].length;
    var r = this.spriteData[i].preview;
    ((r = JSON.parse(JSON.stringify(r))).name = a),
      (r.originalName = i),
      (r.masterName = t),
      (r.angle = e.sprite.angle),
      (r.scaleX = e.sprite.scale.x),
      (r.scaleY = e.sprite.scale.y),
      (r.left = e.sprite.position.x),
      (r.top = e.sprite.position.y);
    var n = this.drawSprite(r, s, !0);
    return (
      (n.sprite.z = e.sprite.z),
      this.spriteGroup.sort("z", Phaser.Group.SORT_ASCENDING),
      this.wizSprites.push(n),
      n
    );
  }),
  (GameScene.prototype.isOverlapped = function(e, t) {
    var i = void 0;
    for (var s in this.wizSprites) {
      var a = this.wizSprites[s];
      a.originalName === t &&
        (i = this.clones[a.originalName]
          ? this.clones[a.originalName]
          : [a.sprite]);
    }
    return (
      !(!e || !i) && this.game.physics.arcade.overlap(e, i, null, null, this)
    );
  }),
  (GameScene.prototype.popOverlapDataQueue = function() {
    for (var e = this.overlapDataQueue.length - 1; e >= 0; e--) {
      var t = this.overlapDataQueue[e],
        i = t.spriteName,
        s = t.targetSpriteName,
        a = t.callback,
        r = void 0,
        n = void 0;
      for (var o in this.wizSprites) {
        var p = this.wizSprites[o];
        p.spriteName === i && (r = p.sprite),
          p.originalName === s &&
            (n = this.clones[p.originalName]
              ? this.clones[p.originalName]
              : [p.sprite]);
      }
      r &&
        n &&
        (this.overlapData.push({ target1: r, target2: n, callback: a }),
        this.overlapDataQueue.splice(e, 1));
    }
  }),
  (GameScene.prototype.popOverlapOnceDataQueue = function() {
    for (var e = this.overlapOnceDataQueue.length - 1; e >= 0; e--) {
      var t = this.overlapOnceDataQueue[e],
        i = t.spriteName,
        s = t.targetSpriteName,
        a = t.callback,
        r = void 0,
        n = void 0;
      for (var o in this.wizSprites) {
        var p = this.wizSprites[o];
        p.spriteName === i && (r = p.sprite),
          p.originalName === s &&
            (n = this.clones[p.originalName]
              ? this.clones[p.originalName]
              : [p.sprite]);
      }
      r &&
        n &&
        (this.overlapOnceData.push({ target1: r, target2: n, callback: a }),
        this.overlapOnceDataQueue.splice(e, 1));
    }
  }),
  (GameScene.prototype.popOverlapOnceDataQueue = function() {
    for (var e = this.overlapOnceDataQueue.length - 1; e >= 0; e--) {
      var t = this.overlapOnceDataQueue[e],
        i = t.spriteName,
        s = t.targetSpriteName,
        a = t.callback,
        r = void 0,
        n = void 0;
      for (var o in this.wizSprites) {
        var p = this.wizSprites[o];
        p.spriteName === i && (r = p.sprite),
          p.originalName === s &&
            (n = this.clones[p.originalName]
              ? this.clones[p.originalName]
              : [p.sprite]);
      }
      r &&
        n &&
        (this.overlapOnceData.push({ target1: r, target2: n, callback: a }),
        this.overlapOnceDataQueue.splice(e, 1));
    }
  }),
  (GameScene.prototype.popCollisionDataQueue = function() {
    for (var e = this.collisionDataQueue.length - 1; e >= 0; e--) {
      var t = this.collisionDataQueue[e],
        i = t.spriteName,
        s = t.targetSpriteName,
        a = void 0,
        r = void 0;
      for (var n in this.wizSprites) {
        var o = this.wizSprites[n];
        o.spriteName === i && (a = o.sprite),
          o.originalName === s &&
            (r = this.clones[o.originalName]
              ? this.clones[o.originalName]
              : [o.sprite]);
      }
      a &&
        r &&
        (this.collisionData.push({ target1: a, target2: r }),
        this.collisionDataQueue.splice(e, 1));
    }
  }),
  (GameScene.prototype.addOverlap = function(e, t, i) {
    this.overlapDataQueue.push({
      spriteName: e,
      targetSpriteName: t,
      callback: i
    });
  }),
  (GameScene.prototype.addOverlapOnce = function(e, t, i) {
    this.overlapOnceDataQueue.push({
      spriteName: e,
      targetSpriteName: t,
      callback: i
    });
  }),
  (GameScene.prototype.addCollision = function(e, t) {
    this.collisionDataQueue.push({ spriteName: e, targetSpriteName: t });
  }),
  (GameScene.prototype.onKeyDown = function(e) {
    var t = convertKey(e.key);
    for (var i in (this.pressedKeys[t] || (this.pressedKeys[t] = t),
    this.wizSprites)) {
      this.wizSprites[i].onKeyDown(t);
    }
  }),
  (GameScene.prototype.onKeyRelease = function(e) {
    var t = convertKey(e.key);
    for (var i in (this.pressedKeys[t] && delete this.pressedKeys[t],
    this.wizSprites)) {
      this.wizSprites[i].onKeyRelease(t);
    }
  }),
  (GameScene.prototype.onClick = function(e) {
    for (var t in this.wizSprites) {
      var i = this.wizSprites[t];
      e.key === i.spriteName && i.onClicked();
    }
  }),
  (GameScene.prototype.onClickUp = function(e) {
    for (var t in this.wizSprites) {
      var i = this.wizSprites[t];
      e.key === i.spriteName && i.onClickedUp();
    }
  }),
  (GameScene.prototype.getSprite = function(e) {
    for (var t = 0; t < this.wizSprites.length; t++)
      if (this.wizSprites[t].spriteName === e) return this.wizSprites[t];
  }),
  (GameScene.prototype.sendSignal = function(e) {
    for (var t in this.wizSprites) {
      this.wizSprites[t].onReceive(e);
    }
  }),
  (GameScene.prototype.playSound = function(e, t) {
    this.sounds[e] && ((this.sounds[e].loop = t), this.sounds[e].play());
  }),
  (GameScene.prototype.restartSound = function(e) {
    this.sounds[e] && this.sounds[e].restart();
  }),
  (GameScene.prototype.stopSound = function(e) {
    this.sounds[e] && this.sounds[e].stop();
  }),
  (GameScene.prototype.pauseSound = function(e) {
    this.sounds[e] && this.sounds[e].pause();
  }),
  (GameScene.prototype.resumeSound = function(e) {
    this.sounds[e] && this.sounds[e].resume();
  }),
  (GameScene.prototype.hasSound = function(e) {
    return !!this.sounds[e];
  }),
  (GameScene.prototype.startTimer = function() {
    (this.isTimerRunning = !0), (this.timerStartedTime = new Date().getTime());
  }),
  (GameScene.prototype.pauseTimer = function() {
    (this.timerPausedTime = new Date().getTime()), (this.isTimerRunning = !1);
  }),
  (GameScene.prototype.resumeTimer = function() {
    this.isTimerRunning ||
      ((this.timerStartedTime += new Date().getTime() - this.timerPausedTime),
      (this.isTimerRunning = !0));
  }),
  (GameScene.prototype.resetTimer = function() {
    (this.isTimerRunning = !1), (this.timerDuration = 0);
  }),
  (GameScene.prototype.getTimer = function() {
    return (
      this.isTimerRunning &&
        ((this.timerDuration = new Date().getTime() - this.timerStartedTime),
        (this.timerDuration /= 1e3),
        (this.timerDuration = this.timerDuration.toFixed(1))),
      this.timerDuration
    );
  }),
  (GameScene.prototype.onGyroChanged = function(e, t) {
    for (var i in this.wizSprites) {
      this.wizSprites[i].onGyroChanged(e, t);
    }
  }),
  (GameScene.prototype.onListeningResult = function(e) {
    for (var t in this.wizSprites) {
      this.wizSprites[t].onListeningResult(e);
    }
  }),
  (GameScene.prototype.onShaked = function() {
    for (var e in this.wizSprites) {
      this.wizSprites[e].onShaked();
    }
  }),
  (GameScene.prototype.onFaceDetect = function(e) {
    for (var t in this.wizSprites) {
      this.wizSprites[t].onFaceDetected(e);
    }
  }),
  (GameScene.prototype.onSaveGameData = function() {
    for (var e in this.wizSprites) {
      this.wizSprites[e].onSaveGameData();
    }
  }),
  (GameScene.prototype.onResetGameData = function() {
    for (var e in this.wizSprites) {
      this.wizSprites[e].onResetGameData();
    }
  }),
  (GameScene.prototype.onLoadGameData = function() {
    for (var e in this.wizSprites) {
      this.wizSprites[e].onLoadGameData();
    }
  });
function convertKey(r) {
  if (!r) return r;
  switch ((r = r.toLowerCase())) {
    case " ":
      return "space";
    case "arrowup":
      return "up";
    case "arrowdown":
      return "down";
    case "arrowleft":
      return "left";
    case "arrowright":
      return "right";
    case "escape":
      return "esc";
    default:
      return r;
  }
}
function WizSprite(t) {
  (this.defaultSpeed = 100),
    (this.speed = 100),
    (this.onKeyListener = {}),
    (this.onKeyUpListener = {}),
    (this.onClickListener = void 0),
    (this.onClickUpListener = void 0),
    (this.onScreenClickListener = void 0),
    (this.onScreenClickUpListener = void 0),
    (this.onListeningListener = void 0),
    (this.onFaceDetectListener = void 0),
    (this.signalReceiver = {}),
    (this.signalQueue = []),
    (this.swipeHandler = {}),
    (this.errorHandler = t.errorHandler),
    (this.game = t.game),
    (this.gameScene = t.gameScene),
    (this.type = t.type),
    (this.subtype = t.subtype),
    (this.sprite = t.sprite),
    (this.codeData = t.codeData),
    (this.spriteName = t.spriteName),
    (this.originalName = t.originalName),
    (this.spriteId = t.spriteId),
    (this.asset = t.asset),
    (this.socketManager = t.socketManager),
    (this.isCloned = this.spriteName !== this.originalName),
    this.setAnimations(),
    this.setBodySize(),
    (this.isCodeRun = this.isCloned),
    (this.saySprite = void 0),
    (this.sayBgSprite = void 0),
    (this.pen = void 0),
    (this.penSize = 1),
    (this.penColor = "0x000000"),
    (this.sayTimer = void 0),
    (this.prevDegreeForVFD = 0),
    (this.prevForceForVFD = 0),
    (this.sendGameEvent = function(t) {
      this.gameScene.sendGameEvent(
        Object.assign({ spriteId: this.spriteName }, t)
      );
    }),
    setFunctions.call(this);
}
function setFunctions() {
  (this.cameraFollow = function() {
    this.game.camera.follow(this.sprite);
  }.bind(this)),
    (this.fixToCamera = function() {
      this.sprite.fixedToCamera = !0;
    }.bind(this)),
    (this.moveForward = function(t) {
      if (void 0 !== t) {
        if (!isNaN(t)) {
          var e = (this.sprite.angle * Math.PI) / 180,
            i = t * Math.cos(e) + this.sprite.x,
            s = t * Math.sin(e) + this.sprite.y;
          return new Promise(
            function(t) {
              this.moveTo(i, s).then(function() {
                t();
              });
            }.bind(this)
          );
        }
        this.errorHandler(
          ErrorType.PARAMETER_INVALID_TYPE,
          this.getErrorName("moveForward")
        );
      } else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("moveForward")
        );
    }.bind(this)),
    (this.moveX = function(t) {
      if (void 0 !== t) {
        if (isNaN(t))
          this.errorHandler(
            ErrorType.PARAMETER_INVALID_TYPE,
            this.getErrorName("moveX")
          );
        else if (0 !== t) {
          if (this.type !== SpriteType.BACKGROUND) {
            var e = this.sprite.x + t,
              i = this.sprite.y;
            return (
              this.sendGameEvent({ api: "moveX", steps: t }),
              new Promise(
                function(t) {
                  this.moveTo(e, i).then(function() {
                    t();
                  });
                }.bind(this)
              )
            );
          }
          this.sprite.tilePosition.x += t;
        }
      } else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("moveX")
        );
    }.bind(this)),
    (this.moveY = function(t) {
      if (void 0 !== t) {
        if (isNaN(t))
          this.errorHandler(
            ErrorType.PARAMETER_INVALID_TYPE,
            this.getErrorName("moveY")
          );
        else if (0 !== t) {
          if (this.type !== SpriteType.BACKGROUND) {
            var e = this.sprite.x,
              i = this.sprite.y + t;
            return (
              this.sendGameEvent({ api: "moveY", steps: t }),
              new Promise(
                function(t) {
                  this.moveTo(e, i).then(function() {
                    t();
                  });
                }.bind(this)
              )
            );
          }
          this.sprite.tilePosition.y += t;
        }
      } else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("moveY")
        );
    }.bind(this)),
    (this.turn = function(t) {
      void 0 !== t
        ? isNaN(t)
          ? this.errorHandler(
              ErrorType.PARAMETER_INVALID_TYPE,
              this.getErrorName("turn")
            )
          : (this.sprite.angle += t)
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("turn")
          );
    }.bind(this)),
    (this.turnToSprite = function(t) {
      if (this.sprite.body)
        if (void 0 !== t) {
          var e = this.getSprite(t),
            i = this.sprite.body.center,
            s = e.sprite.body.center,
            r = this.calculateAngle(i, s);
          this.setDegree(360 - r);
        } else
          this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("goToSprite")
          );
    }.bind(this)),
    (this.turnToMousePointer = function() {
      if (this.sprite.body) {
        var t = this.sprite.body.center,
          e = {
            x: this.game.input.activePointer.x,
            y: this.game.input.activePointer.y
          },
          i = this.calculateAngle(t, e);
        this.setDegree(360 - i);
      }
    }.bind(this)),
    (this.setFlipX = function(t) {
      if (void 0 !== t) {
        var e = Math.abs(this.sprite.scale.x);
        (e = t ? -e : e),
          (this.sprite.scale.x = e),
          this.sendGameEvent({ api: "setFlipX", isFlipped: t });
      } else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("setFlipX")
        );
    }.bind(this)),
    (this.setFlipY = function(t) {
      if (void 0 !== t) {
        var e = Math.abs(this.sprite.scale.y);
        (e = t ? -e : e),
          (this.sprite.scale.y = e),
          this.sendGameEvent({ api: "setFlipY", isFlipped: t });
      } else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("setFlipY")
        );
    }.bind(this)),
    (this.getFlipX = function() {
      return this.sprite.scale.x < 0;
    }.bind(this)),
    (this.getFlipX = function() {
      return this.sprite.scale.y < 0;
    }.bind(this)),
    (this.setHorizontalFlip = function(t) {
      if (void 0 !== t) {
        var e = Math.abs(this.sprite.scale.x);
        (e = t ? -e : e), (this.sprite.scale.x = e);
      } else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("setHorizontalFlip")
        );
    }.bind(this)),
    (this.setVerticalFlip = function(t) {
      if (void 0 !== t) {
        var e = Math.abs(this.sprite.scale.y);
        (e = t ? -e : e), (this.sprite.scale.y = e);
      } else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("setVerticalFlip")
        );
    }.bind(this)),
    (this.setDegree = function(t) {
      void 0 !== t
        ? isNaN(t)
          ? this.errorHandler(
              ErrorType.PARAMETER_INVALID_TYPE,
              this.getErrorName("setDegree")
            )
          : (this.sprite.angle = t)
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("setDegree")
          );
    }.bind(this)),
    (this.getDegree = function() {
      return this.sprite.angle;
    }.bind(this)),
    (this.setMoveSpeed = function(t) {
      void 0 !== t
        ? isNaN(t)
          ? this.errorHandler(
              ErrorType.PARAMETER_INVALID_TYPE,
              this.getErrorName("setMoveSpeed")
            )
          : ((this.speed = t),
            this.sendGameEvent({ api: "setMoveSpeed", speed: t }))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("setMoveSpeed")
          );
    }.bind(this)),
    (this.getMoveSpeed = function() {
      return this.speed;
    }.bind(this)),
    (this.goForward = function(t) {
      if (void 0 !== t)
        if (isNaN(t))
          this.errorHandler(
            ErrorType.PARAMETER_INVALID_TYPE,
            this.getErrorName("goForward")
          );
        else {
          var e = (this.sprite.angle * Math.PI) / 180,
            i = t * Math.cos(e) + this.sprite.x,
            s = t * Math.sin(e) + this.sprite.y;
          this.goTo(i, s);
        }
      else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("goForward")
        );
    }.bind(this)),
    (this.goX = function(t) {
      if (void 0 !== t)
        if (isNaN(t))
          this.errorHandler(
            ErrorType.PARAMETER_INVALID_TYPE,
            this.getErrorName("goX")
          );
        else {
          if (this.type === SpriteType.BACKGROUND)
            this.sprite.tilePosition.x += t;
          else {
            var e = this.sprite.x + t,
              i = this.sprite.y;
            this.goTo(e, i);
          }
          this.sendGameEvent({ api: "goX", steps: t });
        }
      else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("goX")
        );
    }.bind(this)),
    (this.goY = function(t) {
      if (void 0 !== t)
        if (isNaN(t))
          this.errorHandler(
            ErrorType.PARAMETER_INVALID_TYPE,
            this.getErrorName("goY")
          );
        else if (this.type === SpriteType.BACKGROUND)
          this.sprite.tilePosition.y += t;
        else {
          var e = this.sprite.x,
            i = this.sprite.y + t;
          this.goTo(e, i);
        }
      else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("goY")
        );
    }.bind(this)),
    (this.goTo = function(t, e) {
      void 0 !== t && void 0 !== e
        ? isNaN(t) || isNaN(e)
          ? this.errorHandler(
              ErrorType.PARAMETER_INVALID_TYPE,
              this.getErrorName("goTo")
            )
          : ((this.sprite.position.x = t),
            (this.sprite.position.y = e),
            this.sendGameEvent({ api: "goTo", x: t, y: e }))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("goTo")
          );
    }.bind(this)),
    (this.goToSprite = function(t) {
      if (void 0 !== t) {
        var e = this.getSprite(t);
        if (e) {
          var i = e.sprite.position.x,
            s = e.sprite.position.y;
          this.goTo(i, s),
            this.sendGameEvent({ api: "goToSprite", targetSpriteId: t });
        }
      } else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("goToSprite")
        );
    }.bind(this)),
    (this.goToMousePointer = function() {
      var t = this.game.input.activePointer.x,
        e = this.game.input.activePointer.y;
      this.goTo(t, e);
    }.bind(this)),
    (this.goToRandom = function() {
      var t = this.getWorldWidth() > this.getWorldHeight(),
        e = t ? this.getRandom(0, 1280) : this.getRandom(0, 720),
        i = t ? this.getRandom(0, 720) : this.getRandom(0, 1280);
      this.goTo(e, i);
    }.bind(this)),
    (this.setX = function(t) {
      if (void 0 !== t)
        if (isNaN(t))
          this.errorHandler(
            ErrorType.PARAMETER_INVALID_TYPE,
            this.getErrorName("setX")
          );
        else {
          if (this.type === SpriteType.BACKGROUND)
            this.sprite.tilePosition.x += t;
          else {
            t = this.sprite.x + t;
            var e = this.sprite.y;
            this.goTo(t, e);
          }
          this.sendGameEvent({ api: "setX", x: t });
        }
      else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("setX")
        );
    }.bind(this)),
    (this.setY = function(t) {
      if (void 0 !== t)
        if (isNaN(t))
          this.errorHandler(
            ErrorType.PARAMETER_INVALID_TYPE,
            this.getErrorName("setY")
          );
        else {
          if (this.type === SpriteType.BACKGROUND)
            this.sprite.tilePosition.y += t;
          else {
            var e = this.sprite.x;
            t = this.sprite.y + t;
            this.goTo(e, t);
          }
          this.sendGameEvent({ api: "setY", y: t });
        }
      else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("setY")
        );
    }.bind(this)),
    (this.getX = function() {
      return this.sprite.x;
    }.bind(this)),
    (this.getY = function() {
      return this.sprite.y;
    }.bind(this)),
    (this.moveTo = function(t, e) {
      if (void 0 !== t && void 0 !== e) {
        if (!isNaN(t) && !isNaN(e)) {
          var i = this.getTimeSec(
            t,
            e,
            this.sprite.position.x,
            this.sprite.position.y
          );
          return (
            this.sendGameEvent({ api: "moveTo", x: t, y: e }),
            new Promise(
              function(s) {
                var r = this.game.add.tween(this.sprite.position);
                r.to({ x: t, y: e }, 1e3 * i, Phaser.Easing.Linear.None, !0),
                  r.onComplete.addOnce(function() {
                    s();
                  });
              }.bind(this)
            )
          );
        }
        this.errorHandler(
          ErrorType.PARAMETER_INVALID_TYPE,
          this.getErrorName("moveTo")
        );
      } else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("moveTo")
        );
    }.bind(this)),
    (this.moveToSprite = function(t) {
      if (void 0 !== t) {
        var e = this.getSprite(t);
        if (e) {
          var i = e.sprite.position.x,
            s = e.sprite.position.y;
          return new Promise(
            function(t) {
              this.moveTo(i, s).then(function() {
                t();
              });
            }.bind(this)
          );
        }
      } else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("moveToSprite")
        );
    }.bind(this)),
    (this.moveToMousePointer = function() {
      var t = this.game.input.activePointer.x,
        e = this.game.input.activePointer.y;
      return new Promise(
        function(i) {
          this.moveTo(t, e).then(function() {
            i();
          });
        }.bind(this)
      );
    }.bind(this)),
    (this.moveToRandom = function() {
      var t = this.getWorldWidth() > this.getWorldHeight(),
        e = t ? this.getRandom(0, 1280) : this.getRandom(0, 720),
        i = t ? this.getRandom(0, 720) : this.getRandom(0, 1280);
      return new Promise(
        function(t) {
          this.moveTo(e, i).then(function() {
            t();
          });
        }.bind(this)
      );
    }.bind(this)),
    (this.setDraggable = function(t) {
      void 0 !== t
        ? (this.sprite.input &&
            (t
              ? (this.sprite.input.enableDrag(),
                this.sendGameEvent({ api: "setDraggable", enabled: !0 }))
              : (this.sprite.input.disableDrag(),
                this.sendGameEvent({ api: "setDraggable", enabled: !1 }))),
          (this.sprite._drag = t))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("setDraggable")
          );
    }.bind(this)),
    (this.getDraggable = function() {
      return this.sprite._drag;
    }.bind(this)),
    (this.say = function(t, e) {
      if (void 0 !== t) {
        (t = String(t)), this.stopSay();
        for (var i = "", s = 0; s < t.length; s++)
          (i += t.charAt(s)), 0 !== s && s % 12 == 0 && (i += "\n");
        (this.sayBgSprite = this.game.add.sprite(0, 0, "say_bg")),
          (this.sayBgSprite.visible = !1),
          this.sayBgSprite.anchor.set(0.5, 1),
          (this.saySprite = this.game.add.text(0, 0, i, {
            fill: "#555555",
            font: "32px Arial"
          })),
          this.saySprite.anchor.set(0.5, 0.5),
          (this.saySprite.visible = !1),
          this.sayTimer && clearTimeout(this.sayTimer),
          e &&
            (this.sendGameEvent({ api: "say", message: t, sec: e }),
            (this.sayTimer = setTimeout(
              function() {
                this.stopSay();
              }.bind(this),
              1e3 * e
            )));
      } else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("say")
        );
    }.bind(this)),
    (this.stopSay = function() {
      this.saySprite && (this.saySprite.kill(), (this.saySprite = void 0)),
        this.sayBgSprite &&
          (this.sayBgSprite.kill(), (this.sayBgSprite = void 0));
    }.bind(this)),
    (this.playAnimation = function(t, e) {
      if (
        this.sprite.body &&
        (this.type === SpriteType.PLAIN || this.type === SpriteType.SPRITE) &&
        this.asset.spriteAnimations
      )
        if (void 0 !== t) {
          var i = this.asset.spriteAnimations;
          if (i[t]) {
            var s = i[t].bodySize;
            s && this.sprite.body.setSize(s[0], s[1], s[2], s[3]),
              this.sprite.animations._anims[t] &&
                ((this.sprite.animations._anims[t].loop = e),
                this.sprite.animations.play(t),
                this.sendGameEvent({
                  api: "playAnimation",
                  name: t,
                  isLoop: e
                }),
                e ||
                  this.sprite.animations._anims[t].onComplete.addOnce(
                    function() {
                      this.sprite.frame = 0;
                    },
                    this
                  ));
          } else
            this.errorHandler(
              ErrorType.PARAMETER_NOT_FOUND,
              this.getErrorName("playAnimation")
            );
        } else
          this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("playAnimation")
          );
    }.bind(this)),
    (this.stopAnimation = function() {
      this.sprite.animations.stop(), (this.sprite.frame = 0);
    }.bind(this)),
    (this.getCurrentAnimation = function() {
      return this.sprite.animations &&
        this.sprite.animations.currentAnim &&
        this.sprite.animations.currentAnim.isPlaying
        ? this.sprite.animations.currentAnim.name
        : "";
    }.bind(this)),
    (this.setSize = function(t) {
      if (void 0 !== t)
        if (isNaN(t))
          this.errorHandler(
            ErrorType.PARAMETER_INVALID_TYPE,
            this.getErrorName("setSize")
          );
        else {
          var e = t / 100,
            i = t / 100;
          this.sprite.scale.x < 0 && (e = (t / 100) * -1),
            this.sprite.scale.y < 0 && (i = (t / 100) * -1),
            this.sprite.scale.setTo(e, i);
        }
      else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("setSize")
        );
    }.bind(this)),
    (this.addSize = function(t) {
      void 0 !== t
        ? isNaN(t)
          ? this.errorHandler(
              ErrorType.PARAMETER_INVALID_TYPE,
              this.getErrorName("addSize")
            )
          : this.setSize(this.getSize() + t)
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("addSize")
          );
    }.bind(this)),
    (this.getSize = function() {
      return parseInt(Math.abs(100 * this.sprite.scale.x));
    }.bind(this)),
    (this.show = function() {
      (this.sprite.alpha = 1),
        (this.sprite.inputEnabled = !0),
        this.sendGameEvent({ api: "show" }),
        this.sprite._drag && this.setDraggable(!0);
    }.bind(this)),
    (this.hide = function() {
      this.stopSay(),
        (this.sprite.alpha = 0),
        (this.sprite.inputEnabled = !1),
        this.sendGameEvent({ api: "hide" });
    }.bind(this)),
    (this.getX = function() {
      return this.sprite.position.x;
    }.bind(this)),
    (this.bringToTop = function() {
      this.sprite.bringToTop();
    }.bind(this)),
    (this.getY = function() {
      return this.sprite.position.y;
    }.bind(this)),
    (this.setWidth = function(t) {
      void 0 !== t
        ? isNaN(t)
          ? this.errorHandler(
              ErrorType.PARAMETER_INVALID_TYPE,
              this.getErrorName("setWidth")
            )
          : ((this.sprite.width = t),
            this.sendGameEvent({ api: "setWidth", width: t }))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("setWidth")
          );
    }.bind(this)),
    (this.setHeight = function(t) {
      void 0 !== t
        ? isNaN(t)
          ? this.errorHandler(
              ErrorType.PARAMETER_INVALID_TYPE,
              this.getErrorName("setHeight")
            )
          : ((this.sprite.height = t),
            this.sendGameEvent({ api: "setHeight", height: t }))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("setHeight")
          );
    }.bind(this)),
    (this.getWidth = function() {
      return this.sprite.width;
    }.bind(this)),
    (this.getHeight = function() {
      return this.sprite.height;
    }.bind(this)),
    (this.getWorldWidth = function() {
      return this.game.width;
    }.bind(this)),
    (this.getWorldHeight = function() {
      return this.game.height;
    }.bind(this)),
    (this.getMousePointerX = function() {
      return this.game.input.activePointer.x;
    }.bind(this)),
    (this.getMousePointerY = function() {
      return this.game.input.activePointer.y;
    }.bind(this)),
    (this.shake = function() {
      this.game.camera.shake(
        0.02,
        200,
        !1,
        window.Phaser.Camera.SHAKE_VERTICAL,
        !0
      ),
        this.sendGameEvent({ api: "shake" });
    }.bind(this)),
    (this.flash = function() {
      this.game.camera.flash(16777215, 200, !1);
    }.bind(this)),
    (this.onSwipe = function(t, e) {
      this.swipeHandler[t] = e;
    }.bind(this)),
    (this.onFrame = function(t) {
      this.gameScene.updateFunctions.push(t);
    }.bind(this)),
    (this.onSignal = function(t, e) {
      (this.signalReceiver[t] = e),
        this.sendGameEvent({ api: "onSignal", name: t });
    }.bind(this)),
    (this.sendSignal = function(t) {
      void 0 !== t
        ? (this.sendGameEvent({ api: "sendSignal", name: t }),
          this.gameScene.sendSignal(t))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("sendSignal")
          );
    }.bind(this)),
    (this.onOut = function(t) {
      (this.sprite.checkWorldBounds = !0),
        this.sprite.events.onOutOfBounds.add(t, this);
    }.bind(this)),
    (this.onOutStage = function(t) {
      (this.sprite.checkWorldBounds = !0),
        this.sprite.events.onOutOfBounds.add(t, this);
    }.bind(this)),
    (this.changeScene = function(t) {
      void 0 !== t
        ? (this.game.state.states[t] ||
            this.errorHandler(
              ErrorType.PARAMETER_NOT_FOUND,
              this.getErrorName("changeScene")
            ),
          this.stopAllSounds(),
          this.game.state.start(t, !0, !1),
          this.sendGameEvent({ api: "changeScene", name: t }))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("changeScene")
          );
    }.bind(this)),
    (this.kill = function() {
      this.stopSay(), this.sprite.kill(), this.sendGameEvent({ api: "kill" });
    }.bind(this)),
    (this.revive = function() {
      this.sprite.revive();
    }.bind(this)),
    (this.clone = function() {
      return this.gameScene.cloneSprite(this);
    }.bind(this)),
    (this.wait = function(t) {
      if (void 0 !== t) {
        if (!isNaN(t))
          return (
            (t = 0 === t ? 0.01 : t),
            new Promise(function(e) {
              setTimeout(function() {
                e();
              }, 1e3 * t);
            })
          );
        this.errorHandler(
          ErrorType.PARAMETER_INVALID_TYPE,
          this.getErrorName("wait")
        );
      } else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("wait")
        );
    }.bind(this)),
    (this.onClick = function(t) {
      this.onClickListener = t;
    }.bind(this)),
    (this.onClickUp = function(t) {
      this.onClickUpListener = t;
    }.bind(this)),
    (this.onTouch = function(t) {
      this.onClickListener = t;
    }.bind(this)),
    (this.onTouchUp = function(t) {
      this.onClickUpListener = t;
    }.bind(this)),
    (this.onScreenClick = function(t) {
      this.onScreenClickListener = t;
    }.bind(this)),
    (this.onScreenClickUp = function(t) {
      this.onScreenClickUpListener = t;
    }.bind(this)),
    (this.onKey = function(t, e) {
      void 0 === t &&
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("getRandom")
        ),
        (this.onKeyListener[t] = e);
    }.bind(this)),
    (this.onKeyUp = function(t, e) {
      this.onKeyUpListener[t] = e;
    }.bind(this)),
    (this.getRandom = function(t, e) {
      if (void 0 !== t && void 0 !== e) {
        if (!isNaN(t) && !isNaN(e))
          return (
            (t = t || 0), (e = e || 100), this.game.rnd.integerInRange(t, e)
          );
        this.errorHandler(
          ErrorType.PARAMETER_INVALID_TYPE,
          this.getErrorName("getRandom")
        );
      } else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("getRandom")
        );
    }.bind(this)),
    (this.getName = function() {
      return this.originalName;
    }.bind(this)),
    (this.print = function(t) {
      console.log("%c " + t, "background: #555; color: #bada55"),
        parent.postMessage({ message: t, source: "wizlab", type: "chatbot" });
    }),
    (this.input = function(t) {
      return new Promise(function(e) {
        onclickInputShow(t, function(t) {
          e(t);
        });
      });
    }),
    (this.getSprite = function(t) {
      if (void 0 !== t) return this.gameScene.getSprite(t);
      this.errorHandler(
        ErrorType.PARAMETER_UNDEFINED,
        this.getErrorName("getSprite")
      );
    }.bind(this)),
    (this.setCollideScene = function(t) {
      this.sprite.body &&
        (void 0 !== t
          ? ((this.sprite.body.collideWorldBounds = t),
            this.sendGameEvent({ api: "setCollideScene", enable: t }))
          : this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setCollideScene")
            ));
    }.bind(this)),
    (this.setCollideWorldBounds = function(t) {
      this.sprite.body &&
        (void 0 !== t
          ? (this.sprite.body.collideWorldBounds = t)
          : this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setCollideWorldBounds")
            ));
    }.bind(this)),
    (this.setCollision = function(t) {
      if (void 0 !== t)
        if (Array.isArray(t))
          for (var e in t) {
            var i = t[e];
            this.gameScene.addCollision(this.spriteName, i),
              this.sendGameEvent({ api: "setCollision", targetName: i });
          }
        else
          this.gameScene.addCollision(this.spriteName, t),
            this.sendGameEvent({ api: "setCollision", targetName: t });
      else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("setCollision")
        );
    }.bind(this)),
    (this.setCheckCollision = function(t, e) {
      if (this.sprite.body)
        if (void 0 !== t)
          if (void 0 !== e)
            switch (t) {
              case "up":
                this.sprite.body.checkCollision.up = e;
                break;
              case "down":
                this.sprite.body.checkCollision.down = e;
                break;
              case "left":
                this.sprite.body.checkCollision.left = e;
                break;
              case "right":
                this.sprite.body.checkCollision.right = e;
                break;
              default:
                this.errorHandler(
                  ErrorType.PARAMETER_NOT_FOUND,
                  this.getErrorName("setCheckCollision")
                );
            }
          else
            this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setCheckCollision")
            );
        else
          this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("setCheckCollision")
          );
    }.bind(this)),
    (this.setCollideSide = function(t, e) {
      if (this.sprite.body)
        if (void 0 !== t)
          if (void 0 !== e)
            switch (t) {
              case "up":
                this.sprite.body.checkCollision.up = e;
                break;
              case "down":
                this.sprite.body.checkCollision.down = e;
                break;
              case "left":
                this.sprite.body.checkCollision.left = e;
                break;
              case "right":
                this.sprite.body.checkCollision.right = e;
                break;
              default:
                this.errorHandler(
                  ErrorType.PARAMETER_NOT_FOUND,
                  this.getErrorName("setCollideSide")
                );
            }
          else
            this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setCollideSide")
            );
        else
          this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("setCollideSide")
          );
    }.bind(this)),
    (this.onOverlap = function(t, e) {
      if (void 0 !== t)
        if (Array.isArray(t))
          for (var i in t) {
            var s = t[i];
            this.gameScene.addOverlap(this.spriteName, s, e);
          }
        else this.gameScene.addOverlap(this.spriteName, t, e);
      else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("onOverlap")
        );
    }.bind(this)),
    (this.onOverlapOnce = function(t, e) {
      if (void 0 !== t)
        if (Array.isArray(t))
          for (var i in t) {
            var s = t[i];
            this.gameScene.addOverlapOnce(this.spriteName, s, e);
          }
        else this.gameScene.addOverlapOnce(this.spriteName, t, e);
      else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("onOverlapOnce")
        );
    }.bind(this)),
    (this.setImmovable = function(t) {
      this.sprite.body &&
        (void 0 !== t
          ? (this.sprite.body.immovable = t)
          : this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setImmovable")
            ));
    }.bind(this)),
    (this.setMovable = function(t) {
      this.sprite.body &&
        (void 0 !== t
          ? ((this.sprite.body.immovable = !t),
            this.sendGameEvent({ api: "setMovable", enable: t }))
          : this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setMovable")
            ));
    }.bind(this)),
    (this.getMovable = function() {
      return !this.sprite.body.immovable;
    }.bind(this)),
    (this.setMass = function(t) {
      this.sprite.body &&
        (void 0 !== t
          ? isNaN(t)
            ? this.errorHandler(
                ErrorType.PARAMETER_INVALID_TYPE,
                this.getErrorName("setMass")
              )
            : (this.sprite.body.mass = t)
          : this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setMass")
            ));
    }.bind(this)),
    (this.getMass = function() {
      return this.sprite.body.mass;
    }.bind(this)),
    (this.setGravityX = function(t) {
      this.sprite.body &&
        (void 0 !== t
          ? isNaN(t)
            ? this.errorHandler(
                ErrorType.PARAMETER_INVALID_TYPE,
                this.getErrorName("setGravityX")
              )
            : this.sprite.body && (this.sprite.body.gravity.x = t)
          : this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setGravityX")
            ));
    }.bind(this)),
    (this.setGravityY = function(t) {
      this.sprite.body &&
        (void 0 !== t
          ? isNaN(t)
            ? this.errorHandler(
                ErrorType.PARAMETER_INVALID_TYPE,
                this.getErrorName("setGravityY")
              )
            : this.sprite.body &&
              ((this.sprite.body.gravity.y = t),
              this.sendGameEvent({ api: "setGravityY", value: t }))
          : this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setGravityY")
            ));
    }.bind(this)),
    (this.getGravityX = function() {
      return this.sprite.body ? this.sprite.body.gravity.x : 0;
    }.bind(this)),
    (this.getGravityY = function() {
      return this.sprite.body ? this.sprite.body.gravity.y : 0;
    }.bind(this)),
    (this.setVelocityX = function(t) {
      this.sprite.body &&
        (void 0 !== t
          ? isNaN(t)
            ? this.errorHandler(
                ErrorType.PARAMETER_INVALID_TYPE,
                this.getErrorName("setVelocityX")
              )
            : this.sprite.body &&
              ((this.sprite.body.velocity.x = t),
              this.sendGameEvent({ api: "setVelocityX", value: t }))
          : this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setVelocityX")
            ));
    }.bind(this)),
    (this.setVelocityY = function(t) {
      this.sprite.body &&
        (void 0 !== t
          ? isNaN(t)
            ? this.errorHandler(
                ErrorType.PARAMETER_INVALID_TYPE,
                this.getErrorName("setVelocityY")
              )
            : this.sprite.body &&
              ((this.sprite.body.velocity.y = t),
              this.sendGameEvent({ api: "setVelocityY", value: t }))
          : this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setVelocityY")
            ));
    }.bind(this)),
    (this.getVelocityX = function() {
      return this.sprite.body ? this.sprite.body.velocity.x : 0;
    }.bind(this)),
    (this.getVelocityY = function() {
      return this.sprite.body ? this.sprite.body.velocity.y : 0;
    }.bind(this)),
    (this.getVelocityX = function() {
      return this.sprite.body.velocity.x;
    }.bind(this)),
    (this.getVelocityY = function() {
      return this.sprite.body.velocity.y;
    }.bind(this)),
    (this.setBounceX = function(t) {
      this.sprite.body &&
        (void 0 !== t
          ? isNaN(t)
            ? this.errorHandler(
                ErrorType.PARAMETER_INVALID_TYPE,
                this.getErrorName("setBounceX")
              )
            : ((this.sprite.body.bounce.x = t),
              this.sendGameEvent({ api: "setBounceX", value: t }))
          : this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setBounceX")
            ));
    }.bind(this)),
    (this.setBounceY = function(t) {
      this.sprite.body &&
        (void 0 !== t
          ? isNaN(t)
            ? this.errorHandler(
                ErrorType.PARAMETER_INVALID_TYPE,
                this.getErrorName("setBounceY")
              )
            : ((this.sprite.body.bounce.y = t),
              this.sendGameEvent({ api: "setBounceY", value: t }))
          : this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setBounceY")
            ));
    }.bind(this)),
    (this.getBounceX = function() {
      return this.sprite.body ? this.sprite.body.bounce.x : 0;
    }.bind(this)),
    (this.getBounceY = function() {
      return this.sprite.body ? this.sprite.body.bounce.y : 0;
    }.bind(this)),
    (this.setAccelerationX = function(t) {
      this.sprite.body &&
        (void 0 !== t
          ? isNaN(t)
            ? this.errorHandler(
                ErrorType.PARAMETER_INVALID_TYPE,
                this.getErrorName("setAccelerationX")
              )
            : (this.sprite.body.acceleration.x = t)
          : this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setAccelerationX")
            ));
    }.bind(this)),
    (this.setAccelerationY = function(t) {
      this.sprite.body &&
        (void 0 !== t
          ? isNaN(t)
            ? this.errorHandler(
                ErrorType.PARAMETER_INVALID_TYPE,
                this.getErrorName("setAccelerationY")
              )
            : (this.sprite.body.acceleration.y = t)
          : this.errorHandler(
              ErrorType.PARAMETER_UNDEFINED,
              this.getErrorName("setAccelerationY")
            ));
    }.bind(this)),
    (this.getAccelerationX = function() {
      return this.sprite.body.acceleration.x;
    }.bind(this)),
    (this.getAccelerationY = function() {
      return this.sprite.body.acceleration.y;
    }.bind(this)),
    (this.playSound = function(t, e) {
      void 0 !== t
        ? this.gameScene.hasSound(t)
          ? (this.gameScene.playSound(t, e),
            this.sendGameEvent({ api: "playSound", name: t, isLoop: e }))
          : this.errorHandler(
              ErrorType.PARAMETER_NOT_FOUND,
              this.getErrorName("playSound")
            )
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("playSound")
          );
    }.bind(this)),
    (this.restartSound = function(t) {
      void 0 !== t
        ? (this.gameScene.hasSound(t) ||
            this.errorHandler(
              ErrorType.PARAMETER_NOT_FOUND,
              this.getErrorName("restartSound")
            ),
          this.gameScene.restartSound(t))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("restartSound")
          );
    }.bind(this)),
    (this.stopSound = function(t) {
      void 0 !== t
        ? (this.gameScene.hasSound(t) ||
            this.errorHandler(
              ErrorType.PARAMETER_NOT_FOUND,
              this.getErrorName("stopSound")
            ),
          this.gameScene.stopSound(t))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("stopSound")
          );
    }.bind(this)),
    (this.pauseSound = function(t) {
      void 0 !== t
        ? (this.gameScene.hasSound(t) ||
            this.errorHandler(
              ErrorType.PARAMETER_NOT_FOUND,
              this.getErrorName("pauseSound")
            ),
          this.gameScene.pauseSound(t))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("pauseSound")
          );
    }.bind(this)),
    (this.resumeSound = function(t) {
      void 0 !== t
        ? (this.gameScene.hasSound(t) ||
            this.errorHandler(
              ErrorType.PARAMETER_NOT_FOUND,
              this.getErrorName("resumeSound")
            ),
          this.gameScene.resumeSound(t))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("resumeSound")
          );
    }.bind(this)),
    (this.stopAllSounds = function() {
      this.game.sound.stopAll();
    }.bind(this)),
    (this.setSoundVolume = function(t) {
      if (void 0 !== t)
        if (isNaN(t))
          this.errorHandler(
            ErrorType.PARAMETER_INVALID_TYPE,
            this.getErrorName("setSoundVolume")
          );
        else {
          var e = this.game.systemVolume ? this.game.systemVolume : 100,
            i = t;
          (i = (i = i < 0 ? 0 : i) > 1 ? 1 : i),
            (this.game.gameVolume = i),
            (this.game.sound.volume = (this.game.gameVolume * e) / 100);
        }
      else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("setSoundVolume")
        );
    }.bind(this)),
    (this.addSoundVolume = function(t) {
      if (void 0 !== t)
        if (isNaN(t))
          this.errorHandler(
            ErrorType.PARAMETER_INVALID_TYPE,
            this.getErrorName("addSoundVolume")
          );
        else {
          var e = this.game.gameVolume + t;
          this.setSoundVolume(e);
        }
      else
        this.errorHandler(
          ErrorType.PARAMETER_UNDEFINED,
          this.getErrorName("addSoundVolume")
        );
    }.bind(this)),
    (this.getSoundVolume = function() {
      return this.game.gameVolume;
    }.bind(this)),
    (this.setText = function(t) {
      void 0 !== t
        ? this.type === SpriteType.TEXT &&
          ((t = t.toString()), (this.sprite.text = t))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("setText")
          );
    }.bind(this)),
    (this.getText = function() {
      return this.type === SpriteType.TEXT ? this.sprite.text : void 0;
    }.bind(this)),
    (this.appendText = function(t) {
      void 0 !== t
        ? this.type === SpriteType.TEXT &&
          (this.sprite.text = this.getText() + t)
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("appendText")
          );
    }.bind(this)),
    (this.clearText = function() {
      this.type === SpriteType.TEXT && (this.sprite.text = "");
    }.bind(this)),
    (this.setTextColor = function(t) {
      void 0 !== t
        ? (HTML_Colors[t] && (t = HTML_Colors[t]),
          this.type === SpriteType.TEXT && this.sprite.addColor(t, 0))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("setTextColor")
          );
    }.bind(this)),
    (this.setRandomTextColor = function() {
      var t = "#" + Math.floor(16777215 * Math.random()).toString(16);
      this.setTextColor(t);
    }.bind(this)),
    (this.getTextColor = function() {
      if (this.type === SpriteType.TEXT)
        return this.sprite.colors[0]
          ? this.sprite.colors[0]
          : this.sprite.style.fill;
    }.bind(this)),
    (this.getYear = function() {
      return new Date().getFullYear();
    }.bind(this)),
    (this.getMonth = function() {
      return new Date().getMonth() + 1;
    }.bind(this)),
    (this.getDay = function() {
      return new Date().getDate();
    }.bind(this)),
    (this.getHour = function() {
      return new Date().getHours();
    }.bind(this)),
    (this.getMin = function() {
      return new Date().getMinutes();
    }.bind(this)),
    (this.getSec = function() {
      return new Date().getSeconds();
    }.bind(this)),
    (this.startTimer = function() {
      this.gameScene.startTimer();
    }.bind(this)),
    (this.pauseTimer = function() {
      this.gameScene.pauseTimer();
    }.bind(this)),
    (this.resumeTimer = function() {
      this.gameScene.resumeTimer();
    }.bind(this)),
    (this.resetTimer = function() {
      this.gameScene.resetTimer();
    }.bind(this)),
    (this.getTimer = function() {
      return this.gameScene.getTimer();
    }.bind(this)),
    (this.isClickedSprite = function() {
      return this.isClicked;
    }.bind(this)),
    (this.isPressedKey = function(t) {
      return !!this.gameScene.pressedKeys[t];
    }.bind(this)),
    (this.isClickedMouse = function() {
      return this.game.input.activePointer.isDown;
    }.bind(this)),
    (this.isOverlapped = function(t) {
      if (void 0 !== t) return this.gameScene.isOverlapped(this.sprite, t);
      this.errorHandler(
        ErrorType.PARAMETER_UNDEFINED,
        this.getErrorName("isOverlapped")
      );
    }.bind(this)),
    (this.onJoystick = function(t) {
      "analog" === this.subtype && (this.joystickCallback = t);
    }.bind(this)),
    (this.onDpad = function(t) {
      "dpad" === this.subtype && (this.dpadCallback = t);
    }.bind(this)),
    (this.setVelocityFromDegree = function(t, e, i) {
      if (this.sprite.body) {
        var s = (t * Math.PI) / 180;
        this.game.physics.arcade.velocityFromRotation(
          s,
          e * i,
          this.sprite.body.velocity
        ),
          t !== this.prevDegreeForVFD &&
            e !== this.prevForceForVFD &&
            ((this.prevDegreeForVFD = t),
            (this.prevForceForVFD = e),
            this.sendGameEvent({
              api: "setVelocityFromDegree",
              degree: t,
              force: e,
              maxSpeed: i
            }));
      }
    }.bind(this)),
    (this.setAccelerationFromDegree = function(t, e, i) {
      if (this.sprite.body) {
        var s = (t * Math.PI) / 180;
        this.game.physics.arcade.accelerationFromRotation(
          s,
          e * i,
          this.sprite.body.acceleration
        );
      }
    }.bind(this)),
    (this.startPen = function() {
      if (this.pen) this.pen.lineStyle(this.penSize, this.penColor, 1);
      else {
        var t = this.game.add.graphics(0, 0);
        (t.inputEnabled = !1),
          this.gameScene.spriteGroup.add(t),
          (t.z = this.sprite.z - 1);
        for (
          var e = this.gameScene.spriteGroup.children, i = t.z;
          i < e.length;
          i++
        )
          e[i].z = e[i].z + 1;
        this.gameScene.spriteGroup.sort("z", Phaser.Group.SORT_ASCENDING),
          (this.pen = t),
          this.pen.lineStyle(this.penSize, this.penColor, 1),
          this.pen.moveTo(this.sprite.position.x, this.sprite.position.y);
      }
    }.bind(this)),
    (this.endPen = function() {
      this.pen && (this.pen = void 0);
    }.bind(this)),
    (this.setPenColor = function(t) {
      void 0 !== t
        ? (HTML_Colors[t] && (t = HTML_Colors[t]),
          (t = t.replace("#", "0x")),
          (this.penColor = t),
          this.pen && this.pen.lineStyle(this.penSize, this.penColor, 1))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("setPenColor")
          );
    }.bind(this)),
    (this.setRandomPenColor = function() {
      var t = Object.keys(HTML_Colors),
        e = t[Math.floor(Math.random() * t.length)];
      this.setPenColor(HTML_Colors[e]);
    }.bind(this)),
    (this.getPenColor = function() {
      if (this.pen) {
        var t = String(this.pen.lineColor);
        return (t = t.replace("0x", "#"));
      }
    }),
    (this.setPenSize = function(t) {
      void 0 !== t
        ? ((this.penSize = t),
          this.pen && this.pen.lineStyle(this.penSize, this.penColor, 1))
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("setPenSize")
          );
    }.bind(this)),
    (this.getPenSize = function() {
      return this.penSize;
    }.bind(this)),
    (this.addPenSize = function(t) {
      void 0 !== t
        ? this.setPenSize(this.penSize + t)
        : this.errorHandler(
            ErrorType.PARAMETER_UNDEFINED,
            this.getErrorName("addPenSize")
          );
    }.bind(this)),
    (this.erasePen = function() {
      if (this.pen) {
        var t = this.pen.lineAlpha;
        this.pen.clear(),
          this.pen.destroy(),
          (this.pen = void 0),
          t && this.startPen();
      }
    }.bind(this)),
    (this.saveScore = function(t) {
      this.sendMessageToParent({ type: "saveScore", data: t });
    }.bind(this)),
    (this.showRanking = function() {
      this.sendMessageToParent({ type: "showRanking" });
    }.bind(this)),
    (this.showRankingAscending = function() {
      this.sendMessageToParent({ type: "showRankingAscending" });
    }.bind(this)),
    (this.hideRanking = function() {
      this.sendMessageToParent({ type: "hideRanking" });
    }.bind(this)),
    (this.vibrate = function() {
      this.sendMessageToParent({ type: "vibrate" });
    }.bind(this)),
    (this.onGyro = function(t) {
      (this.onGyroListener = t), this.sendMessageToParent({ type: "onGyro" });
    }.bind(this)),
    (this.startListening = function() {
      this.sendMessageToParent({ type: "startListening" });
    }.bind(this)),
    (this.onListening = function(t) {
      this.onListeningListener = t;
    }.bind(this)),
    (this.onShake = function(t) {
      this.sendMessageToParent({ type: "onShake" }), (this.onShakeListener = t);
    }.bind(this)),
    (this.translate = function(t, e, i) {
      var s = { text: t, lang: e };
      fetch(TRANSLATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s)
      })
        .then(function(t) {
          return t.json();
        })
        .then(function(t) {
          i(t.text);
        });
    }),
    (this.speak = function(t) {
      this.sendMessageToParent({ type: "speak", data: t });
    }.bind(this)),
    (this.openCamera = function(t) {
      if (
        this.asset &&
        "component" === this.asset.type &&
        "camera" === this.asset.subtype
      ) {
        var e =
            ((this.sprite.x - this.getWidth() / 2) / this.getWorldWidth()) *
            100,
          i =
            ((this.sprite.y - this.getHeight() / 2) / this.getWorldHeight()) *
            100,
          s = (this.getWidth() / this.getWorldWidth()) * 100;
        "back" !== t && (t = "front"),
          this.sendMessageToParent({
            type: "openCamera",
            data: { x: e, y: i, width: s, facing: t }
          });
      }
    }.bind(this)),
    (this.closeCamera = function() {
      this.asset &&
        "component" == this.asset.type &&
        "camera" == this.asset.subtype &&
        this.sendMessageToParent({ type: "closeCamera" });
    }.bind(this)),
    (this.switchCamera = function() {
      this.asset &&
        "component" == this.asset.type &&
        "camera" == this.asset.subtype &&
        this.sendMessageToParent({ type: "switchCamera" });
    }.bind(this)),
    (this.onFaceDetect = function(t) {
      this.asset &&
        "component" == this.asset.type &&
        "camera" == this.asset.subtype &&
        (this.onFaceDetectListener = t);
    }.bind(this)),
    (this.loadGameData = function(t) {
      (this.onLoadGameDataListener = t),
        this.loadTimer && clearTimeout(this.loadTimer),
        (this.loadTimer = setTimeout(
          function() {
            this.sendMessageToParent({ type: "loadGameData" });
          }.bind(this),
          1e3
        ));
    }.bind(this)),
    (this.saveGameData = function(t) {
      (this.onSaveGameDataListener = t),
        this.saveTimer && clearTimeout(this.saveTimer),
        (this.saveTimer = setTimeout(
          function() {
            this.sendMessageToParent({
              type: "saveGameData",
              data: JSON.stringify(serverData)
            });
          }.bind(this),
          1e3
        ));
    }.bind(this)),
    (this.resetGameData = function(t) {
      (this.onResetGameDataListener = t),
        this.sendMessageToParent({ type: "resetGameData" });
    }.bind(this)),
    (this.server = {
      data: serverData,
      load: this.loadGameData,
      save: this.saveGameData,
      reset: this.resetGameData
    }),
    (this.socket = {
      connect: function(t) {
        this.socketManager.connect(t);
      }.bind(this),
      disconnect: function() {
        this.socketManager.disconnect();
      }.bind(this),
      isConnected: function() {
        return this.socketManager.isConnected();
      }.bind(this),
      emit: function(t) {
        this.socketManager.emit(t);
      }.bind(this),
      onReceive: function(t) {
        this.socketManager.onReceive = t;
      }.bind(this),
      getData: function(t) {
        this.socketManager.getData(t);
      }.bind(this),
      setData: function(t) {
        this.socketManager.setData(t);
      }.bind(this),
      joinRoom: function(t) {
        this.socketManager.joinRoom(t);
      }.bind(this),
      leaveRoom: function(t) {
        this.socketManager.leaveRoom(t);
      }.bind(this),
      emitRoom: function(t, e) {
        this.socketManager.emitRoom(t, e);
      }.bind(this)
    });
}
(WizSprite.prototype.setAnimations = function() {
  if (
    (this.type === SpriteType.PLAIN || this.type === SpriteType.SPRITE) &&
    this.asset.spriteAnimations
  ) {
    var t = this.asset.spriteAnimations,
      e = Object.keys(t);
    for (var i in e) {
      var s = e[i],
        r = t[s].frameRate,
        n = t[s].indexes;
      this.sprite.animations.add(s, n, r, !0);
    }
  }
}),
  (WizSprite.prototype.setBodySize = function() {
    if (this.type === SpriteType.PLAIN || this.type === SpriteType.SPRITE) {
      var t = this.asset.bodySize;
      t && this.sprite.body.setSize(t[0], t[1], t[2], t[3]);
    }
  }),
  (WizSprite.prototype.runCode = function() {
    var t = {
        cameraFollow: this.cameraFollow,
        fixToCamera: this.fixToCamera,
        moveForward: this.moveForward,
        moveX: this.moveX,
        moveY: this.moveY,
        turn: this.turn,
        turnToSprite: this.turnToSprite,
        turnToMousePointer: this.turnToMousePointer,
        setHorizontalFlip: this.setHorizontalFlip,
        setVerticalFlip: this.setVerticalFlip,
        setFlipX: this.setFlipX,
        setFlipY: this.setFlipY,
        getFlipX: this.getFlipX,
        getFlipY: this.getFlipY,
        setDegree: this.setDegree,
        getDegree: this.getDegree,
        setMoveSpeed: this.setMoveSpeed,
        getMoveSpeed: this.getMoveSpeed,
        goForward: this.goForward,
        goX: this.goX,
        goY: this.goY,
        goTo: this.goTo,
        goToSprite: this.goToSprite,
        goToMousePointer: this.goToMousePointer,
        goToRandom: this.goToRandom,
        setX: this.setX,
        setY: this.setY,
        getX: this.getX,
        getY: this.getY,
        moveTo: this.moveTo,
        moveToSprite: this.moveToSprite,
        moveToMousePointer: this.moveToMousePointer,
        moveToRandom: this.moveToRandom,
        setDraggable: this.setDraggable,
        getDraggable: this.getDraggable,
        say: this.say,
        stopSay: this.stopSay,
        playAnimation: this.playAnimation,
        stopAnimation: this.stopAnimation,
        getCurrentAnimation: this.getCurrentAnimation,
        setSize: this.setSize,
        addSize: this.addSize,
        getSize: this.getSize,
        show: this.show,
        hide: this.hide,
        bringToTop: this.bringToTop,
        getX: this.getX,
        getY: this.getY,
        getWidth: this.getWidth,
        getHeight: this.getHeight,
        setWidth: this.setWidth,
        setHeight: this.setHeight,
        getWorldWidth: this.getWorldWidth,
        getWorldHeight: this.getWorldHeight,
        getMousePointerX: this.getMousePointerX,
        getMousePointerY: this.getMousePointerY,
        shake: this.shake,
        flash: this.flash,
        clone: this.clone,
        isClickedSprite: this.isClickedSprite,
        isPressedKey: this.isPressedKey,
        isClickedMouse: this.isClickedMouse,
        isOverlapped: this.isOverlapped,
        onFrame: this.onFrame,
        onSignal: this.onSignal,
        sendSignal: this.sendSignal,
        onSwipe: this.onSwipe,
        onOut: this.onOut,
        onOutStage: this.onOutStage,
        changeScene: this.changeScene,
        kill: this.kill,
        revive: this.revive,
        wait: this.wait,
        print: this.print,
        input: this.input,
        onClick: this.onClick,
        onClickUp: this.onClickUp,
        onTouch: this.onTouch,
        onTouchUp: this.onTouchUp,
        onScreenClick: this.onScreenClick,
        onScreenClickUp: this.onScreenClickUp,
        onKey: this.onKey,
        onKeyUp: this.onKeyUp,
        getRandom: this.getRandom,
        abs: Math.abs,
        round: Math.round,
        ceil: Math.ceil,
        floor: Math.floor,
        pow: Math.pow,
        sqrt: Math.sqrt,
        log: Math.log,
        getName: this.getName,
        global: global,
        server: this.server,
        socket: this.socket,
        getSprite: this.getSprite,
        setCollideWorldBounds: this.setCollideWorldBounds,
        setCollideScene: this.setCollideWorldBounds,
        setCollision: this.setCollision,
        setCheckCollision: this.setCheckCollision,
        setCollideSide: this.setCollideSide,
        onOverlap: this.onOverlap,
        onOverlapOnce: this.onOverlapOnce,
        setImmovable: this.setImmovable,
        setMovable: this.setMovable,
        getMovable: this.getMovable,
        setMass: this.setMass,
        getMass: this.getMass,
        setGravityX: this.setGravityX,
        setGravityY: this.setGravityY,
        setVelocityX: this.setVelocityX,
        setVelocityY: this.setVelocityY,
        getVelocityX: this.getVelocityX,
        getVelocityY: this.getVelocityY,
        setVelocityFromDegree: this.setVelocityFromDegree,
        setAccelerationFromDegree: this.setAccelerationFromDegree,
        setBounceX: this.setBounceX,
        setBounceY: this.setBounceY,
        setAccelerationX: this.setAccelerationX,
        setAccelerationY: this.setAccelerationY,
        getGravityX: this.getGravityX,
        getGravityY: this.getGravityY,
        getVelocityX: this.getVelocityX,
        getVelocityY: this.getVelocityY,
        getBounceX: this.getBounceX,
        getBounceY: this.getBounceY,
        getAccelerationX: this.getAccelerationX,
        getAccelerationY: this.getAccelerationY,
        setText: this.setText,
        appendText: this.appendText,
        clearText: this.clearText,
        getText: this.getText,
        setTextColor: this.setTextColor,
        setRandomTextColor: this.setRandomTextColor,
        getTextColor: this.getTextColor,
        playSound: this.playSound,
        restartSound: this.restartSound,
        stopSound: this.stopSound,
        pauseSound: this.pauseSound,
        resumeSound: this.resumeSound,
        stopAllSounds: this.stopAllSounds,
        setSoundVolume: this.setSoundVolume,
        addSoundVolume: this.addSoundVolume,
        getSoundVolume: this.getSoundVolume,
        getYear: this.getYear,
        getMonth: this.getMonth,
        getDay: this.getDay,
        getHour: this.getHour,
        getMin: this.getMin,
        getSec: this.getSec,
        startTimer: this.startTimer,
        pauseTimer: this.pauseTimer,
        resumeTimer: this.resumeTimer,
        resetTimer: this.resetTimer,
        getTimer: this.getTimer,
        onJoystick: this.onJoystick,
        onDpad: this.onDpad,
        startPen: this.startPen,
        endPen: this.endPen,
        setPenColor: this.setPenColor,
        setRandomPenColor: this.setRandomPenColor,
        getPenColor: this.getPenColor,
        setPenSize: this.setPenSize,
        addPenSize: this.addPenSize,
        getPenSize: this.getPenSize,
        erasePen: this.erasePen,
        saveScore: this.saveScore,
        showRanking: this.showRanking,
        showRankingAscending: this.showRankingAscending,
        hideRanking: this.hideRanking,
        vibrate: this.vibrate,
        onGyro: this.onGyro,
        startListening: this.startListening,
        onListening: this.onListening,
        onShake: this.onShake,
        speak: this.speak,
        translate: this.translate,
        openCamera: this.openCamera,
        closeCamera: this.closeCamera,
        switchCamera: this.switchCamera,
        onFaceDetect: this.onFaceDetect
      },
      e = userDefinedFunction[this.gameScene.sceneId][this.originalName];
    if (
      ("function" == typeof e && e(t),
      (this.isCodeRun = !0),
      this.signalQueue.length > 0)
    ) {
      for (var i in this.signalQueue) {
        var s = this.signalQueue[i];
        this.onReceive(s);
      }
      this.signalQueue = [];
    }
  }),
  (WizSprite.prototype.getDistance = function(t, e, i, s) {
    var r = t - i,
      n = e - s;
    return Math.sqrt(r * r + n * n);
  }),
  (WizSprite.prototype.getTimeSec = function(t, e, i, s) {
    return this.getDistance(t, e, i, s) / this.speed / 10;
  }),
  (WizSprite.prototype.update = function() {
    if (
      (this.sayBgSprite &&
        this.saySprite &&
        (408 / 196 < this.saySprite.width / this.saySprite.height
          ? ((this.sayBgSprite.width = 1.2 * this.saySprite.width),
            (this.sayBgSprite.height = (this.saySprite.width / 408) * 196))
          : ((this.sayBgSprite.height = 1.2 * this.saySprite.height),
            (this.sayBgSprite.width = (this.saySprite.height / 196) * 408)),
        (this.sayBgSprite.x = this.sprite.x),
        this.sprite.body
          ? (this.sayBgSprite.y = this.sprite.y - this.sprite.body.height / 2)
          : (this.sayBgSprite.y = this.sprite.y - this.sprite.height / 2),
        this.sprite.body
          ? this.sprite.y + this.sprite.body.height / 2 <
              this.gameScene.world.bounds.height / 3 &&
            (this.sayBgSprite.y =
              this.sprite.y + this.sprite.body.height + this.sayBgSprite.height)
          : this.sprite.y + this.sprite.height / 2 <
              this.gameScene.world.bounds.height / 3 &&
            (this.sayBgSprite.y =
              this.sprite.y + this.sprite.height + this.sayBgSprite.height),
        this.sayBgSprite.x < this.sayBgSprite.width / 2
          ? (this.sayBgSprite.x = this.sayBgSprite.width / 2)
          : this.sayBgSprite.x >
              this.gameScene.world.bounds.width - this.sayBgSprite.width / 2 &&
            (this.sayBgSprite.x =
              this.gameScene.world.bounds.width - this.sayBgSprite.width / 2),
        this.sayBgSprite.y < this.sayBgSprite.height
          ? (this.sayBgSprite.y = this.sayBgSprite.height)
          : this.sayBgSprite.y > this.gameScene.world.bounds.height &&
            (this.sayBgSprite.y = this.gameScene.world.bounds.height),
        (this.saySprite.x = this.sayBgSprite.centerX),
        (this.saySprite.y = this.sayBgSprite.centerY),
        (this.sayBgSprite.visible = !0),
        (this.saySprite.visible = !0)),
      this.joystickCallback)
    )
      if (this.sprite.pad.stick.isDown) {
        var t = (180 * this.sprite.pad.stick.rotation) / Math.PI;
        this.joystickCallback(t, this.sprite.pad.stick.force),
          this.sendGameEvent({
            api: "onJoystick",
            degree: t,
            force: this.sprite.pad.stick.force
          });
      } else this.joystickCallback(0, 0);
    if (this.dpadCallback)
      if (this.sprite.pad.stick.isDown)
        switch (this.sprite.pad.stick.direction) {
          case Phaser.LEFT:
            this.dpadCallback("left");
            break;
          case Phaser.RIGHT:
            this.dpadCallback("right");
            break;
          case Phaser.UP:
            this.dpadCallback("up");
            break;
          case Phaser.DOWN:
            this.dpadCallback("down");
            break;
          default:
            this.dpadCallback("none");
        }
      else this.dpadCallback("none");
    this.pen &&
      (this.pen.lineStyle(this.penSize, this.penColor, 1),
      this.pen.lineTo(this.sprite.position.x, this.sprite.position.y));
  }),
  (WizSprite.prototype.onKeyRelease = function(t) {
    this.onKeyUpListener[t] &&
      (this.sendGameEvent({ api: "onKeyUp", key: t }),
      this.onKeyUpListener[t]());
  }),
  (WizSprite.prototype.onKeyDown = function(t) {
    this.onKeyListener[t] &&
      (this.sendGameEvent({ api: "onKey", key: t }), this.onKeyListener[t]());
  }),
  (WizSprite.prototype.onClicked = function() {
    (this.isClicked = !0),
      this.onClickListener &&
        (this.onClickListener(), this.sendGameEvent({ api: "onClick" }));
  }),
  (WizSprite.prototype.onClickedUp = function() {
    (this.isClicked = !1),
      this.onClickUpListener &&
        (this.onClickUpListener(), this.sendGameEvent({ api: "onClickUp" }));
  }),
  (WizSprite.prototype.onScreenClicked = function() {
    this.onScreenClickListener &&
      (this.onScreenClickListener(),
      this.sendGameEvent({ api: "onScreenClick" }));
  }),
  (WizSprite.prototype.onScreenClickedUp = function() {
    this.onScreenClickUpListener && this.onScreenClickUpListener();
  }),
  (WizSprite.prototype.onReceive = function(t) {
    this.isCodeRun
      ? this.signalReceiver[t] && this.signalReceiver[t]()
      : this.signalQueue.push(t);
  }),
  (WizSprite.prototype.onSlide = function(t) {
    this.swipeHandler[t] && this.swipeHandler[t]();
  }),
  (WizSprite.prototype.getErrorName = function(t) {
    return {
      sceneId: this.game.state.current,
      spriteId: this.spriteName,
      api: t
    };
  }),
  (WizSprite.prototype.calculateAngle = function(t, e) {
    var i = t.y - e.y,
      s = e.x - t.x,
      r = (180 * Math.atan2(i, s)) / Math.PI;
    return r < 0 ? 360 + r : r;
  }),
  (WizSprite.prototype.sendMessageToParent = function(t) {
    t = JSON.stringify(t);
    try {
      window.app && window.app.onGameEvent(t),
        window.webkit &&
          window.webkit.messageHandlers.onGameEvent.postMessage({ payload: t }),
        parent.postMessage(
          { message: t, source: "wizlab", type: "gameEvent" },
          "*"
        );
    } catch (t) {
      console.log(t);
    }
  }),
  (WizSprite.prototype.onGyroChanged = function(t, e) {
    this.onGyroListener && this.onGyroListener(t, e);
  }),
  (WizSprite.prototype.onListeningResult = function(t) {
    this.onListeningListener && this.onListeningListener(t);
  }),
  (WizSprite.prototype.onShaked = function() {
    this.onShakeListener && this.onShakeListener();
  }),
  (WizSprite.prototype.onFaceDetected = function(t) {
    this.onFaceDetectListener && this.onFaceDetectListener(JSON.parse(t));
  }),
  (WizSprite.prototype.onSaveGameData = function() {
    this.onSaveGameDataListener && this.onSaveGameDataListener();
  }),
  (WizSprite.prototype.onResetGameData = function() {
    this.onResetGameDataListener &&
      ((this.server.data = serverData), this.onResetGameDataListener());
  }),
  (WizSprite.prototype.onLoadGameData = function() {
    this.onLoadGameDataListener &&
      ((this.server.data = serverData), this.onLoadGameDataListener());
  });
