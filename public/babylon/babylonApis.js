const ErrorType = {
  TYPEERROR: "TYPERROR",
  PARAMETER_INVALID_TYPE: "PARAMETER_INVALID_TYPE",
  PARAMETER_UNDEFINED: "PARAMETER_UNDEFINED",
  PARAMETER_NOT_FOUND: "PARAMETER_NOT_FOUND"
};

function getApis(gameObject) {
  return {
    enableDefaultControl: gameObject.enableDefaultControl,
    disableDefaultControl: gameObject.disableDefaultControl,
    getVirtualJoystick: gameObject.getVirtualJoystick,
    setSpeedX: gameObject.setSpeedX,
    setSpeedY: gameObject.setSpeedY,
    setSpeedZ: gameObject.setSpeedZ,
    getSpeedX: gameObject.getSpeedX,
    getSpeedY: gameObject.getSpeedY,
    getSpeedZ: gameObject.getSpeedZ,
    rotateX: gameObject.rotateX,
    rotateY: gameObject.rotateY,
    rotateZ: gameObject.rotateZ,
    goX: gameObject.goX,
    goY: gameObject.goY,
    goZ: gameObject.goZ,
    onFrame: gameObject.onFrame,
    sendSignal: gameObject.sendSignal,
    onSignal: gameObject.onSignal,
    onKey: gameObject.onKey,
    onKeyUp: gameObject.onKeyUp,
    onCollide: gameObject.onCollide,
    onCollideOnce: gameObject.onCollideOnce,
    onOverlap: gameObject.onOverlap,
    onOverlapOnce: gameObject.onOverlapOnce,
    changeScene: gameObject.changeScene,
    onClick: gameObject.onClick,
    wait: gameObject.wait,
    kill: gameObject.kill,
    revive: gameObject.revive,
    clone: gameObject.clone,
    input: gameObject.input,
    setScale: gameObject.setObjectScale,
    getScale: gameObject.getObjectScale,
    setUiText: gameObject.setUiText,
    setTextColor: gameObject.setTextColor,
    getTextColor: gameObject.getTextColor,
    setVisibility: gameObject.setVisibility,
    show: gameObject.show,
    hide: gameObject.hide,
    enablePhysics: gameObject.enablePhysics,
    enablePhysicsParams: gameObject.enablePhysicsParams,
    setMass: gameObject.setMass,
    setBounce: gameObject.setBounce,
    setFriction: gameObject.setFriction,
    getMass: gameObject.getMass,
    getBounce: gameObject.getBounce,
    getFriction: gameObject.getFriction,
    setVelocityX: gameObject.setVelocityX,
    setVelocityY: gameObject.setVelocityY,
    setVelocityZ: gameObject.setVelocityZ,
    getVelocityX: gameObject.getVelocityX,
    getVelocityY: gameObject.getVelocityY,
    getVelocityZ: gameObject.getVelocityZ,
    setAngularVelocityX: gameObject.setAngularVelocityX,
    setAngularVelocityY: gameObject.setAngularVelocityY,
    setAngularVelocityZ: gameObject.setAngularVelocityZ,
    getAngularVelocityX: gameObject.getAngularVelocityX,
    getAngularVelocityY: gameObject.getAngularVelocityY,
    getAngularVelocityZ: gameObject.getAngularVelocityZ,
    playSound: gameObject.playSound,
    restartSound: gameObject.restartSound,
    resumeSound: gameObject.resumeSound,
    stopAllSounds: gameObject.stopAllSounds,
    stopSound: gameObject.stopSound,
    pauseSound: gameObject.pauseSound,
    setGlobalSoundVolume: gameObject.setGlobalSoundVolume,
    addGlobalSoundVolume: gameObject.addGlobalSoundVolume,
    getGlobalSoundVolume: gameObject.getGlobalSoundVolume,
    setSoundVolume: gameObject.setSoundVolume,
    addSoundVolume: gameObject.addSoundVolume,
    getSoundVolume: gameObject.getSoundVolume,
    getDeltaTime: gameObject.getDeltaTime,
    startTimer: gameObject.startTimer,
    pauseTimer: gameObject.pauseTimer,
    resumeTimer: gameObject.resumeTimer,
    resetTimer: gameObject.resetTimer,
    getTimer: gameObject.getTimer,
    global: gameObject.game.global,
    getObject: gameObject.getObject,
    geteObjects: gameObject.getObjects,
    setTarget: gameObject.setTarget,
    setBillboard: gameObject.setBillboard
  };
}

