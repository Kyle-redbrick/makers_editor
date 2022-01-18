import { ACTION, defaultJukebox } from "../../Util/Constant";

export const selectScene = sceneId => ({
  type: ACTION.SCENE_SELECT,
  payload: { sceneId }
});

export const selectGameObject = (sceneId, gameObjectId) => ({
  type: ACTION.GAMEOBJECT_SELECT,
  payload: { sceneId, gameObjectId }
});

export const selectGizmoType = gizmoType => ({
  type: ACTION.SELECT_GIZMOTYPE,
  payload: { gizmoType }
});

export const playSound = (id, path, time) => ({
  type: ACTION.SOUND_PLAY,
  payload: { id, path, time, isPlaying: true }
});

export const pauseSound = () => ({
  type: ACTION.SOUND_PAUSE,
  payload: { isPlaying: false }
});

export const stopSound = () => ({
  type: ACTION.SOUND_STOP
});

const initialState = {
  currentSceneId: null,
  currentGameObjectIds: {},
  currentGizmoType: window.BabylonConstant
    ? window.BabylonConstant.GIZMO.POSITION
    : "position",
  jukebox: { isPlaying: false }
};

const interaction = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION.PROJECT_SET:
    case ACTION.PROJECT_SET_TEMPLATE:
      return projectSet(state, payload);
    case ACTION.SCENE_SELECT:
      return { ...state, currentSceneId: payload.sceneId };
    case ACTION.GAMEOBJECT_SELECT:
      return gameObjectSelected(state, payload);
    case ACTION.SELECT_GIZMOTYPE:
      return { ...state, currentGizmoType: payload.gizmoType };
    case ACTION.SOUND_PLAY:
    case ACTION.SOUND_PAUSE:
      return jukeboxUpdated(state, payload)
    case ACTION.SOUND_STOP:
      return { ...state, jukebox: defaultJukebox };
    default:
      return state;
  }
};

function projectSet(prevState, payload) {
  const { project } = payload;
  if (!project.state || !project.state.interaction) {
    return prevState;
  }
  const nextState = { ...prevState, ...project.state.interaction };
  return nextState;
}

function gameObjectSelected(prevState, payload) {
  const { sceneId, gameObjectId } = payload;
  const newState = { ...prevState };
  const currentGameObjectIds = { ...newState.currentGameObjectIds };
  newState.currentGameObjectIds = currentGameObjectIds;
  currentGameObjectIds[sceneId] = gameObjectId;
  return newState;
}

function jukeboxUpdated(prevState, payload) {
  const newState = { ...prevState };
  const newJukebox = { ...prevState.jukebox, ...payload };
  newState.jukebox = newJukebox;
  return newState;
}

export default interaction;
