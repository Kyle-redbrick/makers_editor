import OOBC from "../../../../../Common/Component/OOBCEditor/OOBC";
import { isCodeExist } from "../../../../../Common/Util/codeComparable";

export const TYPE = {
  IS_PLAYING: "isPlaying",
  DID_PLAY_ONCE: "didPlayOnce",
  DID_GAME_EVENT_OCCUR: "didGameEventOccur",
  CODE_EXIST: "codeExist",
  OOBC_LINE_EXIST: "oobcLineExist",
  SPRITE_EXIST: "spriteExist",
  SPRITE_ORDER: "spriteOrder",
  SPRITE_SELECTED: "spriteSelected",
  SCENE_ORDER: "sceneOrder",
  SCENE_SELECTED: "sceneSelected",
};

export const getSamplePayloadOf = (type) => {
  switch (type) {
    case TYPE.DID_GAME_EVENT_OCCUR:
      return { api: "", sceneId: "scene1", spriteId: "spriteId" };
    case TYPE.CODE_EXIST:
      return { sceneId: "scene1", spriteId: "spriteId", code: "code" };
    case TYPE.OOBC_LINE_EXIST:
      return { sceneId: "scene1", spriteId: "spriteId", line: "line" };
    case TYPE.SPRITE_EXIST:
      return { sceneId: "scene1", spriteId: "spriteId" };
    case TYPE.SPRITE_ORDER:
      return { sceneId: "scene1", spriteId: "spriteId", order: 1 };
    case TYPE.SPRITE_SELECTED:
      return { sceneId: "scene1", spriteId: "spriteId" };
    case TYPE.SCENE_ORDER:
      return { sceneId: "scene1", order: 1 };
    case TYPE.SCENE_SELECTED:
      return { sceneId: "scene1" };
    default:
      return null;
  }
};

export const checkers = {
  [TYPE.IS_PLAYING]: (state, condition) => {
    return state.preview.isPlaying;
  },
  [TYPE.DID_PLAY_ONCE]: (state, condition) => {
    return state.preview.isPlaying;
  },
  [TYPE.DID_GAME_EVENT_OCCUR]: (state, condition) => {
    if (!state.preview.isPlaying) {
      return false;
    }

    const gameEvent = state.game.lastEvent;
    if (!gameEvent) {
      return false;
    }

    for (let key in condition.payload) {
      const value = condition.payload[key];
      if (value !== gameEvent[key]) {
        return false;
      }
    }
    return true;
  },
  [TYPE.CODE_EXIST]: (state, condition) => {
    const { sceneId, spriteId, code } = condition.payload || {};
    const scene = state.scene.scenes[sceneId];
    const sprite = scene && scene.sprites[spriteId];
    if (!sprite) {
      return false;
    }

    return isCodeExist(code, sprite.code);
  },
  [TYPE.OOBC_LINE_EXIST]: (state, condition) => {
    const { sceneId, spriteId, line, number, depth } = condition.payload || {};
    const scene = state.scene.scenes[sceneId];
    const sprite = scene && scene.sprites[spriteId];
    if (!sprite) {
      return false;
    }

    let context, targetLine;
    try {
      const contextJSON = JSON.parse(sprite.code);
      context = OOBC.Context.fromJSON(contextJSON);
      const lineJSON = JSON.parse(line);
      targetLine = OOBC.Line.fromJSON(lineJSON);
    } catch (err) {
      console.warn("condition checker(oobcLineExist):: fail to parse");
      return false;
    }

    const lines = context.getDisplayLines();
    for (let line of lines) {
      if (depth && depth !== line.getDepth()) {
        continue;
      }
      if (number && number !== line.lineNum()) {
        continue;
      }
      if (targetLine.isEqual(line)) {
        return true;
      }
    }
    return false;
  },
  [TYPE.SPRITE_EXIST]: (state, condition) => {
    const { sceneId, spriteId } = condition.payload || {};
    const scenes = state.scene.scenes;
    if (sceneId) {
      const scene = scenes[sceneId];
      return scene && scene.spriteIds.includes(spriteId);
    } else {
      for (let _sceneId in scenes) {
        const scene = scenes[_sceneId];
        if (scene.spriteIds.includes(spriteId)) {
          return true;
        }
      }
      return false;
    }
  },
  [TYPE.SPRITE_ORDER]: (state, condition) => {
    const { sceneId, spriteId, order } = condition.payload || {};
    const scenes = state.scene.scenes;
    const scene = scenes[sceneId];
    if (!scene) {
      return false;
    }

    if (scene.isHiddenLockSprites) {
      const unlockedSpriteIds = scene.spriteIds.filter(
        (spriteId) => !scene.sprites[spriteId].locked
      );
      return order === unlockedSpriteIds.indexOf(spriteId) + 1;
    } else {
      return order === scene.spriteIds.indexOf(spriteId) + 1;
    }
  },
  [TYPE.SPRITE_SELECTED]: (state, condition) => {
    const { spriteId } = condition.payload || {};
    const selectedSceneId = state.interaction.selected.scene;
    const selectedSpriteInfo =
      state.interaction.selected.objects[selectedSceneId];
    const selectedSpriteId = selectedSpriteInfo && selectedSpriteInfo.name;
    return spriteId === selectedSpriteId;
  },
  [TYPE.SCENE_ORDER]: (state, condition) => {
    const { sceneId, order } = condition.payload || {};
    const sceneIds = state.scene.sceneIds;
    return order === sceneIds.indexOf(sceneId) + 1;
  },
  [TYPE.SCENE_SELECTED]: (state, condition) => {
    const { sceneId } = condition.payload || {};
    const selectedSceneId = state.interaction.selected.scene;
    return sceneId === selectedSceneId;
  },
};

