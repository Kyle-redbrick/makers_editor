export const ACTION = {
  PROJECT_SET: "setProject",
  PROJECT_SET_TEMPLATE: "setTemplateProject",

  GAMEOBJECT_UPDATE_PROPERTY: "updateGameObjectProperty",
  GAMEOBJECT_REORDER: "reorderGameObject",
  GAMEOBJECT_ADD: "addGameObject",
  GAMEOBJECTS_REMOVE: "removeGameObjects",
  GAMEOBJECT_SELECT: "selectGameObject",

  SCENE_ADD: "addScene",
  SCENE_REMOVE: "removeScene",
  SCENE_RENAME: "renameScene",
  SCENE_SELECT: "selectScene",
  SELECT_STARTSCENE: "selectStartScene",
  SELECT_GIZMOTYPE: "selectGizmotype",

  SET_BABYLON_PREVIEW: "setBabylonPreview",
  SET_IS_CAMERA_VIEW_ON: "setIsCameraViewOn",
  SET_IS_PLAYING: "setIsPlaying",
  SET_IS_PUBLISH_ON: "setIsPublishOn",
  SET_IS_EDITOR_ON: "setIsEditorOn",
  SET_IS_API_ON: "setIsApiOn",
  SET_IS_OBJECTBOX_ON: "setIsObjectBoxOn",
  SET_IS_SOUNDBOX_ON: "setIsSoundBoxOn",
  SET_SHOW_SOUNDS: "setShowSounds",

  EDITORCAMERA_SET_TRANSFORM: "setEditorCameraTransform",

  SHOW_CONTEXTMENU: "showContextMenu",
  HIDE_CONTEXTMENU: "hideContextMenu",

  SOUND_PLAY: "playSound",
  SOUND_PAUSE: "pauseSound",
  SOUND_STOP: "stopSound",
  SOUND_ADD: "addSound",
  SOUND_REMOVE: "removeSound",

  SET_GAME_THUMBNAIL: "setGameThumbnail",
  SET_SCENE_THUMBNAIL: "setSceneThumbnail"
};

export const ASSET_CATEGORY = {
  MESH: "mesh",
  GUI: "gui",
  TEXTURE_GUI: "texture_gui",
  LIGHT: "light",
  CAMERA: "camera",
  SKYBOX: "skybox",
  COMPONENT: "component"
};

const { GAMEOBJECT, CAMERA, MESH, LIGHT } = window.BabylonConstant;

export const defaultJukebox = {
  isPlaying: false,
  path: null,
  type: null,
  id: null,
  listName: null
};

export const hexGround = {
  type: GAMEOBJECT.MESH,
  subtype: MESH.OBJ,
  path: "/babylon/textures/hex10/",
  filename: "Hex10.obj",
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 10, y: 2, z: 10 }
};

// const gameScene = {
//   editorCamera: {
//     target: { x: 0, y: 0, z: 0 },
//     position: { x: 10, y: 5, z: -10 }
//   },
//   gameObjectIds: [
//     "camera1",
//     "light1",
//     "skybox1",
//     "hexGround",
//     "sphere1",
//     "text1"
//   ],
//   gameObjects: {
//     camera1: {
//       id: "camera1",
//       name: "카메라",
//       type: GAMEOBJECT.CAMERA,
//       subtype: CAMERA.FOLLOW,
//       isActiveCamera: true,
//       position: { x: 0, y: 2, z: -8 },
//       rotation: { x: 10, y: 0, z: 0 },
//       isLocked: true
//     },
//     light1: {
//       id: "light1",
//       name: "직사광",
//       type: GAMEOBJECT.LIGHT,
//       position: { x: 0, y: 10, z: 0 },
//       direction: { x: -1, y: -1, z: 0 },
//       isLocked: true
//     },
//     skybox1: {
//       id: "skybox1",
//       name: "스카이박스",
//       type: GAMEOBJECT.SKYBOX,
//       texture: "/babylon/textures/blueSky/skybox",
//       size: 1000.0,
//       isLocked: true
//     },
//     sphere1: {
//       id: "sphere1",
//       name: "공",
//       ...JSON.parse(JSON.stringify(defaultSphere))
//     },
//     hexGround: {
//       id: "hexGround",
//       name: "육각형 땅",
//       type: GAMEOBJECT.MESH,
//       subtype: MESH.OBJ,
//       path: "/babylon/textures/hex10/",
//       filename: "Hex10.obj",
//       position: { x: 0, y: 0, z: 0 },
//       rotation: { x: 0, y: 0, z: 0 },
//       scale: { x: 10, y: 2, z: 10 }
//     },
//     text1: {
//       id: "text1",
//       name: "박스 따라다니는 텍스트",
//       parentId: "sphere1",
//       type: GAMEOBJECT.TEXTURE_GUI,
//       subtype: GUI.TEXT,
//       width: "100px",
//       height: "100px",
//       position: { x: 1.2, y: 1, z: 0 },
//       rotation: { x: 0, y: 0, z: 24 },
//       scale: { x: 1, y: 1, z: 1 },
//       color: "black",
//       background: "white",
//       text: "안녕 난 공",
//       fontSize: 70
//     }
//   }
// };
// export const defaultScene = gameScene;

// export const sampleSceneWithMaterials = {
//   materials: {
//     mat1: {
//       id: "mat1",g
//       name: "매트",
//       diffuse: "#123456",
//       specular: "#123456",
//       emissive: "#123456",
//       ambient: "#123456"
//     }
//   },
//   gameObjects: {
//     box1: {
//       id: "box1",
//       name: "박스",
//       type: GAMEOBJECT.MESH,
//       subtype: MESH.BOX,
//       materialId: "mat1"
//     }
//   }
// };

export const defaultScene = {
  editorCamera: {
    target: { x: 0, y: 0, z: 0 },
    position: { x: 10, y: 5, z: -10 }
  },
  soundIds: [],
  gameObjectIds: ["camera1", "light1", "box1", "ground1"],
  gameObjects: {
    camera1: {
      id: "camera1",
      name: "카메라",
      type: GAMEOBJECT.CAMERA,
      subtype: CAMERA.FOLLOW,
      isActiveCamera: true,
      position: { x: 0, y: 2, z: -8 },
      rotation: { x: 10, y: 0, z: 0 },
      isLocked: true,
      thumbPath: require("./AssetLibrary/defaultThumbs/camera_follow.svg")
    },
    light1: {
      id: "light1",
      name: "직사광",
      type: GAMEOBJECT.LIGHT,
      subtype: LIGHT.DIRECTIONAL,
      direction: { x: 0, y: -1, z: 0 },
      intensity: 1,
      thumbPath: require("./AssetLibrary/defaultThumbs/light_directional.svg")
    },
    box1: {
      id: "box1",
      name: "박스",
      type: GAMEOBJECT.MESH,
      subtype: MESH.BOX,
      position: { x: 0, y: 0.5, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      thumbPath: require("./AssetLibrary/defaultThumbs/box.png")
    },
    ground1: {
      id: "ground1",
      name: "평면",
      type: GAMEOBJECT.MESH,
      subtype: MESH.GROUND,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 10, y: 10, z: 10 },
      thumbPath: require("./AssetLibrary/defaultThumbs/ground.png")
    }
  }
};
