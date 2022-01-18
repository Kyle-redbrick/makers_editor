function GameScene(param) {
  var game = param.game;
  var screenMode = param.screenMode;
  var sceneId = param.sceneId;
  var spriteData = param.spriteData;
  var soundIds = param.soundIds;
  var errorHandler = param.errorHandler;
  var preloadHandler = param.preloadHandler;
  var assets = param.assets;
  var socketManager = param.socketManager;

  this.errorHandler = errorHandler;
  this.preloadHandler = preloadHandler;
  this.game = game;
  this.screenMode = screenMode;
  this.sceneId = sceneId;
  this.spriteData = spriteData.sprites;
  this.spriteDataIds = spriteData.spriteIds;
  this.soundIds = soundIds;
  this.assets = assets;
  this.scenes = param.scenes;
  this.isPreloaded = param.isFirstScene ? false : true;
  this.screenWidth = param.screenWidth;
  this.screenHeight = param.screenHeight;
  this.wideScreen = param.wideScreen;
  this.alphaImage =
    "https://s3.ap-northeast-2.amazonaws.com/wizschool-assets/sprite/alpha.png";
  this.socketManager = socketManager;

  this.sendGameEvent = function(event) {
    this.game.sendGameEvent(Object.assign({ sceneId: this.sceneId }, event));
  };

  this.figureDirection = function() {
    var distLimit = 150;
    var degRange = 60;
    var posDown = this.game.input.activePointer.positionDown;
    var posUp = this.game.input.activePointer.position;

    var deltaX = posUp.x - posDown.x;
    var deltaY = posUp.y - posDown.y;

    var rad = Math.atan2(deltaY, deltaX);
    var deg = rad * (180 / Math.PI);
    var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    var direction;
    if (distance < distLimit) {
      return undefined;
    }

    var degBase;
    degBase = -90;
    if (deg < degBase + degRange / 2 && deg >= degBase - degRange / 2) {
      direction = "up";
    }
    degBase = 90;
    if (deg < degBase + degRange / 2 && deg >= degBase - degRange / 2) {
      direction = "down";
    }
    degBase = 180;
    if (
      Math.abs(deg) < degBase + degRange / 2 &&
      Math.abs(deg) >= degBase - degRange / 2
    ) {
      direction = "left";
    }
    degBase = 0;
    if (deg < degBase + degRange / 2 && deg >= degBase - degRange / 2) {
      direction = "right";
    }

    return direction;
  };
}

GameScene.prototype.preload = function() {
  if (this.isPreloaded) {
    return;
  }
  this.game.load.onLoadStart.add(this.loadStart, this);
  this.game.load.onLoadComplete.add(this.loadComplete, this);

  this.isPreloaded = true;
  this.game.load.crossOrigin = "anonymous";

  //load default background
  this.game.load.image(
    "default_bg",
    "https://wizschool-assets.s3.ap-northeast-2.amazonaws.com/background/black_background.png"
  );

  //load say bg sprite
  this.game.load.image(
    "say_bg",
    "https://wizschool-assets.s3.ap-northeast-2.amazonaws.com/sprite/bubble.png"
  );

  var loadedIds = {};

  //load sprites
  for (var sceneId in this.scenes) {
    var scene = this.scenes[sceneId];
    var spriteDataIds = scene.spriteIds;
    var spriteData = scene.sprites;
    for (var i in spriteDataIds) {
      var id = spriteDataIds[i];
      var assetId = spriteData[id].assetId;
      if (loadedIds[assetId] === 1) {
        continue;
      }
      loadedIds[assetId] = 1;

      var sprite = this.assets.sprites[spriteData[id].assetId];
      if (spriteData[id].type !== SpriteType.TEXT) {
        if (spriteData[id].type === SpriteType.COMPONENT) {
          if (
            spriteData[id].preview.subtype === "analog" ||
            spriteData[id].preview.subtype === "dpad"
          ) {
            this.game.load.image(
              assetId + "_alpha",
              this.alphaImage + "?phaser=1"
            );
            this.load.atlas(
              assetId,
              sprite.spritePath + "?phaser=1",
              sprite.spritePath.replace(".png", ".json") + "?phaser=1"
            );
          } else if (spriteData[id].preview.subtype === "camera") {
            this.game.load.image(assetId, sprite.path + "?phaser=1");
          } else {
            this.game.load.image(assetId, this.alphaImage + "?phaser=1");
          }
        } else {
          if (sprite.spriteAnimations) {
            this.game.load.spritesheet(
              assetId,
              sprite.spritePath + "?phaser=1",
              sprite.spriteSize[0],
              sprite.spriteSize[1]
            );
          } else {
            this.game.load.image(assetId, sprite.path + "?phaser=1");
          }
        }
      }
    }
  }

  //load sounds
  if (this.soundIds) {
    for (var j in this.soundIds) {
      var soundId = this.soundIds[j];
      var sound = this.assets.sounds[soundId];
      this.game.load.audio(sound.defaultName, sound.path + "?phaser=1");
    }
  }

  //update volume on start
  if (this.game.isFromWizlab) {
    this.game.sound.volume =
      (this.game.gameVolume * this.game.systemVolume) / 100;
    this.game.stage.disableVisibilityChange = this.game.isFromWizlab;
  }
};

