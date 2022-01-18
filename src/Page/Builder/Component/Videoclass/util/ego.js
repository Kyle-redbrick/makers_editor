import { VCTYPE } from "../../../../../Common/Util/Constant";

export const createEgoMessage = (condition, customSpriteIdMap, intl) => {
  const spriteId =
    condition.spriteId ||
    (customSpriteIdMap ? customSpriteIdMap[condition.customSpriteId] : null);
  const { index, sceneId, customSpriteId } = condition;
  const { formatMessage } = intl;
  switch (condition.type) {
    case VCTYPE.CONDITION.SPRITE_EXIST:
      return formatMessage(
        { id: "ID_EGO_CONDITION_SPRITE_EXIST" },
        { spriteId }
      );
    case VCTYPE.CONDITION.SPRITE_INDEX:
      return formatMessage(
        { id: "ID_EGO_CONDITION_SPRITE_INDEX" },
        { spriteId, index: index + 1 }
      );
    case VCTYPE.CONDITION.SPRITE_SELECTED:
      return formatMessage(
        { id: "ID_EGO_CONDITION_SPRITE_SELECTED" },
        { spriteId }
      );
    case VCTYPE.CONDITION.SCENE_EMPTY:
      return formatMessage({ id: "ID_EGO_CONDITION_SCENE_EMPTY" }, { sceneId });
    case VCTYPE.CONDITION.SCENE_FIRST:
      return formatMessage({ id: "ID_EGO_CONDITION_SCENE_FIRST" }, { sceneId });
    case VCTYPE.CONDITION.SCENE_SELECTED:
      return formatMessage(
        { id: "ID_EGO_CONDITION_SCENE_SELECTED" },
        { sceneId }
      );
    case VCTYPE.CONDITION.CUSTOM_ID_EXIST:
      return formatMessage(
        { id: "ID_EGO_CONDITION_CUSTOM_ID_EXIST" },
        { customSpriteId }
      );
    case VCTYPE.CONDITION.CODE_EXIST:
      return formatMessage({ id: "ID_EGO_CONDITION_CODE_EXIST" }, { spriteId });
    case VCTYPE.CONDITION.PLAY_ONCE:
      return formatMessage({ id: "ID_EGO_CONDITION_PLAY_ONCE" });
    case VCTYPE.CONDITION.GAME_EVENT:
      return formatMessage({ id: "ID_EGO_CONDITION_GAME_EVENT" });
    case VCTYPE.CONDITION.CODE_AST:
      return formatMessage({ id: "ID_EGO_CONDITION_CODE_EXIST" }, { spriteId });
    case VCTYPE.CONDITION.OOBC_LINE_EXIST:
      return formatMessage(
        { id: "ID_EGO_CONDITION_OOBC_LINE_EXIST" },
        { spriteId }
      );
    default:
      return formatMessage({ id: "ID_EGO_CONDITION_DEFAULT" });
  }
};
