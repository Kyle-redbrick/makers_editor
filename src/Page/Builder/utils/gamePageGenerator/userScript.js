import {
  WizSpritePrefix as PREFIX,
  EDITORMODE
} from "../../../../Common/Util/Constant";
import OOBC from "../../../../Common/Component/OOBCEditor/OOBC";
import Parser from "../parser";

export default function createUserScript(gameData, options) {
  const { sceneIds, scenes } = gameData || {};
  const { onParseError } = options || {};
  let userScript = `
    var userScripts = {};
  `;
  sceneIds.forEach(sceneId => {
    userScript += `
      userScripts["${sceneId}"] = {};
    `;
    const scene = scenes[sceneId];
    const gameObjectIds = scene.gameObjectIds;
    const gameObjects = scene.gameObjects;
    gameObjectIds.forEach(gameObjId => {
      const gameObject = gameObjects[gameObjId];
      let parsedCode;
      try {
        parsedCode = parseCodeWithMode(
          gameObject.code,
          EDITORMODE.JAVASCRIPT_3D
        );
      } catch (error) {
        console.error(error);
        if (onParseError) {
          onParseError(error, { sceneId, spriteId: gameObjId });
        }
      }
      userScript += `
        userScripts["${sceneId}"]["${gameObjId}"] = async function(${PREFIX}) {
          try {
            ${parsedCode}
          } catch(error) {
            console.error(error);
            parent.postMessage({ 
              source: "wizlab",
              type: "error",
              error: error,
              payload: { sceneId: "${sceneId}", spriteId: "${gameObjId}" }
            });
          }
        };
      `;
    });
  });

  return userScript;
}

function parseCodeWithMode(code, mode) {
  switch (mode) {
    case EDITORMODE.PYTHON:
      return parsePythonCode(code);
    case EDITORMODE.BLOCK:
      return parseOOBCCode(code);
    case EDITORMODE.JAVASCRIPT:
    case EDITORMODE.JAVASCRIPT_3D:
    default:
      return parseJSCode(code, mode);
  }
}
function parsePythonCode(code) {
  Parser.parsePython(code);
}
function parseOOBCCode(code) {
  let contextJSON;
  try {
    contextJSON = JSON.parse(code);
  } catch (err) {
    console.error(err);
    return;
  }
  const context = OOBC.Context.fromJSON(contextJSON);
  code = context.toJavascript();
  return parseJSCode(code);
}
function parseJSCode(code, editorMode) {
  return Parser.parse(code, editorMode);
}