GameScene.prototype.loadStart = function() {
  try {
    hideGameAndShowLoading();
    this.loadInterval = setInterval(() => {
      updateLoadingProgress(this.game.load.progressFloat);
    }, 5);
  } catch (err) {}
  this.loadStartTime = new Date().getTime();
};

GameScene.prototype.loadComplete = function() {
  if (this.loadInterval) {
    clearInterval(this.loadInterval);
    this.loadInterval = undefined;
  }
  console.log(new Date().getTime() - this.loadStartTime);
};

GameScene.prototype.shutdown = function() {
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    if (wizSprite.sprite && wizSprite.sprite.pad) {
      wizSprite.sprite.pad.destroy();
    }
  }
};

GameScene.prototype.onPause = function() {
  if (this.isTimerRunning) {
    this.isTimerPausedByGame = true;
    this.pauseTimer();
  }
};

GameScene.prototype.onResume = function() {
  if (this.isTimerPausedByGame) {
    this.resumeTimer();
  }
};

GameScene.prototype.onUp = function() {
  if (!this.isInputDown) return;
  this.isInputDown = false;

  var direction = this.figureDirection();

  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    if (direction) wizSprite.onSlide(direction);
    wizSprite.onScreenClickedUp();
  }
};

GameScene.prototype.onDown = function() {
  this.isInputDown = true;
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    wizSprite.onScreenClicked();
  }
};

GameScene.prototype.create = function() {
  this.debugMode = false;
  this.wizSprites = [];
  this.overlapData = [];
  this.overlapOnceDataQueue = [];
  this.overlapOnceData = [];
  this.overlapDataQueue = [];
  this.collisionData = [];
  this.collisionDataQueue = [];
  this.sounds = {};
  this.clones = {};
  this.pressedKeys = {};
  this.updateFunctions = [];
  this.isInputDown = false;

  //timer
  this.timerStartedTime = 0;
  this.timerDuration = 0;
  this.timerPausedTime = 0;
  this.isTimerRunning = false;
  this.isTimerPausedByGame = false;

  this.xOffset = 0;
  this.yOffset = 0;
  var width;
  var height;

  if (this.wideScreen) {
    width = this.screenWidth;
    height = this.screenHeight;
  } else {
    width = this.screenMode === "HORIZONTAL" ? 1280 : 720;
    height = this.screenMode === "HORIZONTAL" ? 720 : 1280;
  }

  this.spriteGroup = this.game.add.group();
  if (this.wideScreen) {
    if (this.screenMode === "HORIZONTAL" && width !== 1280) {
      this.xOffset = (width - 1280) / 2;
      this.spriteGroup.position.x = this.xOffset;
    } else if (this.screenMode === "VERTICAL" && height !== 1280) {
      this.yOffset = (height - 1280) / 2;
      this.spriteGroup.position.y = this.yOffset;
    }
  }

  this.game.scale.setGameSize(width, height);
  this.game.renderer.renderSession.roundPixels = true;
  this.game.forceSingleUpdate = false;
  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.sound.touchLocked = false;

  if (this.preloadHandler) {
    this.preloadHandler();
    this.preloadHandler = null;
  }

  // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.input.keyboard.addCallbacks(
    this,
    this.onKeyDown,
    this.onKeyRelease,
    null
  );
  this.initSounds();
  this.drawDefaultBackground();
  this.drawSprites();
  if (this.game.didStartRender) {
    this.runAllSpriteCode();
  }

  this.game.onPause.add(this.onPause, this);
  this.game.onResume.add(this.onResume, this);

  this.game.input.onUp.add(this.onUp, this);
  this.game.input.onDown.add(this.onDown, this);
};

