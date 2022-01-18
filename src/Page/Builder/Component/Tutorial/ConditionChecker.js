import stringify from "json-stringify-safe";

export const checkConditions = (
  videoclass,
  state,
  successHandler,
  failureHandler
) => {
  // console.log("condition checker: checkConditions", videoclass, state);
  // 현재 스테이지의 모든 조건 검사
  const stage = videoclass.stages[videoclass.currentStageNum];
  const conditions = stage.conditions;
  if (conditions) {
    for (let i = 0; i < conditions.length; i++) {
      if (checkCondition(conditions[i], state, stage)) {
        continue;
      } else {
        failureHandler(conditions[i]);
        return;
      }
    }
  } else {
    successHandler();
    return;
  }
  // 이전 스테이지들의 영구 조건 검사
  for (let i = 0; i < videoclass.currentStageNum; i++) {
    const conditions = videoclass.stages[i].conditions;
    if (conditions) {
      for (let j = 0; j < conditions.length; j++) {
        if (!conditions[j].permanent || checkCondition(conditions[j], state)) {
          continue;
        } else {
          failureHandler(conditions[j]);
          return;
        }
      }
    }
  }
  successHandler();
};

function checkCondition(condition, state, stage) {
  // console.log("condition checker: checkCondition", condition);
  switch (condition.type) {
    case "SPRITE_EXIST":
      return spriteExist(condition, state);
    case "CODE_EXIST":
      return codeExist(condition, state);
    case "SCENE_FIRST":
      return sceneFirst(condition, state);
    case "SCENE_SELECTED":
      return sceneSelected(condition, state);
    case "PLAY_ONCE":
      return playOnce(condition, stage);
    case "PUBLISH_PROJECT":
      return publishProject(condition, stage);
    case "SPRITE_SELECTED":
      return spriteSelected(condition, state);
    default:
      // console.log("condition checker: unknown type", condition.type);
      return false;
  }
}

function spriteExist(condition, state) {
  // console.log(
  //   "condition checker: spriteExist",
  //   condition.sceneId,
  //   condition.spriteId
  // );
  const _scene = state.scene.scenes[condition.sceneId];
  return _scene.spriteIds.indexOf(condition.spriteId) > -1;
}

function codeExist(condition, state) {
  const result = checkCodeAdded(state.scene, condition);
  return result.isValid;
  // console.log(
  //   "condition checker: codeExist",
  //   condition.sceneId,
  //   condition.spriteId,
  //   condition.code
  // );
  // const _scene = state.scene.scenes[condition.sceneId];
  // const _sprite = _scene.sprites[condition.spriteId];
  // const _code = _sprite.code;
  // // make ast of each condition code and sprite code
  // let ast, _ast;
  // try {
  //   let options = { ecmaVersion: 8 };
  //   ast = acorn.parse(condition.code, options);
  //   _ast = acorn.parse(_code, options);
  // } catch (e) {
  //   console.log("condition checker: acore parse error", e);
  // }
  // // make node range to zero to compare
  // traverse(ast, {
  //   pre: node => {
  //     node.start = 0;
  //     node.end = 0;
  //   }
  // });
  // traverse(_ast, {
  //   pre: node => {
  //     node.start = 0;
  //     node.end = 0;
  //   }
  // });
  // // To log reason why comparing failed
  // // console.log(compare(_ast.body, ast.body, { verboseWhenMismatches: true }));
  // return compare(_ast.body, ast.body);
}

function sceneFirst(condition, state) {
  // console.log("condition checker: sceneFirst", condition.sceneId);
  return state.scene.sceneIds[0] === condition.sceneId;
}

function sceneSelected(condition, state) {
  // console.log("condition checker: sceneSelected", condition.sceneId);
  return state.interaction.selected.scene === condition.sceneId;
}

function spriteSelected(condition, state) {
  // console.log("condition checker: spriteSelected", condition.spriteId);
  const sceneId = state.interaction.selected.scene;
  return (
    state.interaction.selected.objects[sceneId].name === condition.spriteId
  );
}

function playOnce(condition, stage) {
  // console.log("condition checker: playOnce");
  return stage.didPlay;
}

function publishProject(condition, stage) {
  // console.log("condition checker: publishProject");
  return stage.didPublish;
}

const checkCodeAdded = (state, data) => {
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
      if (data.spriteId === spriteId) {
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

        if (currentCode) {
          for (let i = currentCode.children.length - 1; i >= 0; i--) {
            const c = currentCode.children[i];
            if (c.name === node.name) {
              currentCode.children.splice(i, 1);
            }
          }
        }

        for (let i = code.length - 1; i >= 0; i--) {
          const c = code[i];
          if (c.name === node.name) {
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
      if (code[i].children.length === 0) {
        const original = originalCode.filter(o => o.name === code[i].name);
        if (original[0]) {
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
