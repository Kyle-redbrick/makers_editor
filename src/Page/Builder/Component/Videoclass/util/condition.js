import stringify from "json-stringify-safe";
import { VCTYPE } from "../../../../../Common/Util/Constant";
import OOBC from "../../../../../Common/Component/OOBCEditor/OOBC";

export const checkConditions = (
  progress,
  state,
  { successHandler, failureHandler, codeOnly }
) => {
  const stage = progress.stages[progress.currentStageNum];
  const customSpriteIdMap = progress.customSpriteIdMap;
  const conditions = stage.conditions;

  // 코드만 검사할 때 코드 작성 조건이 없으면 리턴
  if (conditions && codeOnly) {
    let hasCodeType = false;
    for (let i = 0; i < conditions.length; i++) {
      const condition = conditions[i];
      if (
        condition.type === VCTYPE.CONDITION.CODE_EXIST ||
        condition.type === VCTYPE.CONDITION.CODE_AST ||
        condition.type === VCTYPE.CONDITION.OOBC_LINE_EXIST
      ) {
        hasCodeType = true;
        break;
      }
    }
    if (!hasCodeType) return;
  }

  // 현재 스텝의 모든 조건 검사
  if (conditions) {
    for (let i = 0; i < conditions.length; i++) {
      const condition = conditions[i];
      if (checkCondition(condition, state, customSpriteIdMap, codeOnly)) {
        continue;
      } else {
        if (failureHandler) failureHandler(condition);
        return;
      }
    }
  }
  // 이전 스테이지들의 영구 조건 검사
  for (let i = 0; i < progress.currentStageNum; i++) {
    const conditions = progress.stages[i].conditions;
    if (conditions) {
      for (let j = 0; j < conditions.length; j++) {
        const condition = conditions[j];
        if (
          !condition.permanent ||
          checkCondition(condition, state, customSpriteIdMap, codeOnly)
        ) {
          continue;
        } else {
          if (failureHandler) failureHandler(condition);
          return;
        }
      }
    }
  }
  if (successHandler) successHandler();
};

function checkCondition(condition, state, customIdMap, codeOnly) {
  const conditionChecker = conditionCheckers[condition.type];
  const isCodeType =
    condition.type === VCTYPE.CONDITION.CODE_EXIST ||
    condition.type === VCTYPE.CONDITION.CODE_AST ||
    condition.type === VCTYPE.CONDITION.OOBC_LINE_EXIST;
  if (conditionChecker) {
    const result = conditionChecker({
      condition,
      state,
      customIdMap
    });
    return isCodeType ? result : codeOnly || result;
  } else {
    console.warn("== condition checker: unknown type", condition.type);
    return false;
  }
}