GameScene.prototype.update = function() {
  //handle onOverlap
  if (this.overlapDataQueue.length > 0) {
    this.popOverlapDataQueue();
  }
  for (var i in this.overlapData) {
    var data = this.overlapData[i];
    var overlapped = this.game.physics.arcade.overlap(
      data.target1,
      data.target2,
      null,
      null,
      this
    );
    if (overlapped) {
      var spriteId = data.target1.key;
      var targetSpriteId = data.target2[0].key;
      this.sendGameEvent({
        api: "onOverlap",
        spriteId: spriteId,
        name: targetSpriteId
      });
      data.callback();
    }
  }

  //handle onOverlapOnce
  if (this.overlapOnceDataQueue.length > 0) {
    this.popOverlapOnceDataQueue();
  }
  for (var i in this.overlapOnceData) {
    var data = this.overlapOnceData[i];
    var overlapped = this.game.physics.arcade.overlap(
      data.target1,
      data.target2,
      null,
      null,
      this
    );
    if (overlapped) {
      data.callback();
      this.overlapOnceData.splice(i, 1);
      break;
    }
  }

  //handle setCollison
  if (this.collisionDataQueue.length > 0) {
    this.popCollisionDataQueue();
  }

  for (var i in this.collisionData) {
    var data = this.collisionData[i];
    this.game.physics.arcade.collide(data.target1, data.target2);
  }

  for (var i in this.updateFunctions) {
    this.updateFunctions[i]();
  }

  for (var i in this.wizSprites) {
    this.wizSprites[i].update();
  }
};

GameScene.prototype.render = function() {
  if (!this.game.didStartRender) {
    this.game.didStartRender = true;
    this.firstRender();
  }
  if (!this.debugMode) {
    return;
  }
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    if (wizSprite.type !== SpriteType.BACKGROUND) {
      this.game.debug.body(wizSprite.sprite);
    }
  }
};

GameScene.prototype.firstRender = function() {
  try {
    updateLoadingProgress(100);
    setTimeout(() => {
      try {
        hideLoadingAndShowGame();
        this.runAllSpriteCode();
      } catch (e) {
        try {
          showGame();
        } catch (e) {
          this.runAllSpriteCode();
        }
        this.runAllSpriteCode();
      }
    }, 500);
  } catch (err) {
    this.runAllSpriteCode();
  }
};

GameScene.prototype.runAllSpriteCode = function() {
  for (var i in this.wizSprites) {
    var sprite = this.wizSprites[i];
    if (!sprite.isCloned) {
      sprite.runCode();
    }
  }
};

GameScene.prototype.initSounds = function() {
  if (this.soundIds) {
    for (var i in this.soundIds) {
      var id = this.soundIds[i];
      var sound = this.assets.sounds[id];
      this.sounds[sound.defaultName] = this.game.add.audio(sound.defaultName);
    }
  }
};

GameScene.prototype.drawDefaultBackground = function() {
  var sprite = this.game.add.tileSprite(
    0,
    0,
    this.game.world.bounds.width,
    this.game.world.bounds.height,
    "default_bg"
  );
  this.spriteGroup.add(sprite);
};

GameScene.prototype.drawSprites = function() {
  this.wizSprites = [];
  for (var i in this.spriteDataIds) {
    var key = this.spriteDataIds[i];
    var previewData = this.spriteData[key].preview;
    var codeData = this.spriteData[key].code;
    var wizSprite = this.drawSprite(previewData, codeData);
    this.wizSprites.push(wizSprite);
  }
};

