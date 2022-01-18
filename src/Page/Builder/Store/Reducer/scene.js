import { ActionType, WORLD } from "../../../../Common/Util/Constant";

const {
  SET_PROJECT,
  SET_TEMPLATE,
  RESET_PROJECT,
  ADD_SCENE,
  COPY_SCENE,
  SET_WORLD_SIZE,
  ADD_SPRITES,
  ADD_SOUNDS,
  REMOVE_SOUND,
  REORDER_SPRITE,
  REMOVE_SPRITE,
  REMOVE_ALL_SPRITE,
  REMOVE_SCENE,
  REORDER_SCENE,
  SET_SPRITE_PREVIEW,
  SET_EDITOR_MODE,
  SET_SPRITE_CODE,
  SET_GLOBAL_VARIABLE,
  SET_SPRITE_BLOCKXML,
  LOCK_SPRITE,
  REMOVE_ALL_SOUND,
  SET_SCENE_PREVIEW,
  HIDE_LOCK_SPRITE,
  ADD_GLOBAL_VARIABLE,
  REMOVE_GLOBAL_VARIABLE
} = ActionType;

export const addSounds = soundInfos => ({
  type: ADD_SOUNDS,
  soundInfos: soundInfos
});

export const removeSound = soundId => ({
  type: REMOVE_SOUND,
  soundId: soundId
});

export const addSprites = (sceneId, spriteInfos) => ({
  type: ADD_SPRITES,
  sceneId: sceneId,
  spriteInfos: spriteInfos
});

export const reorderSprite = (sceneId, fromIndex, toIndex) => ({
  type: REORDER_SPRITE,
  sceneId: sceneId,
  fromIndex: fromIndex,
  toIndex: toIndex
});

export const removeSprite = (sceneId, spriteName) => ({
  type: REMOVE_SPRITE,
  sceneId: sceneId,
  spriteName: spriteName
});

export const removeAllSprite = sceneId => ({
  type: REMOVE_ALL_SPRITE,
  sceneId: sceneId
});

export const setEditorMode = (editorMode, scenes) => ({
  type: SET_EDITOR_MODE,
  editorMode: editorMode,
  scenes: scenes
});

export const setSpriteCode = (sceneId, spriteName, code) => ({
  type: SET_SPRITE_CODE,
  sceneId: sceneId,
  spriteName: spriteName,
  code: code
});

export const setGlobalVariable = (sceneId, spriteName, global) => ({
  type: SET_GLOBAL_VARIABLE,
  sceneId: sceneId,
  spriteName: spriteName,
  global: global
});

export const setSpriteBlockXml = (sceneId, spriteName, blockXml) => ({
  type: SET_SPRITE_BLOCKXML,
  sceneId: sceneId,
  spriteName: spriteName,
  blockXml: blockXml
});

export const setSpritePreview = (sceneId, spriteName, preview) => ({
  type: SET_SPRITE_PREVIEW,
  sceneId: sceneId,
  spriteName: spriteName,
  preview: preview
});

// create actions
export const addScene = (sceneId, sceneName) => ({
  type: ADD_SCENE,
  sceneId: sceneId,
  sceneName: sceneName
});

export const copyScene = (sceneId, sceneName, selectedSceneId) => ({
  type: COPY_SCENE,
  sceneId: sceneId,
  sceneName: sceneName,
  selectedSceneId: selectedSceneId
});

export const removeScene = sceneId => ({
  type: REMOVE_SCENE,
  sceneId: sceneId
});

export const reorderScene = (fromIndex, toIndex) => ({
  type: REORDER_SCENE,
  fromIndex: fromIndex,
  toIndex: toIndex
});

export const lockSprite = (sceneId, spriteName) => ({
  type: LOCK_SPRITE,
  sceneId: sceneId,
  spriteName: spriteName
});

export const hideLockSprite = (sceneId, isHide) => ({
  type: HIDE_LOCK_SPRITE,
  sceneId: sceneId,
  isHide: isHide
});
export const removeAllSound = () => ({
  type: REMOVE_ALL_SOUND
});

export const setScenePreview = (sceneId, preview) => ({
  type: SET_SCENE_PREVIEW,
  sceneId,
  preview
});

export const addGlobalVariable = name => ({
  type: ADD_GLOBAL_VARIABLE,
  name
});

export const removeGlobalVariable = name => ({
  type: REMOVE_GLOBAL_VARIABLE,
  name
});

export const setWorldSize = (sceneId, width, height) => ({
  type: SET_WORLD_SIZE,
  sceneId,
  width,
  height
});