const conditionCheckers = {
  SPRITE_EXIST: ({ condition, state, customIdMap }) => {
    const scene = state.scene.scenes[condition.sceneId];
    const spriteId =
      condition.spriteId || customIdMap[condition.customSpriteId];
    return scene && scene.spriteIds.indexOf(spriteId) > -1;
  },
  SPRITE_INDEX: ({ condition, state, customIdMap }) => {
    const scene = state.scene.scenes[condition.sceneId];
    const spriteId =
      condition.spriteId || customIdMap[condition.customSpriteId];
    return scene && scene.spriteIds.indexOf(spriteId) === condition.index;
  },
  SPRITE_SELECTED: ({ condition, state, customIdMap }) => {
    const sceneId = state.interaction.selected.scene;
    const spriteId =
      condition.spriteId || customIdMap[condition.customSpriteId];
    return state.interaction.selected.objects[sceneId].name === spriteId;
  },
  SCENE_EMPTY: ({ condition, state }) => {
    const scene = state.scene.scenes[condition.sceneId];
    return scene && scene.spriteIds.length === 0;
  },
  SCENE_FIRST: ({ condition, state }) => {
    return state.scene.sceneIds[0] === condition.sceneId;
  },
  SCENE_SELECTED: ({ condition, state }) => {
    return state.interaction.selected.scene === condition.sceneId;
  },
  CUSTOM_ID_EXIST: ({ condition, customIdMap }) => {
    return !!customIdMap[condition.customSpriteId];
  },
  CODE_EXIST: ({ condition, state, customIdMap }) => {
    return checkCodeAdded(state.scene, condition, customIdMap).isValid;
  },
  CODE_AST: ({ condition, state, customIdMap }) => {
    try {
      return checkCodeAst(state.scene, condition, customIdMap).isValid;
    } catch (e) {
      console.error(e);
      return { isValid: false };
    }
  },
  PLAY_ONCE: ({ condition }) => {
    return condition.isClear;
  },
  GAME_EVENT: ({ condition }) => {
    return condition.isClear;
  },
  OOBC_LINE_EXIST: ({ condition, state }) => {
    const { spriteId, oobcLine } = condition;
    const currentSecneId = state.interaction.selected.scene;
    const currentScene = state.scene.scenes[currentSecneId];
    const sprite = currentScene.sprites[spriteId];
    if (!sprite) return false;

    let oobcContext;
    try {
      const contextJSON = JSON.parse(sprite.code);
      oobcContext = OOBC.Context.fromJSON(contextJSON);
    } catch {
      return false;
    }

    let lineExist = false;
    const oobcLines = oobcContext.getLines();
    for (let i = 0; i < oobcLines.length; i++) {
      const _oobcLine = oobcLines[i];

      // 뎁스검사
      if (oobcLine.depth && oobcLine.depth !== _oobcLine.getDepth()) {
        continue;
      }

      // 라인넘버 검사
      if (oobcLine.lineNum && oobcLine.lineNum !== _oobcLine.lineNum) {
        continue;
      }

      // 블록내용 검사
      const { blocks } = oobcLine;
      if (blocks) {
        const _blocks = _oobcLine.getBlocks();
        let blocksPassed = true;

        for (let j = 0; j < blocks.length; j++) {
          const block = blocks[j];
          const _block = _blocks[j];
          if (!_block) {
            blocksPassed = false;
            break;
          }
          let blockPassed = true;
          for (let k in block) {
            if (k === "data" && _block.dataType === "position") {
              if (
                !_block[k] ||
                block[k].x !== _block[k].x ||
                block[k].y !== _block[k].y
              ) {
                blockPassed = false;
                break;
              }
            } else {
              if (_block[k] === undefined || block[k] !== _block[k]) {
                blockPassed = false;
                break;
              }
            }
          }
          if (!blockPassed) {
            blocksPassed = false;
            break;
          }
        }

        if (!blocksPassed) continue;
      }

      lineExist = true;
      break;
    }

    return lineExist;
  }
};

