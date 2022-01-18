import { ActionType } from "../../../../Common/Util/Constant";

const webtrcMiddleware = ({ getState, dispatch }) => next => action => {
  const returnValue = next(action);
  const nextState = getState();

  switch (action.type) {
    case ActionType.ADD_SCENE:
    case ActionType.COPY_SCENE:
    case ActionType.REMOVE_SCENE:
    case ActionType.REORDER_SCENE:
    case ActionType.SELECT_SCENE:
    case ActionType.SELECT_SPRITE:
    case ActionType.ADD_SPRITES:
    case ActionType.REMOVE_SPRITE:
    case ActionType.REMOVE_ALL_SPRITE:
    case ActionType.REORDER_SPRITE:
    case ActionType.SET_EDITOR_MODE:
    case ActionType.SET_SPRITE_CODE:
    case ActionType.SET_SPRITE_BLOCKXML:
    case ActionType.SET_SPRITE_PREVIEW:
    case ActionType.ADD_SOUNDS:
    case ActionType.REMOVE_SOUND:
    case ActionType.SET_IS_PLAYING:
    case ActionType.SET_SCREEN_MODE:
    case ActionType.LOCK_SPRITE:
    case ActionType.SET_TEMPLATE:
      let project = { ...nextState.project };
      project.state = {
        scene: nextState.scene,
        preview: { screenMode: nextState.preview.screenMode },
        interaction: { selected: nextState.interaction.selected }
      };
      delete project["timeStamp"];
      delete project["createdAt"];
      delete project["updatedAt"];
      delete project["isDeleted"];
      delete project["icon"];
      delete project["isFromTemplate"];
      delete project["screenshotURL"];
      delete project["user"];
      delete project["email"];
      delete project["name"];
      delete project["pId"];
      delete project["basicClass"];
      delete project["url"];
      delete project["video"];

      if (project.scene) delete project.scene["timeStamp"];
      dispatch({
        type: ActionType.WEBRTC_SET_PROJECT,
        project: project
      });
      break;
    default:
      break;
  }

  return returnValue;
};
export default webtrcMiddleware;