GameScene.prototype.drawSprite = function(previewData, codeData, isClone) {
  var left = previewData.left;
  var top = previewData.top;
  var angle = previewData.angle;
  var scaleX = previewData.scaleX;
  var scaleY = previewData.scaleY;
  var opacity = previewData.opacity;
  var type = previewData.type;
  var subtype = previewData.subtype;
  var originalName = isClone ? previewData.originalName : previewData.name;
  var sprite;
  var assetId = this.spriteData[originalName].assetId;
  switch (type) {
    case SpriteType.PLAIN:
    case SpriteType.SPRITE:
    case SpriteType.CUSTOM:
      sprite = this.game.add.sprite(left, top, assetId);
      this.spriteGroup.add(sprite);
      break;
    case SpriteType.COMPONENT:
      if (subtype === "camera") {
        sprite = this.game.add.sprite(left, top, assetId);
      } else {
        sprite = this.game.add.sprite(0, 0, assetId + "_alpha");
      }

      if (subtype === "dpad") {
        sprite.pad = this.game.plugins.add(Phaser.VirtualJoystick);
        sprite.pad.stick = sprite.pad.addDPad(left, top, 200, assetId);
        sprite.pad.stick.scale = scaleX;
      } else if (subtype === "analog") {
        sprite.pad = this.game.plugins.add(Phaser.VirtualJoystick);
        sprite.pad.stick = sprite.pad.addStick(left, top, 200, assetId);
        sprite.pad.stick.scale = scaleX;
      }
      break;
    case SpriteType.BACKGROUND:
      var scene = this.scenes[this.sceneId];
      var worldWidth =
        scene.worldWidth || (this.screenMode === "HORIZONTAL" ? 1280 : 720);
      var worldHeight =
        scene.worldHeight || (this.screenMode === "HORIZONTAL" ? 720 : 1280);
      var imgWidth = this.game.cache.getImage(assetId).width;
      imgWidth = imgWidth < worldWidth ? worldWidth : imgWidth;
      var imgHeight = this.game.cache.getImage(assetId).height;
      imgHeight = imgHeight < worldHeight ? worldHeight : imgHeight;
      sprite = this.game.add.tileSprite(
        worldWidth / 2 - this.xOffset,
        worldHeight / 2 - this.yOffset,
        imgWidth,
        imgHeight,
        assetId
      );
      this.game.world.setBounds(0, 0, worldWidth, worldHeight);
      this.spriteGroup.add(sprite);
      break;
    case SpriteType.TEXT:
      var preview = this.spriteData[originalName].preview;
      var font = preview.fontSize + "px " + preview.fontFamily;
      var fill = preview.fontColor;
      var fontWeight = preview.fontWeight;
      var fontStyle = preview.fontStyle;
      var style = {
        font: font,
        fill: fill,
        fontWeight: fontWeight,
        fontStyle: fontStyle
      };
      sprite = this.game.add.text(left, top, preview.textValue, style);
      sprite.fontFamily = preview.fontFamily;
      this.spriteGroup.add(sprite);
      break;
    default:
      break;
  }
  sprite.angle = angle;
  sprite.scale.set(scaleX, scaleY);
  sprite.alpha = opacity;
  sprite.inputEnabled = opacity === 1 ? true : false;

  sprite.anchor.set(0.5);
  this.game.physics.arcade.enable(sprite);

  sprite.events.onInputDown.add(this.onClick, this);
  sprite.events.onInputUp.add(this.onClickUp, this);

  var name = previewData.name;
  sprite.key = name;

  var wizSprite = new WizSprite({
    game: this.game,
    type: type,
    subtype: subtype,
    sprite: sprite,
    codeData: codeData,
    gameScene: this,
    spriteName: name,
    originalName: originalName,
    asset: this.assets.sprites[this.spriteData[originalName].assetId],
    errorHandler: this.errorHandler,
    socketManager: this.socketManager
  });

  if (!this.clones[originalName]) {
    this.clones[originalName] = [];
  }
  this.clones[originalName].push(wizSprite.sprite);
  return wizSprite;
};

GameScene.prototype.cloneSprite = function(wizSprite) {
  var spriteName = wizSprite.spriteName;
  var originalName = wizSprite.originalName;
  var codeData = this.spriteData[originalName].code;
  var cloneName = originalName + "_clone_" + new Date().getTime();
  cloneName += "_" + this.clones[originalName].length;
  var previewData = this.spriteData[originalName].preview;
  previewData = JSON.parse(JSON.stringify(previewData)); //deep copy
  previewData.name = cloneName;
  previewData.originalName = originalName;
  previewData.masterName = spriteName;
  previewData.angle = wizSprite.sprite.angle;
  previewData.scaleX = wizSprite.sprite.scale.x;
  previewData.scaleY = wizSprite.sprite.scale.y;
  previewData.left = wizSprite.sprite.position.x;
  previewData.top = wizSprite.sprite.position.y;

  var sprite = this.drawSprite(previewData, codeData, true);

  //depth sorting
  sprite.sprite.z = wizSprite.sprite.z;
  this.spriteGroup.sort("z", Phaser.Group.SORT_ASCENDING);

  this.wizSprites.push(sprite);
  return sprite;
};