function setGameApiFunctions(game) {
  game.global = {};

  game.HTML_Colors = {
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

  game.isInputVisible = false;
  window.onkeydown = function(e) {
    if(!game.isInputVisible){
      e.preventDefault();
    }
  }
  window.onkeypress = function(e) {
    if(!game.isInputVisible){
      e.preventDefault();
    }
  }
  game.showInputText = (title, callback) => {
    var inputTitle = document.getElementsByClassName("InputBox--title")[0];
      inputTitle.innerHTML =title ;
      var inputBox =  document.getElementsByClassName("InputBoxContainer")[0];
      inputBox.style.display ='block';
      var InputBoxInput =  document.getElementsByClassName("InputBox--input")[0];
      InputBoxInput.focus();
      InputBoxInput.select();
      game.inputCallback = callback;
      game.isInputVisible = true;
  }
  onInputKeyDown = e => {
    if(e.keyCode === 13) {
      e.stopPropagation();
      onclickInputConfirm();
    }
  }
  onInputCancel = () => {
    var inputBox = document.getElementsByClassName("InputBoxContainer")[0];
    inputBox.style.display = "none";
    game.inputCallback("");
    game.isInputVisible = false;
  }
  onInputConfirm = () => {
    var inputValue = document.getElementsByClassName("InputBox--input")[0].value;
    game.inputCallback(inputValue);
    var inputBox = document.getElementsByClassName("InputBoxContainer")[0];
    inputBox.style.display = "none";
    document.getElementsByClassName("InputBox--input")[0].value = "";
    game.isInputVisible = false;
  }
}

function setSceneApiFunctions(scene) {
  scene.keyDownCallbacks = {};
  scene.keyUpCallbacks = {};

  scene.getVirtualJoystick = isLeft => {
    if (isLeft) {
      if (!scene.leftVirtualJoystick) {
        scene.leftVirtualJoystick = new BabylonVirtualJoystick(true);
      }
      return scene.leftVirtualJoystick;
    } else {
      if (!scene.rightVirtualJoystick) {
        scene.rightVirtualJoystick = new BabylonVirtualJoystick(false);
      }
      return scene.rightVirtualJoystick;
    }
  };
  class BabylonVirtualJoystick {
    constructor(isLeft) {
      this.isLeft = isLeft;
      this.joystick = new BABYLON.VirtualJoystick(isLeft);
    }
    isPressed() {
      return this.joystick.pressed;
    }
    getDeltaPositionX() {
      return this.joystick.deltaPosition.x;
    }
    getDeltaPositionY() {
      return this.joystick.deltaPosition.y;
    }
  }

  scene.sendSignal = name => {
    for (const objId in scene.gameObjects) {
      scene.gameObjects[objId].signalQueue.push(name);
    }
  };

  scene.setKeyDownCallback = (key, objectId, func) => {
    if (!(key in scene.keyDownCallbacks)) {
      scene.keyDownCallbacks[key] = {};
    }
    scene.keyDownCallbacks[key][objectId] = func;

    if (!scene.keyDownAction) {
      const actionCode = evt => {
        if (!(evt.sourceEvent.key in scene.keyDownCallbacks)) {
          return;
        }
        const callbacks = scene.keyDownCallbacks[evt.sourceEvent.key];
        for (const id in callbacks) {
          if (scene.gameObjects[id] && !scene.gameObjects[id].killed) {
            callbacks[id]();
          }
        }
      };
      scene.keyDownAction = scene
        .getActionManager()
        .registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger,
            actionCode
          )
        );
    }
  };

  scene.setKeyUpCallback = (key, objectId, func) => {
    if (!(key in scene.keyUpCallbacks)) {
      scene.keyUpCallbacks[key] = {};
    }
    scene.keyUpCallbacks[key][objectId] = func;

    if (!scene.keyUpAction) {
      const actionCode = evt => {
        if (!(evt.sourceEvent.key in scene.keyUpCallbacks)) {
          return;
        }
        const callbacks = scene.keyUpCallbacks[evt.sourceEvent.key];
        for (const id in callbacks) {
          if (scene.gameObjects[id] && !scene.gameObjects[id].killed) {
            callbacks[id]();
          }
        }
      };
      scene.keyUpAction = scene
        .getActionManager()
        .registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            actionCode
          )
        );
    }
  };

  scene.stopSounds = () => {
    if (scene.getSoundCount() === 0) {
      return;
    }
    for (const soundId in scene.sounds) {
      scene.sounds[soundId].stop();
    }
  };

  scene.addSoundVolume = (value) => {
    scene.setSoundVolume(scene.getSoundVolume() + value);
  };
}

