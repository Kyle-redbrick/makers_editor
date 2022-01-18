var global = {};
var serverData = {};

function Game(param) {
  var screenWidth = param.screenWidth;
  var screenHeight = param.screenHeight;
  var wrapperId = param.wrapperId;
  var scenes = param.scenes;
  var sceneIds = param.sceneIds;
  var soundIds = param.soundIds;
  var assets = param.assets;

  this.gameScenes = [];
  this.game = new Phaser.Game({
    width: screenWidth,
    height: screenHeight,
    renderer: Phaser.CANVAS,
    parent: wrapperId,
    transparent: false
  });

  //create scenes
  var fontFamilies = {};
  var fontText = "";
  for (var i = 0; i < sceneIds.length; i++) {
    var sceneId = sceneIds[i];
    var gameScene = new GameScene({
      game: this.game,
      sceneId: sceneId,
      spriteData: scenes[sceneId],
      soundIds: soundIds,
      assets: assets,
      scenes: scenes,
      isFirstScene: i === 0,
      screenWidth: screenWidth,
      screenHeight: screenHeight
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