// initialize states
// {
//   scenes: {
//     [sceneId]: {
//       sceneName: ...,
//       sprites: {
//         [spriteName]: {
//           type: ...,
//           assetId: ...,
//           code: ...,
//           preview: {...}
//         }
//       },
//       spriteIds: [...]
//     }
//   },
//   sceneIds: [...],
//   soundIds: [...],
// };

const initialState = {
  scenes: {},
  sceneIds: [],
  sounds: {},
  soundIds: []
};

const deleteByKey = (obj, deleteKey) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (key !== deleteKey) {
      return { ...acc, [key]: obj[key] };
    }
    return acc;
  }, {});
};

const changeOrder = (array, from, to) => {
  const movedItem = array.find((item, index) => index === from);
  const remainingItems = array.filter((item, index) => index !== from);
  return [
    ...remainingItems.slice(0, to),
    movedItem,
    ...remainingItems.slice(to)
  ];
};

const scene = (state = initialState, action) => {
  let nextState = {};

  switch (action.type) {
    case RESET_PROJECT:
      return initialState;
    case SET_PROJECT:
    case SET_TEMPLATE:
      let scene = action.project.state && action.project.state.scene;
      if (scene) {
        if (!scene.editorMode) scene.editorMode = "javascript";
        return {
          ...scene,
          timeStamp: new Date().getTime()
        };
      } else {
        return state;
      }
    case ADD_SOUNDS:
      let newSoundIds = [];
      action.soundInfos.forEach(info => {
        const { assetId } = info;
        if (!state.soundIds.includes(assetId)) {
          newSoundIds.push(assetId);
        }
      });
      return {
        ...state,
        soundIds: [...state.soundIds, ...newSoundIds]
      };
    case REMOVE_SOUND:
      return {
        ...state,
        soundIds: state.soundIds.filter(item => item !== action.soundId)
      };
    case ADD_SPRITES:
      const newSprites = {};
      const newSpriteIds = [];

      action.spriteInfos.forEach(info => {
        const { name, type, assetId } = info;
        const code = info.code ? info.code : "";
        const preview = info.preview ? info.preview : {};
        newSprites[name] = { type, assetId, code, preview };
        newSpriteIds.push(name);
      });

      nextState = {
        ...state,
        scenes: {
          ...state.scenes,
          [action.sceneId]: {
            ...state.scenes[action.sceneId],
            sprites: {
              ...state.scenes[action.sceneId].sprites,
              ...newSprites
            },
            spriteIds: [
              ...state.scenes[action.sceneId].spriteIds,
              ...newSpriteIds
            ]
          }
        }
      };
      return nextState;
    case REORDER_SPRITE:
      nextState = {
        ...state,
        scenes: {
          ...state.scenes,
          [action.sceneId]: {
            ...state.scenes[action.sceneId],
            spriteIds: changeOrder(
              state.scenes[action.sceneId].spriteIds,
              action.fromIndex,
              action.toIndex
            )
          }
        }
      };
      return nextState;
    case REORDER_SCENE:
      nextState = {
        ...state,
        sceneIds: changeOrder(state.sceneIds, action.fromIndex, action.toIndex)
      };
      return nextState;
    case REMOVE_SPRITE:
      nextState = {
        ...state,
        scenes: {
          ...state.scenes,
          [action.sceneId]: {
            ...state.scenes[action.sceneId],
            sprites: deleteByKey(
              state.scenes[action.sceneId].sprites,
              action.spriteName
            ),
            spriteIds: state.scenes[action.sceneId].spriteIds.filter(
              item => item !== action.spriteName
            )
          }
        }
      };
      return nextState;

    case REMOVE_ALL_SPRITE:
      nextState = {
        ...state,
        scenes: {
          ...state.scenes,
          [action.sceneId]: {
            ...state.scenes[action.sceneId],
            sprites: {},
            spriteIds: []
          }
        }
      };
      return nextState;
    case SET_EDITOR_MODE:
      if (action.scenes) {
        return {
          ...state,
          scenes: action.scenes,
          editorMode: action.editorMode
        };
      } else {
        return {
          ...state,
          editorMode: action.editorMode
        };
      }
    case SET_SPRITE_CODE:
      return {
        ...state,
        scenes: {
          ...state.scenes,
          [action.sceneId]: {
            ...state.scenes[action.sceneId],
            spriteIds: [...state.scenes[action.sceneId].spriteIds],
            sprites: {
              ...state.scenes[action.sceneId].sprites,
              [action.spriteName]: {
                ...state.scenes[action.sceneId].sprites[action.spriteName],
                code: action.code
              }
            }
          }
        }
      };
    case SET_GLOBAL_VARIABLE:
      return {
        ...state,
        scenes: {
          ...state.scenes,
          [action.sceneId]: {
            ...state.scenes[action.sceneId],
            global: action.global
          }
        }
      };
    case SET_SPRITE_BLOCKXML:
      return {
        ...state,
        scenes: {
          ...state.scenes,
          [action.sceneId]: {
            ...state.scenes[action.sceneId],
            spriteIds: [...state.scenes[action.sceneId].spriteIds],
            sprites: {
              ...state.scenes[action.sceneId].sprites,
              [action.spriteName]: {
                ...state.scenes[action.sceneId].sprites[action.spriteName],
                blockXml: action.blockXml
              }
            }
          }
        }
      };
    case SET_SPRITE_PREVIEW:
      if (!state.scenes[action.sceneId].sprites[action.spriteName]) {
        return state;
      }
      return {
        ...state,
        scenes: {
          ...state.scenes,
          [action.sceneId]: {
            ...state.scenes[action.sceneId],
            spriteIds: [...state.scenes[action.sceneId].spriteIds],
            sprites: {
              ...state.scenes[action.sceneId].sprites,
              [action.spriteName]: {
                ...state.scenes[action.sceneId].sprites[action.spriteName],
                preview: {
                  ...state.scenes[action.sceneId].sprites[action.spriteName]
                    .preview,
                  ...action.preview
                }
              }
            }
          }
        }
      };
    case REMOVE_SCENE:
      nextState = {
        ...state,
        scenes: deleteByKey(state.scenes, action.sceneId),
        sceneIds: state.sceneIds.filter(item => item !== action.sceneId)
      };
      return nextState;
    case ADD_SCENE:
      return {
        ...state,
        scenes: {
          ...state.scenes,
          [action.sceneId]: {
            sceneName: action.sceneName,
            worldWidth: WORLD.DEFAULT_WIDTH,
            worldHeight: WORLD.DEFAULT_HEIGHT,
            sprites: {},
            spriteIds: []
          }
        },
        sceneIds: [...state.sceneIds, action.sceneId]
      };
    case COPY_SCENE:
      const sceneToCopy = state.scenes[action.selectedSceneId];
      const newScene = JSON.parse(JSON.stringify(sceneToCopy));
      newScene.sceneName = [action.sceneId];
      return {
        ...state,
        scenes: {
          ...state.scenes,
          [action.sceneId]: newScene
        },
        sceneIds: [...state.sceneIds, action.sceneId]
      };
    case SET_WORLD_SIZE:
      let worldWidth = parseInt(action.width);
      let worldHeight = parseInt(action.height);
      return {
        ...state,
        scenes: {
          ...state.scenes,
          [action.sceneId]: {
            ...state.scenes[action.sceneId],
            worldWidth,
            worldHeight
          }
        }
      };

    case LOCK_SPRITE:
      nextState = {
        ...state,
        scenes: {
          ...state.scenes,
          [action.sceneId]: {
            ...state.scenes[action.sceneId],
            sprites: {
              ...state.scenes[action.sceneId].sprites,
              [action.spriteName]: {
                ...state.scenes[action.sceneId].sprites[action.spriteName],
                locked: state.scenes[action.sceneId].sprites[action.spriteName]
                  .locked
                  ? !state.scenes[action.sceneId].sprites[action.spriteName]
                      .locked
                  : true
              }
            }
          }
        }
      };
      return nextState;

    case REMOVE_ALL_SOUND:
      nextState = {
        ...state,
        soundIds: []
      };
      return nextState;
    case SET_SCENE_PREVIEW:
      return {
        ...state,
        scenes: {
          ...state.scenes,
          [action.sceneId]: {
            ...state.scenes[action.sceneId],
            preview: action.preview
          }
        }
      };
    case HIDE_LOCK_SPRITE:
      if (action.sceneId) {
        return {
          ...state,
          scenes: {
            ...state.scenes,
            [action.sceneId]: {
              ...state.scenes[action.sceneId],
              isHiddenLockSprites: action.isHide
            }
          }
        };
      } else {
        Object.keys(state.scenes).forEach(key => {
          const scene = state.scenes[key];
          scene.isHiddenLockSprites = action.isHide;
        });
        return { ...state };
      }
    case ADD_GLOBAL_VARIABLE:
      const globalVariables = state.globalVariables
        ? [...state.globalVariables]
        : [];
      if (globalVariables.indexOf(action.name) < 0) {
        globalVariables.push(action.name);
      }
      return { ...state, globalVariables };
    case REMOVE_GLOBAL_VARIABLE:
      if (state.globalVariables) {
        const globalVariables = [...state.globalVariables];
        const index = globalVariables.indexOf(action.name);
        globalVariables.splice(index, 1);
        return { ...state, globalVariables };
      } else {
        return { ...state };
      }
    default:
      return state;
  }
};

export default scene;
