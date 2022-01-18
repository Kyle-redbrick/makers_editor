// user interaction
import { ActionType } from "../../../../Common/Util/Constant";
const {
  SET_PROJECT,
  SET_TEMPLATE,
  RESET_PROJECT,
  PUBLISH_PROJECT,
  ADD_SPRITES,
  SELECT_SPRITE,
  SELECT_SCENE,
  REMOVE_SCENE,
  ADD_SCENE,
  COPY_SCENE,
  // jukebox related
  PLAY_SOUND,
  PAUSE_SOUND,
  STOP_SOUND,
  SET_IS_PLAYING,
  SET_SCREEN_MODE,
  REMOVE_ALL_SPRITE,
  SET_BTN_HIGHLIGHT,
  ADD_SOUNDS,
  SET_BLOCK_CATEGORY
} = ActionType;

export const selectSprite = (sceneId, spriteName, spriteType, from) => ({
  type: SELECT_SPRITE,
  sceneId: sceneId,
  spriteName: spriteName,
  spriteType: spriteType,
  from
});

export const selectScene = sceneId => ({
  type: SELECT_SCENE,
  sceneId: sceneId
});

export const playSound = jukeboxInfo => ({
  type: PLAY_SOUND,
  jukeboxInfo
});

export const pauseSound = () => ({
  type: PAUSE_SOUND
});

export const stopSound = () => ({
  type: STOP_SOUND
});

export const setBtnHighlight = buttonId => ({
  type: SET_BTN_HIGHLIGHT,
  buttonId
});

export const setBlockCategory = category => ({
  type: SET_BLOCK_CATEGORY,
  category
});

const deleteByKey = (obj, deleteKey) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (key !== deleteKey) {
      return { ...acc, [key]: obj[key] };
    }
    return acc;
  }, {});
};

const initialJukebox = {
  isPlaying: false,
  path: null,
  type: null,
  id: null,
  listName: null
};

const initialState = {
  selected: {
    objects: {},
    scene: "scene1",
    blockCategory: undefined
  },
  jukebox: {
    isPlaying: false
  },
  highlightBtnId: undefined,
  addSoundsTimeStamp: undefined,
  isPublished: undefined
};

const interaction = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PROJECT:
      return initialState;
    case SET_PROJECT:
    case SET_TEMPLATE:
      const interaction =
        action.project.state && action.project.state.interaction;
      if (interaction) {
        return { ...state, ...interaction };
      } else {
        return state;
      }
    case PUBLISH_PROJECT:
      return { ...state, isPublished: true };
    case ADD_SPRITES:
      const sprite = action.spriteInfos[action.spriteInfos.length - 1];
      return {
        ...state,
        selected: {
          ...state.selected,
          objects: {
            ...state.selected.objects,
            [action.sceneId]: {
              name: sprite.name,
              type: sprite.type
            }
          }
        }
      };
    case SELECT_SPRITE:
      return {
        ...state,
        selected: {
          ...state.selected,
          objects: {
            ...state.selected.objects,
            [action.sceneId]: {
              name: action.spriteName,
              type: action.spriteType
            }
          }
        }
      };
    case SELECT_SCENE:
      return {
        ...state,
        selected: {
          ...state.selected,
          scene: action.sceneId
        }
      };
    case ADD_SCENE:
      return {
        ...state,
        selected: {
          ...state.selected,
          objects: {
            ...state.selected.objects,
            [action.sceneId]: {}
          }
        }
      };
    case COPY_SCENE:
      return {
        ...state,
        selected: {
          ...state.selected,
          objects: {
            ...state.selected.objects,
            [action.sceneId]: {}
          }
        }
      };
    case REMOVE_SCENE:
      return {
        ...state,
        selected: {
          ...state.selected,
          objects: deleteByKey(state.selected.objects, action.sceneId)
        }
      };
    case PLAY_SOUND:
      return {
        ...state,
        jukebox: {
          ...state.jukebox,
          ...action.jukeboxInfo,
          isPlaying: true
        }
      };
    case PAUSE_SOUND:
      return {
        ...state,
        jukebox: {
          ...state.jukebox,
          isPlaying: false
        }
      };
    case STOP_SOUND:
    case SET_IS_PLAYING:
    case SET_SCREEN_MODE:
      // jukebox should be initialized via destructing assignment to make a shallow copy in this case.
      // Otherwise the initialJukebox, which has to keep the default value, could be mutated by this operation.
      return {
        ...state,
        jukebox: initialJukebox
      };
    case REMOVE_ALL_SPRITE:
      return {
        ...state,
        selected: {
          ...state.selected,
          objects: {
            ...state.selected.objects,
            [state.selected.scene]: { name: undefined, type: undefined }
          }
        }
      };
    case SET_BTN_HIGHLIGHT:
      return {
        ...state,
        highlightBtnId: action.buttonId
      };
    case ADD_SOUNDS:
      return {
        ...state,
        addSoundsTimeStamp: new Date().getTime()
      };
    case SET_BLOCK_CATEGORY:
      return {
        ...state,
        selected: { ...state.selected, blockCategory: action.category }
      };
    default:
      return state;
  }
};

export default interaction;