GameScene.prototype.isOverlapped = function(target1, target2Name) {
  var target2 = undefined;
  for (var j in this.wizSprites) {
    var wizSprite = this.wizSprites[j];
    if (wizSprite.originalName === target2Name) {
      if (this.clones[wizSprite.originalName]) {
        target2 = this.clones[wizSprite.originalName];
      } else {
        target2 = [wizSprite.sprite];
      }
    }
  }
  if (target1 && target2) {
    return this.game.physics.arcade.overlap(target1, target2, null, null, this);
  }
  return false;
};

GameScene.prototype.popOverlapDataQueue = function() {
  for (var i = this.overlapDataQueue.length - 1; i >= 0; i--) {
    var overlapData = this.overlapDataQueue[i];
    var spriteName = overlapData.spriteName;
    var targetSpriteName = overlapData.targetSpriteName;
    var callback = overlapData.callback;

    var target1 = undefined;
    var target2 = undefined;
    for (var j in this.wizSprites) {
      var wizSprite = this.wizSprites[j];
      if (wizSprite.spriteName === spriteName) {
        target1 = wizSprite.sprite;
      }
      if (wizSprite.originalName === targetSpriteName) {
        if (this.clones[wizSprite.originalName]) {
          target2 = this.clones[wizSprite.originalName];
        } else {
          target2 = [wizSprite.sprite];
        }
      }
    }
    if (target1 && target2) {
      this.overlapData.push({
        target1: target1,
        target2: target2,
        callback: callback
      });
      this.overlapDataQueue.splice(i, 1);
    }
  }
};

GameScene.prototype.popOverlapOnceDataQueue = function() {
  for (var i = this.overlapOnceDataQueue.length - 1; i >= 0; i--) {
    var overlapData = this.overlapOnceDataQueue[i];
    var spriteName = overlapData.spriteName;
    var targetSpriteName = overlapData.targetSpriteName;
    var callback = overlapData.callback;

    var target1 = undefined;
    var target2 = undefined;
    for (var j in this.wizSprites) {
      var wizSprite = this.wizSprites[j];
      if (wizSprite.spriteName === spriteName) {
        target1 = wizSprite.sprite;
      }
      if (wizSprite.originalName === targetSpriteName) {
        if (this.clones[wizSprite.originalName]) {
          target2 = this.clones[wizSprite.originalName];
        } else {
          target2 = [wizSprite.sprite];
        }
      }
    }
    if (target1 && target2) {
      this.overlapOnceData.push({
        target1: target1,
        target2: target2,
        callback: callback
      });
      this.overlapOnceDataQueue.splice(i, 1);
    }
  }
};

GameScene.prototype.popOverlapOnceDataQueue = function() {
  for (var i = this.overlapOnceDataQueue.length - 1; i >= 0; i--) {
    var overlapData = this.overlapOnceDataQueue[i];
    var spriteName = overlapData.spriteName;
    var targetSpriteName = overlapData.targetSpriteName;
    var callback = overlapData.callback;

    var target1 = undefined;
    var target2 = undefined;
    for (var j in this.wizSprites) {
      var wizSprite = this.wizSprites[j];
      if (wizSprite.spriteName === spriteName) {
        target1 = wizSprite.sprite;
      }
      if (wizSprite.originalName === targetSpriteName) {
        if (this.clones[wizSprite.originalName]) {
          target2 = this.clones[wizSprite.originalName];
        } else {
          target2 = [wizSprite.sprite];
        }
      }
    }
    if (target1 && target2) {
      this.overlapOnceData.push({
        target1: target1,
        target2: target2,
        callback: callback
      });
      this.overlapOnceDataQueue.splice(i, 1);
    }
  }
};

GameScene.prototype.popCollisionDataQueue = function() {
  for (var i = this.collisionDataQueue.length - 1; i >= 0; i--) {
    var collisionData = this.collisionDataQueue[i];
    var spriteName = collisionData.spriteName;
    var targetSpriteName = collisionData.targetSpriteName;

    var target1 = undefined;
    var target2 = undefined;
    for (var j in this.wizSprites) {
      var wizSprite = this.wizSprites[j];
      if (wizSprite.spriteName === spriteName) {
        target1 = wizSprite.sprite;
      }
      if (wizSprite.originalName === targetSpriteName) {
        if (this.clones[wizSprite.originalName]) {
          target2 = this.clones[wizSprite.originalName];
        } else {
          target2 = [wizSprite.sprite];
        }
      }
    }
    if (target1 && target2) {
      this.collisionData.push({ target1: target1, target2: target2 });
      this.collisionDataQueue.splice(i, 1);
    }
  }
};

