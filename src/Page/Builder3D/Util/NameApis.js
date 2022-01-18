function getMaxNumWithPrefix(prefix, ids) {
  let maxNum = 0;
  for (let i in ids) {
    const id = ids[i];
    if (id === prefix) {
      maxNum = 1;
      continue;
    }

    const num = parseInt(id.split(prefix)[1]);
    if (isNaN(num)) {
      continue;
    }
    if (num > maxNum) {
      maxNum = num;
    }
  }
  return maxNum;
}

export function createDefaultSceneId(sceneIds) {
  const defaultSceneId = "scene";
  const maxNum = getMaxNumWithPrefix(defaultSceneId, sceneIds);
  return defaultSceneId + (maxNum + 1);
}

export function createDefaultSceneName(sceneNames) {
  const defaultSceneName = "장면";
  const maxNum = getMaxNumWithPrefix(defaultSceneName, sceneNames);
  return defaultSceneName + (maxNum + 1);
}

export function createCopiedSceneName(sceneNames, sceneNameToCopy) {
  const copiedName = "복제본";
  const originalSceneName = sceneNameToCopy.split(copiedName)[0].trim();
  const defaultCopiedName = (originalSceneName + " " + copiedName).trim();
  const maxNum = getMaxNumWithPrefix(defaultCopiedName, sceneNames);
  if (maxNum === 0) {
    return defaultCopiedName;
  } else {
    return defaultCopiedName + (maxNum + 1);
  }
}

export function createDefaultGameObjId(gameObjIds, gameObjType) {
  const defaultObjId = gameObjType;
  const maxNum = getMaxNumWithPrefix(defaultObjId, gameObjIds);
  return defaultObjId + (maxNum + 1);
}

export function createDefaultGameObjName(gameObjNames, gameObjSubtype) {
  const defaultObjName = convertToGameObjName(gameObjSubtype);
  const maxNum = getMaxNumWithPrefix(defaultObjName, gameObjNames);
  if (maxNum === 0) {
    return defaultObjName;
  } else {
    return defaultObjName + (maxNum + 1);
  }
}
function convertToGameObjName(gameObjSubtype) {
  const BABAYLON = window.BabylonConstant;
  switch (gameObjSubtype) {
    case BABAYLON.MESH.BOX:
      return "박스";
    case BABAYLON.MESH.GROUND:
      return "평면";
    case BABAYLON.MESH.SPHERE:
      return "공";
    case BABAYLON.MESH.OBJ:
      return "오브젝트";
    default:
      return gameObjSubtype;
  }
}
