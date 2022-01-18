import { ACTION } from "../../Util/Constant";

export const setBabylonPreview = babylonPreview => ({
  type: ACTION.SET_BABYLON_PREVIEW,
  payload: { babylonPreview }
});

export const setIsPlaying = isPlaying => ({
  type: ACTION.SET_IS_PLAYING,
  payload: { isPlaying }
});

export const setIsCameraViewOn = isCameraViewOn => ({
  type: ACTION.SET_IS_CAMERA_VIEW_ON,
  payload: { isCameraViewOn }
});

export const setIsMenuOn = isMenuOn => ({
  type: ACTION.SET_IS_MENU_ON,
  payload: { isMenuOn }
});

export const setIsPublishOn = isPublishOn => ({
  type: ACTION.SET_IS_PUBLISH_ON,
  payload: { isPublishOn }
});

export const setIsEditorOn = isEditorOn => ({
  type: ACTION.SET_IS_EDITOR_ON,
  payload: { isEditorOn }
});

export const setIsApiOn = isApiOn => ({
  type: ACTION.SET_IS_API_ON,
  payload: { isApiOn }
});

export const setIsObjectBoxOn = isObjectBoxOn => ({
  type: ACTION.SET_IS_OBJECTBOX_ON,
  payload: { isObjectBoxOn }
});

export const setIsSoundBoxOn = isSoundBoxOn => ({
  type: ACTION.SET_IS_SOUNDBOX_ON,
  payload: { isSoundBoxOn }
});

export const setShowSounds = isSoundsShowing => ({
  type: ACTION.SET_SHOW_SOUNDS,
  payload: { isSoundsShowing }
});

const initialState = {
  babylonPreview: null,
  isCameraViewOn: false,
  isPlaying: false,
  isPublishOn: false,
  isEditorOn: false,
  isApiOn: false,
  isObjectBoxOn: false,
  isSoundBoxOn: false,
  isSoundsShowing: false
};

const builder = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION.SET_BABYLON_PREVIEW:
      return { ...state, babylonPreview: payload.babylonPreview };
    case ACTION.SET_IS_CAMERA_VIEW_ON:
      return { ...state, isCameraViewOn: payload.isCameraViewOn };
    case ACTION.SET_IS_PLAYING:
      return { ...state, isPlaying: payload.isPlaying };
    case ACTION.SET_IS_PUBLISH_ON:
      return { ...state, isPublishOn: payload.isPublishOn };
    case ACTION.SET_IS_EDITOR_ON:
      return { ...state, isEditorOn: payload.isEditorOn };
    case ACTION.SET_IS_API_ON:
      return { ...state, isApiOn: payload.isApiOn };
    case ACTION.SET_IS_OBJECTBOX_ON:
      return { ...state, isObjectBoxOn: payload.isObjectBoxOn };
    case ACTION.SET_IS_SOUNDBOX_ON:
      return { ...state, isSoundBoxOn: payload.isSoundBoxOn };
    case ACTION.SET_SHOW_SOUNDS:
      return { ...state, isSoundsShowing: payload.isSoundsShowing };
    default:
      return state;
  }
};

export default builder;
