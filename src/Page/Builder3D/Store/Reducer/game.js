import { ACTION } from "../../Util/Constant";

export const addScene = scene => ({
  type: ACTION.SCENE_ADD,
  payload: { scene }
});

export const removeScene = sceneId => ({
  type: ACTION.SCENE_REMOVE,
  payload: { sceneId }
});

export const renameScene = (sceneId, sceneName) => ({
  type: ACTION.SCENE_RENAME,
  payload: { sceneId, sceneName }
});

export const selectStartScene = sceneId => ({
  type: ACTION.SELECT_STARTSCENE,
  payload: { sceneId }
});

export const addGameObject = (sceneId, gameObject) => ({
  type: ACTION.GAMEOBJECT_ADD,
  payload: { sceneId, gameObject }
});

export const removeGameObjects = (sceneId, gameObjectIds) => ({
  type: ACTION.GAMEOBJECTS_REMOVE,
  payload: { sceneId, gameObjectIds }
});

export const reorderGameObjects = (sceneId, gameObjectIds) => ({
  type: ACTION.GAMEOBJECT_REORDER,
  payload: { sceneId, gameObjectIds }
});

export const updateGameObjectProperty = (
  sceneId,
  gameObjectId,
  propertyId,
  value
) => ({
  type: ACTION.GAMEOBJECT_UPDATE_PROPERTY,
  payload: { sceneId, gameObjectId, propertyId, value }
});

export const setEditorCameraTransform = (sceneId, position, target) => ({
  type: ACTION.EDITORCAMERA_SET_TRANSFORM,
  payload: { sceneId, position, target }
});

export const addSound = (sceneId, sound) => ({
  type: ACTION.SOUND_ADD,
  payload: { sceneId, sound }
});

export const removeSound = (sceneId, soundId) => ({
  type: ACTION.SOUND_REMOVE,
  payload: { sceneId, soundId }
});

export const setGameThumbnail = thumbnail => ({
  type: ACTION.SET_GAME_THUMBNAIL,
  payload: { thumbnail }
});

export const setSceneThumbnail = (sceneId, thumbnail) => ({
  type: ACTION.SET_SCENE_THUMBNAIL,
  payload: { sceneId, thumbnail }
});

const initialState = {
  scenes: {},
  sceneIds: [],
  soundIds: [],
  startSceneId: null,
  thumbnail: null
};

const game = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION.PROJECT_SET:
    case ACTION.PROJECT_SET_TEMPLATE:
      return projectSet(state, payload);
    case ACTION.SCENE_ADD:
      return sceneAdded(state, payload);
    case ACTION.SCENE_REMOVE:
      return sceneRemoved(state, payload);
    case ACTION.SCENE_RENAME:
      return sceneRenamed(state, payload);
    case ACTION.SELECT_STARTSCENE:
      return { ...state, startSceneId: payload.sceneId };
    case ACTION.GAMEOBJECT_REORDER:
      return gameObjectReordered(state, payload);
    case ACTION.GAMEOBJECT_ADD:
      return gameObjectAdded(state, payload);
    case ACTION.GAMEOBJECTS_REMOVE:
      return gameObjectsRemoved(state, payload);
    case ACTION.GAMEOBJECT_UPDATE_PROPERTY:
      return gameObjectPropertyUpdated(state, payload);
    case ACTION.EDITORCAMERA_SET_TRANSFORM:
      return editorCameraTransformUpdated(state, payload);
    case ACTION.SOUND_ADD:
      return soundAdded(state, payload);
    case ACTION.SOUND_REMOVE:
      return soundRemoved(state, payload);
    case ACTION.SET_GAME_THUMBNAIL:
      return { ...state, thumbnail: payload.thumbnail };
    case ACTION.SET_SCENE_THUMBNAIL:
      return sceneThumbnailSet(state, payload);
    default:
      return state;
  }
};

function soundAdded(prevState, payload) {
  const { sceneId, sound } = payload;
  const { assetId } = sound;
  const newState = { ...prevState };
  const prevSoundIds = prevState.scenes[sceneId].soundIds;
  const newSceneSoundIds = prevSoundIds
    ? [...prevState.scenes[sceneId].soundIds]
    : [];
  if (!newSceneSoundIds.includes(assetId)) {
    newSceneSoundIds.push(assetId);
  }
  newState.scenes[sceneId].soundIds = newSceneSoundIds;
  const newSoundIds = prevState.soundIds ? [...prevState.soundIds] : [];
  if (!newSoundIds.includes(assetId)) {
    newSoundIds.push(assetId);
  }
  newState.soundIds = newSoundIds;
  return newState;
}