export const sampleConditions = [
  { type: TYPE.IS_PLAYING },
  // {
  //   type: TYPE.DID_GAME_EVENT_OCCUR,
  //   payload: {
  //     sceneId: "scene1",
  //     spriteId: "school_girl",
  //     api: "playAnimation",
  //     name: "side"
  //   }
  // },
  // {
  //   type: TYPE.DID_GAME_EVENT_OCCUR,
  //   payload: {
  //     sceneId: "scene1",
  //     spriteId: "tile_bg",
  //     api: "playSound",
  //     name: "misterious_night"
  //   }
  // },
  {
    type: TYPE.DID_GAME_EVENT_OCCUR,
    payload: {
      sceneId: "scene1",
      spriteId: "target_a",
      api: "setVelocityFromDegree",
    },
  },
  // {
  //   type: TYPE.SPRITE_EXIST,
  //   payload: {
  //     sceneId: "scene1",
  //     spriteId: "school_girl"
  //   }
  // },
  // {
  //   type: TYPE.SPRITE_ORDER,
  //   payload: {
  //     sceneId: "scene1",
  //     spriteId: "school_girl",
  //     order: 4
  //   }
  // },
  // {
  //   type: TYPE.SPRITE_SELECTED,
  //   payload: {
  //     spriteId: "school_girl"
  //   }
  // },
  // {
  //   type: TYPE.SCENE_ORDER,
  //   payload: {
  //     sceneId: "scene1",
  //     order: 1
  //   }
  // },
  // {
  //   type: TYPE.SCENE_SELECTED,
  //   payload: {
  //     sceneId: "scene1"
  //   }
  // },
  // {
  //   type: TYPE.CODE_EXIST,
  //   payload: {
  //     sceneId: "scene1",
  //     spriteId: "sol_a",
  //     code: `playAnimation("front_fly_idle", true);setGravityY(1500);`
  //   }
  // },
  {
    type: TYPE.OOBC_LINE_EXIST,
    payload: {
      sceneId: "scene1",
      spriteId: "joystick_c_yellow",
      line: `{"block":{"constructor":"Joystick","grammar":"subject","data":"joystick_c_yellow","children":[{"constructor":"Action","grammar":"verb","data":"bind","children":[{"constructor":"Sprite","grammar":"objective","data":"target_a"},{"constructor":"NumberBlock","grammar":"objective","data":300}]}]},"folded":false,"disabled":false}`,
      // number: 0,
      // depth: 0
    },
  },
];

class Condition {
  constructor(props) {
    this.type = props.type;
    this.payload = props.payload;
    this.isClear = false;
  }
  static create(options) {
    if (!options) {
      return null;
    }

    switch (options.type) {
      case TYPE.DID_GAME_EVENT_OCCUR:
        return new GameCondition(options);
      case TYPE.DID_PLAY_ONCE:
        return new UndisposableCondition(options);
      default:
        return new DisposableCondition(options);
    }
  }

  check(state) {
    const checker = checkers[this.type];
    if (checker) {
      this.isClear = checker(state, this);
      return this.isClear;
    } else {
      console.warn("invalid condition type");
    }
  }
  dispose(options) {
    this.isClear = false;
  }

  get isCodeType() {
    return this.type === TYPE.CODE_EXIST || this.type === TYPE.OOBC_LINE_EXIST;
  }
}
class DisposableCondition extends Condition {}
class UndisposableCondition extends Condition {
  check(state) {
    if (this.isClear) {
      return true;
    } else {
      return super.check(state);
    }
  }
  dispose(options) {
    // ignore dispose
  }
}
class GameCondition extends Condition {
  check(state) {
    if (this.isClear) {
      return true;
    } else {
      return super.check(state);
    }
  }
  dispose(options) {
    if (options && !options.isPlaying) {
      super.dispose();
    }
  }
}

export default Condition;