export const checkCodeAdded = (state, data, customIdMap = {}) => {
  let spriteId;
  for (let i = 0; i < state.sceneIds.length; i++) {
    const sceneId = state.sceneIds[i];
    const scene = state.scenes[sceneId];
    const spriteIds = scene.spriteIds;
    const sprites = scene.sprites;
    for (let j = 0; j < spriteIds.length; j++) {
      spriteId = spriteIds[j];
      const sprite = sprites[spriteId];
      const code = sprite.code;
      const _spriteId = data.spriteId || customIdMap[data.customSpriteId];
      if (_spriteId === spriteId) {
        return checkCode(data.code, code);
      }
    }
  }

  function checkCode(_code, userCode) {
    let code = JSON.parse(stringify(_code));
    const originalCode = JSON.parse(stringify(code));
    const acorn = require("acorn");
    let tokens = [];
    let ast;
    try {
      ast = acorn.parse(userCode, {
        onToken: tokens,
        ecmaVersion: 8
      });
    } catch (e) {
      return {
        isValid: false,
        result: { code: [], spriteName: spriteId }
      };
    }
    const traverse = require("ast-traverse");
    let indent = 0;
    let currentCode = undefined;
    let currentIndent = 0;
    traverse(ast, {
      pre: function(node) {
        indent++;

        if (currentCode && currentCode.children) {
          for (let i = currentCode.children.length - 1; i >= 0; i--) {
            const c = currentCode.children[i];
            let conditionName = c.name;
            if (c.isCustom) {
              conditionName = customIdMap[conditionName];
            }
            // eslint-disable-next-line
            if (conditionName == node.name || conditionName == node.value) {
              currentCode.children.splice(i, 1);
            }
          }
        }

        for (let i = code.length - 1; i >= 0; i--) {
          const c = code[i];
          let conditionName = c.name;
          if (c.isCustom) {
            conditionName = customIdMap[conditionName];
          }

          // eslint-disable-next-line
          if (
            (c.children && conditionName === node.name) ||
            conditionName === node.value
          ) {
            if (c.children.length === 0) {
              code.splice(i, 1);
            } else {
              currentIndent = indent;
              currentCode = c;
            }
          }
        }
        if (indent < currentIndent) {
          currentIndent = 0;
          currentCode = undefined;
        }
      },
      post: function() {
        indent--;
      }
    });
    for (let i = code.length - 1; i >= 0; i--) {
      if (code[i].children && code[i].children.length === 0) {
        const original = originalCode.filter(
          o => o.name === code[i].name || o.name === code[i].value
        );
        if (original[0] && original[0].children) {
          if (original[0].children.length > 0) {
            code.splice(i, 1);
          }
        }
      }
    }

    return {
      isValid: code.length === 0,
      result: { code, spriteName: spriteId }
    };
  }

  return {
    isValid: false,
    result: { code: [], spriteName: spriteId }
  };
};
export const checkCodeAst = (state, data, customIdMap = {}) => {
  const acorn = require("acorn");
  const walk = require("acorn-walk");

  const toNodes = ast => {
    let conditionTokens = [];
    walk.ancestor(ast, {
      Literal(node, ancestors) {
        conditionTokens.push({
          type: "Literal",
          raw: node.value,
          ancestors: ancestors.map(n => n.type),
          customId: node.customId,
          isLoose: node.isLoose
        });
      },
      Identifier(node, ancestors) {
        conditionTokens.push({
          type: "Identifier",
          raw: node.name,
          ancestors: ancestors.map(n => n.type),
          customId: node.customId,
          isLoose: node.isLoose
        });
      }
    });
    return conditionTokens;
  };

  const sceneId = data.sceneId;
  const spriteId = data.spriteId || customIdMap[data.customSpriteId];
  const sprite = state.scenes[sceneId].sprites[spriteId];
  if (!sprite) return { isValid: false };

  const userCode = sprite.code;

  const conditionNodes = toNodes(data.code);

  let userNodes;
  try {
    userNodes = toNodes(acorn.parse(userCode));
  } catch (error) {
    return { isValid: false };
  }

  if (conditionNodes.length !== userNodes.length) {
    return { isValid: false };
  }

  for (let i = 0; i < conditionNodes.length; i++) {
    if (
      stringify(conditionNodes[i].ancestors) !==
      stringify(userNodes[i].ancestors)
    ) {
      return { isValid: false };
    }
    if (conditionNodes[i].type !== userNodes[i].type) {
      return { isValid: false };
    }

    if (conditionNodes[i].customId) {
      conditionNodes[i].raw = customIdMap[conditionNodes[i].customId];
    }

    if (
      !conditionNodes[i].isLoose &&
      conditionNodes[i].raw !== userNodes[i].raw
    ) {
      if (conditionNodes[i].customId) {
        const customId = customIdMap[conditionNodes[i].customId];
        if (customId !== userNodes[i].raw) {
          return { isValid: false };
        }
      } else {
        return { isValid: false };
      }
    }
  }

  return { isValid: true };
};

export const checkGameEvent = (conditionEvent, gameEvent, customIdMap) => {
  if (!conditionEvent && !gameEvent) return true;
  if (conditionEvent && gameEvent) {
    for (let property in conditionEvent) {
      if (property === "customSpriteId") {
        if (customIdMap[conditionEvent[property]] !== gameEvent.spriteId)
          return false;
      } else if (property === "customTargetSpriteId") {
        if (customIdMap[conditionEvent[property]] !== gameEvent.targetSpriteId)
          return false;
      } else {
        if (conditionEvent[property] !== gameEvent[property]) return false;
      }
    }
    return true;
  }
  return false;
};
