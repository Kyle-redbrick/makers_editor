import {
  ActionType,
  DEFAULT_VIDEO_URL
} from "../../../../Common/Util/Constant";
const { SET_VIDEO_URL, SET_PROJECT, SET_SCREEN_MODE } = ActionType;

export const setVideoURL = videoURL => ({
  type: SET_VIDEO_URL,
  videoURL
});

const initialState = {
  status: "STOP", // "PLAY", "PAUSE"
  videoURL: DEFAULT_VIDEO_URL,
  isFloating: false
};

const video = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        ...action.video
      };
    case SET_VIDEO_URL:
      return {
        ...state,
        videoURL: action.videoURL
      };
    case SET_SCREEN_MODE:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default video;