function soundRemoved(prevState, payload) {
  const { sceneId, soundId } = payload;
  const newState = { ...prevState };
  const prevSceneSoundIds = prevState.scenes[sceneId].soundIds;
  const newSceneSoundIds = prevSceneSoundIds
    ? prevSceneSoundIds.filter(item => item !== soundId)
    : [];
  newState.scenes[sceneId].soundIds = newSceneSoundIds;
  let inOtherScene = false;
  for (const id in newState.scenes) {
    if (id === sceneId) continue;
    const ids = newState.scenes[id].soundIds;
    if (ids && ids.includes(soundId)) {
      inOtherScene = true;
      break;
    }
  }
  if (!inOtherScene) {
    const newSoundIds = prevState.soundIds.filter(item => item !== soundId);
    newState.soundIds = newSoundIds;
  }
  return newState;
}

function projectSet(prevState, payload) {
  const { project } = payload;
  if (!project.state || !project.state.game) {
    return prevState;
  }
  const nextState = { ...prevState, ...project.state.game };
  const nextTimeStamp = new Date().getTime();
  nextState.timeStamp = nextTimeStamp;
  return nextState;
}

function sceneAdded(prevState, payload) {
  const nextState = { ...prevState };
  const { scene } = payload;
  const sceneId = scene.id;
  nextState.scenes[sceneId] = scene;
  const nextSceneIds = [...prevState.sceneIds];
  nextSceneIds.push(sceneId);
  nextState.sceneIds = nextSceneIds;
  return nextState;
}

function sceneRemoved(prevState, payload) {
  const nextState = { ...prevState };
  const { sceneId } = payload;
  delete nextState.scenes[sceneId];
  let index = nextState.sceneIds.indexOf(sceneId);
  if (index >= 0) {
    nextState.sceneIds.splice(index, 1);
  }
  return nextState;
}

function sceneRenamed(prevState, payload) {
  const nextState = { ...prevState };
  const { sceneId, sceneName } = payload;
  const nextScenes = { ...nextState.scenes };
  nextState.scenes = nextScenes;
  const nextScene = { ...nextScenes[sceneId] };
  nextScenes[sceneId] = nextScene;
  nextScene.name = sceneName;
  return nextState;
}

function sceneThumbnailSet(prevState, payload) {
  const nextState = { ...prevState };
  const { sceneId, thumbnail } = payload;
  const nextScenes = { ...nextState.scenes };
  nextState.scenes = nextScenes;
  const nextScene = { ...nextScenes[sceneId] };
  nextScenes[sceneId] = nextScene;
  nextScene.thumbnail = thumbnail;
  return nextState;
}

function gameObjectReordered(prevState, payload) {
  const { sceneId, gameObjectIds } = payload;
  const nextState = { ...prevState };
  nextState.scenes[sceneId].gameObjectIds = gameObjectIds;
  return nextState;
}

function gameObjectAdded(prevState, payload) {
  const nextState = { ...prevState };
  const { sceneId, gameObject } = payload;
  const gameObjectId = gameObject.id;
  const nextGameObjectIds = [...prevState.scenes[sceneId].gameObjectIds];
  nextGameObjectIds.push(gameObjectId);
  nextState.scenes[sceneId].gameObjectIds = nextGameObjectIds;
  nextState.scenes[sceneId].gameObjects[gameObjectId] = gameObject;
  return nextState;
}

function gameObjectsRemoved(prevState, payload) {
  const nextState = { ...prevState };
  const { sceneId, gameObjectIds } = payload;

  const nextGameObjects = prevState.scenes[sceneId].gameObjects;
  gameObjectIds.forEach(id => {
    if (id in nextGameObjects) {
      delete nextGameObjects[id];
    }
  });
  nextState.scenes[sceneId].gameObjects = nextGameObjects;

  const nextGameObjectIds = prevState.scenes[sceneId].gameObjectIds.filter(
    id => !gameObjectIds.includes(id)
  );
  nextState.scenes[sceneId].gameObjectIds = nextGameObjectIds;

  return nextState;
}

function gameObjectPropertyUpdated(prevState, payload) {
  const { sceneId, gameObjectId, propertyId, value } = payload;
  const nextState = { ...prevState };
  const nextScenes = { ...nextState.scenes };
  nextState.scenes = nextScenes;
  const nextScene = { ...nextScenes[sceneId] };
  nextScenes[sceneId] = nextScene;
  const nextGameObjects = { ...nextScene.gameObjects };
  nextScene.gameObjects = nextGameObjects;
  const newGameObject = { ...nextGameObjects[gameObjectId] };
  nextGameObjects[gameObjectId] = newGameObject;
  newGameObject[propertyId] = value;
  return nextState;
}

function editorCameraTransformUpdated(prevState, payload) {
  const nextState = { ...prevState };
  const { sceneId, position, target } = payload;
  const nextScenes = { ...nextState.scenes };
  nextState.scenes = nextScenes;
  const nextScene = { ...nextScenes[sceneId] };
  nextScenes[sceneId] = nextScene;
  const editorCamera = { ...nextScene.editorCamera };
  nextScene.editorCamera = editorCamera;
  editorCamera.position = position;
  editorCamera.target = target;
  return nextState;
}

export default game;
