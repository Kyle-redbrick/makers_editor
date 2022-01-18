import { ActionType } from "../../../../Common/Util/Constant";
const {
  SET_PROJECT,
  SET_TEMPLATE,
  RESET_PROJECT,
  SET_IS_PLAYING,
  SET_SCREEN_MODE,
  SET_GAME_VOLUME
} = ActionType;

export const setIsPlaying = isPlaying => ({
  type: SET_IS_PLAYING,
  isPlaying: isPlaying
});

export const setScreenMode = screenMode => ({
  type: SET_SCREEN_MODE,
  screenMode
});

export const setGameVolume = volume => ({
  type: SET_GAME_VOLUME,
  volume
});

const initialState = {
  isPlaying: false,
  isFullScreen: false,
  screenMode: "HORIZONTAL",
  volume: localStorage.getItem("game_volume") || 100
};

const preview = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PROJECT:
      return initialState;
    case SET_PROJECT:
    case SET_TEMPLATE:
      const preview = action.project.state && action.project.state.preview;
      if (preview) {
        return { ...state, screenMode: preview.screenMode };
      } else {
        return state;
      }
    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.isPlaying
      };
    case SET_SCREEN_MODE:
      return {
        ...state,
        screenMode: action.screenMode
      };
    case SET_GAME_VOLUME:
      localStorage.setItem("game_volume", action.volume);
      return {
        ...state,
        volume: action.volume
      };
    default:
      return state;
  }
};

export default preview;