GameScene.prototype.addOverlap = function(
  spriteName,
  targetSpriteName,
  callback
) {
  this.overlapDataQueue.push({
    spriteName: spriteName,
    targetSpriteName: targetSpriteName,
    callback: callback
  });
};

GameScene.prototype.addOverlapOnce = function(
  spriteName,
  targetSpriteName,
  callback
) {
  this.overlapOnceDataQueue.push({
    spriteName: spriteName,
    targetSpriteName: targetSpriteName,
    callback: callback
  });
};

GameScene.prototype.addCollision = function(spriteName, targetSpriteName) {
  this.collisionDataQueue.push({
    spriteName: spriteName,
    targetSpriteName: targetSpriteName
  });
};

GameScene.prototype.onKeyDown = function(e) {
  var key = convertKey(e.key);
  if (!this.pressedKeys[key]) {
    this.pressedKeys[key] = key;
  }
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    wizSprite.onKeyDown(key);
  }
};
GameScene.prototype.onKeyRelease = function(e) {
  var key = convertKey(e.key);
  if (this.pressedKeys[key]) {
    delete this.pressedKeys[key];
  }
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    wizSprite.onKeyRelease(key);
  }
};

GameScene.prototype.onClick = function(e) {
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    if (e.key === wizSprite.spriteName) {
      wizSprite.onClicked();
    }
  }
};
GameScene.prototype.onClickUp = function(e) {
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    if (e.key === wizSprite.spriteName) {
      wizSprite.onClickedUp();
    }
  }
};

GameScene.prototype.getSprite = function(spriteName) {
  for (var i = 0; i < this.wizSprites.length; i++) {
    if (this.wizSprites[i].spriteName === spriteName) {
      return this.wizSprites[i];
    }
  }
  return undefined;
};

GameScene.prototype.sendSignal = function(name) {
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    wizSprite.onReceive(name);
  }
};

GameScene.prototype.playSound = function(name, isLoop) {
  if (this.sounds[name]) {
    this.sounds[name].loop = isLoop;
    this.sounds[name].play();
  }
};

GameScene.prototype.restartSound = function(name) {
  if (this.sounds[name]) {
    this.sounds[name].restart();
  }
};

GameScene.prototype.stopSound = function(name) {
  if (this.sounds[name]) {
    this.sounds[name].stop();
  }
};

GameScene.prototype.pauseSound = function(name) {
  if (this.sounds[name]) {
    this.sounds[name].pause();
  }
};

GameScene.prototype.resumeSound = function(name) {
  if (this.sounds[name]) {
    this.sounds[name].resume();
  }
};

GameScene.prototype.hasSound = function(name) {
  if (this.sounds[name]) {
    return true;
  }
  return false;
};

GameScene.prototype.startTimer = function() {
  this.isTimerRunning = true;
  this.timerStartedTime = new Date().getTime();
};
GameScene.prototype.pauseTimer = function() {
  this.timerPausedTime = new Date().getTime();
  this.isTimerRunning = false;
};
GameScene.prototype.resumeTimer = function() {
  if (!this.isTimerRunning) {
    this.timerStartedTime += new Date().getTime() - this.timerPausedTime;
    this.isTimerRunning = true;
  }
};
GameScene.prototype.resetTimer = function() {
  this.isTimerRunning = false;
  this.timerDuration = 0;
};
GameScene.prototype.getTimer = function() {
  if (this.isTimerRunning) {
    this.timerDuration = new Date().getTime() - this.timerStartedTime;
    this.timerDuration /= 1000;
    this.timerDuration = this.timerDuration.toFixed(1);
  } else {
  }
  return parseFloat(this.timerDuration);
};

GameScene.prototype.onGyroChanged = function(x, y) {
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    wizSprite.onGyroChanged(x, y);
  }
};

GameScene.prototype.onListeningResult = function(msg) {
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    wizSprite.onListeningResult(msg);
  }
};

GameScene.prototype.onShaked = function() {
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    wizSprite.onShaked();
  }
};

GameScene.prototype.onFaceDetect = function(faces) {
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    wizSprite.onFaceDetected(faces);
  }
};

GameScene.prototype.onSaveGameData = function() {
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    wizSprite.onSaveGameData();
  }
};

GameScene.prototype.onResetGameData = function() {
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    wizSprite.onResetGameData();
  }
};

GameScene.prototype.onLoadGameData = function() {
  for (var i in this.wizSprites) {
    var wizSprite = this.wizSprites[i];
    wizSprite.onLoadGameData();
  }
};