function setApiFunctions(gameObject) {
  gameObject.game.errorPosted = false;

  gameObject.handleError = (errorType, apiName) => {
    if (gameObject.game.errorPosted) {
      return;
    }
    gameObject.game.errorPosted = true;
    const errorHandler = gameObject.game.getErrorHandler();
    if (errorHandler) {
      errorHandler(errorType, {
        sceneName: gameObject.scene.name,
        gameObjectName: gameObject.name,
        api: apiName
      });
    }
  };

  gameObject.enableDefaultControl = (rotationSpeed, maxJump) => {
    if (gameObject instanceof BabylonMesh) {
      if (rotationSpeed && isNaN(rotationSpeed)) {
        gameObject.handleError(
          ErrorType.PARAMETER_INVALID_TYPE,
          "rotationSpeed"
        );
        return;
      }
      if (maxJump && isNaN(maxJump)) {
        gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "maxJump");
        return;
      }

      if (rotationSpeed) {
        gameObject.setControlOption("rotationSpeed", rotationSpeed);
      }
      if (maxJump) {
        gameObject.setControlOption("maxJump", maxJump);
      }
      gameObject.attachDefaultControl(true);
    }
  };

  gameObject.disableDefaultControl = () => {
    if (gameObject instanceof BabylonMesh) {
      gameObject.attachDefaultControl(false);
    }
  };

  gameObject.getVirtualJoystick = isLeft => {
    return gameObject.scene.getVirtualJoystick(isLeft);
  };

  gameObject.setSpeedX = value => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (isNaN(value)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "setSpeedX");
      return;
    }
    gameObject.setSpeed(value);
  };
  gameObject.setSpeedY = value => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (isNaN(value)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "setSpeedY");
      return;
    }
    gameObject.setSpeed(undefined, value);
  };
  gameObject.setSpeedZ = value => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (isNaN(value)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "setSpeedZ");
      return;
    }
    gameObject.setSpeed(undefined, undefined, value);
  };

  gameObject.getSpeedX = () => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    return gameObject.getSpeed("x");
  };
  gameObject.getSpeedY = () => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    return gameObject.getSpeed("y");
  };
  gameObject.getSpeedZ = () => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    return gameObject.getSpeed("z");
  };

  gameObject.rotateX = amount => {
    if (isNaN(amount)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "rotateX");
      return;
    }
    if (
      gameObject instanceof BabylonMesh ||
      gameObject instanceof BabylonTextureGui
    ) {
      gameObject.gameObject.rotate(BABYLON.Axis.X, amount);
    }
  };

  gameObject.rotateY = amount => {
    if (isNaN(amount)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "rotateY");
      return;
    }
    if (
      gameObject instanceof BabylonMesh ||
      gameObject instanceof BabylonTextureGui
    ) {
      gameObject.gameObject.rotate(BABYLON.Axis.Y, amount);
    }
  };

  gameObject.rotateZ = amount => {
    if (isNaN(amount)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "rotateZ");
      return;
    }
    if (
      gameObject instanceof BabylonMesh ||
      gameObject instanceof BabylonTextureGui
    ) {
      gameObject.gameObject.rotate(BABYLON.Axis.Z, amount);
    }
  };

  gameObject.goX = amount => {
    if (!gameObject.gameObject.position) {
      return;
    }
    if (amount === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "goX");
      return;
    }
    if (isNaN(amount)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "goX");
      return;
    }
    gameObject.gameObject.position.x += amount;
  };
  gameObject.goY = amount => {
    if (!gameObject.gameObject.position) {
      return;
    }
    if (amount === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "goY");
      return;
    }
    if (isNaN(amount)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "goY");
      return;
    }
    gameObject.gameObject.position.y += amount;
  };
  gameObject.goZ = amount => {
    if (!gameObject.gameObject.position) {
      return;
    }
    if (amount === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "goZ");
      return;
    }
    if (isNaN(amount)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "goZ");
      return;
    }
    gameObject.gameObject.position.z += amount;
  };

  gameObject.onFrame = func => {
    gameObject.scene.addBeforeRenderObservable(func);
  };

  gameObject.sendSignal = name => {
    if (name === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "sendSignal");
      return;
    }
    gameObject.scene.sendSignal(name);
  };

  gameObject.onSignal = (name, callback) => {
    gameObject.signalReceiver[name] = callback;
  };

  gameObject.onKey = (key, func) => {
    if (key === undefined || func === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "onKey");
      return;
    }

    const babylonKey = gameObject.getBabylonKey(key);
    gameObject.scene.setKeyDownCallback(babylonKey, gameObject.id, func);
  };

  gameObject.onKeyUp = (key, func) => {
    if (key === undefined || func === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "onKeyUp");
      return;
    }

    const babylonKey = gameObject.getBabylonKey(key);
    gameObject.scene.setKeyUpCallback(babylonKey, gameObject.id, func);
  };

  gameObject.getBabylonKey = key => {
    switch (key) {
      case "left":
        return "ArrowLeft";
      case "right":
        return "ArrowRight";
      case "up":
        return "ArrowUp";
      case "down":
        return "ArrowDown";
      case "space":
        return " ";
      case "esc":
        return "Escape";
      default:
        return key;
    }
  };

  gameObject.onCollide = (names, func) => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (names === undefined || func === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "onCollide");
      return;
    }

    const targets = gameObject.scene.getGameObjectsWithName(names);
    return gameObject.registerOnPhysicsCollide(targets, func);
  };

  gameObject.onCollideOnce = (names, func) => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (names === undefined || func === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "onCollideOnce");
      return;
    }

    const targets = gameObject.scene.getGameObjectsWithName(names);
    const callback = () => {
      func();
      gameObject.unregisterOnPhysicsCollide(targets, callback);
    };
    return gameObject.registerOnPhysicsCollide(targets, callback);
  };

  gameObject.onOverlap = (names, func) => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (names === undefined || func === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "onOverlap");
      return;
    }

    const targets = gameObject.scene.getGameObjectsWithName(names);
    gameObject.scene.addBeforeRenderObservable(() => {
      targets.forEach(target => {
        if (gameObject.gameObject.intersectsMesh(target.gameObject, false)) {
          func();
        }
      });
    });
  };

  gameObject.onOverlapOnce = (names, func) => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (names === undefined || func === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "onOverlapOnce");
      return;
    }

    const targets = gameObject.scene.getGameObjectsWithName(names);
    gameObject.scene.scene.onBeforeRenderObservable.addOnce(() => {
      targets.forEach(target => {
        if (gameObject.gameObject.intersectsMesh(target.gameObject, false)) {
          func();
        }
      });
    });
  };

  gameObject.changeScene = name => {
    if (name === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "changeScene");
      return;
    }

    const changed = gameObject.game.changeSceneWithName(name);
    if (!changed) {
      gameObject.handleError(ErrorType.PARAMETER_NOT_FOUND, "changeScene");
    }
  };

  gameObject.onClick = func => {
    if (func === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "onClick");
      return;
    }
    if (
      gameObject instanceof BabylonGui ||
      gameObject instanceof BabylonTextureGui ||
      gameObject instanceof BabylonMesh
    ) {
      gameObject.addOnClickListener(func);
    }
  };

  gameObject.wait = secs => {
    if (secs === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "wait");
      return;
    }
    if (isNaN(secs)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "wait");
      return;
    }
    if (secs === 0) {
      return;
    }

    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, secs * 1000);
    });
  };

  gameObject.kill = () => {
    if (
      gameObject instanceof BabylonMesh ||
      gameObject instanceof BabylonTextureGui
    ) {
      gameObject.enablePhysicsParams(false);
      gameObject.disableDefaultControl();
      gameObject.gameObject.setEnabled(false);
      gameObject.killed = true;
    } else if (gameObject instanceof BabylonGui) {
      gameObject.gameObject.hide();
      gameObject.killed = true;
    }
  };

  gameObject.revive = () => {
    if (
      gameObject instanceof BabylonMesh ||
      gameObject instanceof BabylonTextureGui
    ) {
      gameObject.gameObject.setEnabled(true);
      gameObject.enablePhysicsParams(true);
      gameObject.enableDefaultControl();
      gameObject.killed = false;
    } else if (gameObject instanceof BabylonGui) {
      gameObject.gameObject.show();
      gameObject.killed = false;
    }
  };

  gameObject.clone = () => {
    return new Promise(function(resolve) {
      if (
        gameObject instanceof BabylonMesh ||
        gameObject instanceof BabylonTextureGui
      ) {
        resolve(gameObject.getClone());
      }
    });
  };

  gameObject.input = message => {
    return new Promise(function(resolve) {
      gameObject.game.showInputText(message, function(value) {
        resolve(value);
      });
    });
  };

  gameObject.setObjectScale = (x, y, z) => {
    if (!gameObject.gameObject.scaling) {
      return;
    }
    if (x === undefined || y === undefined || z === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "setScale");
      return;
    }
    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "setScale");
      return;
    }
    gameObject.gameObject.scaling.x = x;
    gameObject.gameObject.scaling.y = y;
    gameObject.gameObject.scaling.z = z;
  };

  gameObject.getObjectScale = () => {
    if (gameObject.gameObject.scaling) {
      return gameObject.gameObject.scaling;
    }
  };

  gameObject.setUiText = text => {
    if (text === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "setUiText");
      return;
    }
    if (
      gameObject instanceof BabylonGui ||
      gameObject instanceof BabylonTextureGui
    ) {
      gameObject.setText(text.toString());
    }
  };

  gameObject.setTextColor = color => {
    if (color === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "setTextColor");
      return;
    }
    if (
      gameObject instanceof BabylonGui ||
      gameObject instanceof BabylonTextureGui
    ) {
      if (gameObject.game.HTML_Colors[color]) {
        color = gameObject.game.HTML_Colors[color];
      }
      gameObject.setGuiTextColor(color);
    }
  };

  gameObject.getTextColor = () => {
    if (
      gameObject instanceof BabylonGui ||
      gameObject instanceof BabylonTextureGui
    ) {
      return gameObject.getGuiTextColor();
    }
  };

  gameObject.setVisibility = visibility => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (0 > visibility || 1 < visibility) {
      return;
    }
    gameObject.gameObject.visibility = visibility;
  };

  gameObject.show = () => {
    if (gameObject instanceof BabylonGui) {
      gameObject.gameObject.isEnabled = true;
    } else if (gameObject instanceof BabylonTextureGui) {
      gameObject.gui.isEnabled = true;
    }
  };

  gameObject.hide = () => {
    if (gameObject instanceof BabylonGui) {
      gameObject.gameObject.isEnabled = false;
    } else if (gameObject instanceof BabylonTextureGui) {
      gameObject.gui.isEnabled = false;
    }
  };

  gameObject.enablePhysics = (mass, bounce, friction) => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }

    if (
      (mass && isNaN(mass)) ||
      (bounce && isNaN(bounce)) ||
      (friction && isNaN(friction))
    ) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "enablePhysics");
      return;
    }

    const _mass = mass !== undefined ? mass : 1;
    const _bounce = bounce !== undefined ? bounce : 0;
    const _friction = friction !== undefined ? friction : 0;
    gameObject.setPhysics(_mass, _bounce, _friction);
  };

  gameObject.enablePhysicsParams = enable => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (enable) {
      gameObject.restorePhysicsParams();
    } else {
      gameObject.resetPhysicsParams();
    }
  };

  gameObject.setMass = value => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (isNaN(value)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "setMass");
      return;
    }
    gameObject.setPhysicsParam("mass", value);
  };
  gameObject.setBounce = value => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (isNaN(value)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "setBounce");
      return;
    }
    gameObject.setPhysicsParam("restitution", value);
  };
  gameObject.setFriction = value => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (isNaN(value)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "setFriction");
      return;
    }
    gameObject.setPhysicsParam("friction", value);
  };
  gameObject.getMass = () => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    return gameObject.getPhysicsParam("mass");
  };
  gameObject.getBounce = () => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    return gameObject.getPhysicsParam("restitution");
  };
  gameObject.getFriction = () => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    return gameObject.getPhysicsParam("friction");
  };

  gameObject.setVelocityX = value => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (isNaN(value)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "setVelocityX");
      return;
    }
    gameObject.setVelocity("x", value);
  };
  gameObject.setVelocityY = value => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (isNaN(value)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "setVelocityY");
      return;
    }
    gameObject.setVelocity("y", value);
  };
  gameObject.setVelocityZ = value => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (isNaN(value)) {
      gameObject.handleError(ErrorType.PARAMETER_INVALID_TYPE, "setVelocityZ");
      return;
    }
    gameObject.setVelocity("z", value);
  };

  gameObject.getVelocityX = () => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    return gameObject.getVelocity("x");
  };
  gameObject.getVelocityY = () => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    return gameObject.getVelocity("y");
  };
  gameObject.getVelocityZ = () => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    return gameObject.getVelocity("z");
  };

  gameObject.setAngularVelocityX = value => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (isNaN(value)) {
      gameObject.handleError(
        ErrorType.PARAMETER_INVALID_TYPE,
        "setAngularVelocityX"
      );
      return;
    }
    gameObject.setAngularVelocity("x", value);
  };
  gameObject.setAngularVelocityY = value => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (isNaN(value)) {
      gameObject.handleError(
        ErrorType.PARAMETER_INVALID_TYPE,
        "setAngularVelocityY"
      );
      return;
    }
    gameObject.setAngularVelocity("y", value);
  };
  gameObject.setAngularVelocityZ = value => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    if (isNaN(value)) {
      gameObject.handleError(
        ErrorType.PARAMETER_INVALID_TYPE,
        "setAngularVelocityZ"
      );
      return;
    }
    gameObject.setAngularVelocity("z", value);
  };
  gameObject.getAngularVelocityX = () => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    return gameObject.getAngularVelocity("x");
  };
  gameObject.getAngularVelocityY = () => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    return gameObject.getAngularVelocity("y");
  };
  gameObject.getAngularVelocityZ = () => {
    if (!(gameObject instanceof BabylonMesh)) {
      return;
    }
    return gameObject.getAngularVelocity("z");
  };

  gameObject.setTarget = targetName => {
    if (!(gameObject instanceof BabylonFollowCamera)) {
      return;
    }
    if (targetName === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "setTarget");
      return;
    }

    const followCamera = gameObject.gameObject;
    const targetObject = gameObject.scene.getFirstGameObjectWithName(
      targetName
    );

    if (!targetObject) {
      return;
    }

    if (!(targetObject instanceof BabylonMesh)) {
      return;
    }

    followCamera.lockedTarget = targetObject.transformNode;
  };

  gameObject.setBillboard = (enable, axis) => {
    if (
      !(
        gameObject instanceof BabylonMesh ||
        gameObject instanceof BabylonTextureGui
      )
    ) {
      return;
    }

    if (!enable) {
      gameObject.setBillboardMode(BABYLON.Mesh.BILLBOARDMODE_NONE);
      return;
    }

    let mode;
    switch (axis) {
      case "x":
        mode = BABYLON.Mesh.BILLBOARDMODE_X;
        break;
      case "y":
        mode = BABYLON.Mesh.BILLBOARDMODE_Y;
        break;
      case "z":
        mode = BABYLON.Mesh.BILLBOARDMODE_Z;
        break;
      default:
        mode = BABYLON.Mesh.BILLBOARDMODE_ALL;
        break;
    }
    gameObject.setBillboardMode(mode);
  };

  gameObject.playSound = (name, isLoop) => {
    const sound = gameObject.scene.getSound(name);
    if (sound) {
      sound.setLoop(isLoop);
      sound.play();
    }
  };

  gameObject.restartSound = name => {
    const sound = gameObject.scene.getSound(name);
    if (sound) {
      sound.restart();
    }
  };

  gameObject.resumeSound = name => {
    const sound = gameObject.scene.getSound(name);
    if (sound) {
      sound.resume();
    }
  };

  gameObject.stopAllSounds = () => {
    gameObject.scene.stopSounds();
  };

  gameObject.stopSound = name => {
    const sound = gameObject.scene.getSound(name);
    if (sound) {
      sound.stop();
    }
  };

  gameObject.pauseSound = name => {
    const sound = gameObject.scene.getSound(name);
    if (sound) {
      sound.pause();
    }
  };

  gameObject.setGlobalSoundVolume = value => {
    gameObject.scene.setSoundVolume(value);
  };

  gameObject.addGlobalSoundVolume = value => {
    gameObject.scene.addSoundVolume(value);
  };

  gameObject.getGlobalSoundVolume = () => {
    return gameObject.scene.getSoundVolume();
  };

  gameObject.setSoundVolume = (name, value) => {
    const sound = gameObject.scene.getSound(name);
    if (sound) {
      sound.setVolume(value);
    }
  };

  gameObject.addSoundVolume = (name, value) => {
    const sound = gameObject.scene.getSound(name);
    if (sound) {
      sound.addVolume(value);
    }
  };

  gameObject.getSoundVolume = name => {
    const sound = gameObject.scene.getSound(name);
    return sound ? sound.getVolume() : -1;
  };

  gameObject.getDeltaTime = () => {
    return gameObject.game.engine.getDeltaTime() / 1000;
  };

  gameObject.startTimer = () => {
    gameObject.scene.startTimer();
  };

  gameObject.pauseTimer = () => {
    gameObject.scene.pauseTimer();
  };

  gameObject.resumeTimer = () => {
    gameObject.scene.resumeTimer();
  };

  gameObject.resetTimer = () => {
    gameObject.scene.resetTimer();
  };

  gameObject.getTimer = () => {
    return gameObject.scene.getTimer();
  };

  gameObject.getObject = name => {
    if (name === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "getObject");
      return;
    }
    return gameObject.scene.getFirstGameObjectWithName(name);
  };

  gameObject.getObjects = name => {
    if (name === undefined) {
      gameObject.handleError(ErrorType.PARAMETER_UNDEFINED, "getObjects");
      return;
    }
    return gameObject.scene.getGameObjectsWithName(name);
  };
}
