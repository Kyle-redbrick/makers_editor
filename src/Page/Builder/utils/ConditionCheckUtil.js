import stringify from "json-stringify-safe";
export const SPRITE_ADDED = "SPRITE_ADDED";
export const CODE_ADDED = "CODE_ADDED";

export const isValidate = (type, state, data) => {
  switch (type) {
    case SPRITE_ADDED:
      return checkSpriteAdded(state, data);
    case CODE_ADDED:
      return checkCodeAdded(state, data);
    default:
      break;
  }
  return true;
};

const checkSpriteAdded = (state, spriteNames) => {
  let addedSpriteNames = [];
  let missingSpriteNames = [];
  for (let i = 0; i < state.sceneIds.length; i++) {
    const sceneId = state.sceneIds[i];
    const scene = state.scenes[sceneId];
    const spriteIds = scene.spriteIds;
    addedSpriteNames = [...addedSpriteNames, ...spriteIds];
  }

  for (let i = 0; i < spriteNames.length; i++) {
    if (addedSpriteNames.indexOf(spriteNames[i]) === -1) {
      missingSpriteNames.push(spriteNames[i]);
    }
  }

  return {
    isValid: missingSpriteNames.length === 0,
    result: missingSpriteNames
  };
};

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
      if (data.spriteName === spriteId) {
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
        // console.log(
        //   Array(indent + 1).join(" ") + node.type,
        //   prop,
        //   node.name,
        //   node.value,
        //   indent
        // );
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
