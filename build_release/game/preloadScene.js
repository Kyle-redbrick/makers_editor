function GameScene(param) {
  var game = param.game;
  var sceneId = param.sceneId;
  var spriteData = param.spriteData;
  var soundIds = param.soundIds;
  var assets = param.assets;

  this.game = game;
  this.sceneId = sceneId;
  this.spriteData = spriteData.sprites;
  this.spriteDataIds = spriteData.spriteIds;
  this.soundIds = soundIds;
  this.assets = assets;
  this.scenes = param.scenes;
  this.screenWidth = param.screenWidth;
  this.screenHeight = param.screenHeight;
  this.alphaImage =
    "https://s3.ap-northeast-2.amazonaws.com/wizschool-assets/sprite/alpha.png";
}

GameScene.prototype.preload = function() {
  this.game.load.onLoadStart.add(this.loadStart, this);
  this.game.load.onLoadComplete.add(this.loadComplete, this);
  this.game.load.crossOrigin = "anonymous";

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
};

GameScene.prototype.loadStart = function() {
  this.loadStartTime = new Date().getTime();
};

GameScene.prototype.loadComplete = function() {
  console.log(new Date().getTime() - this.loadStartTime);
};
