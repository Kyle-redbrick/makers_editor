import { combineReducers } from "redux";
import project from "./project";
import game from "./game";
import builder from "./builder";
import interaction from "./interaction";
import contextMenu from "./contextMenu";
import userinfo from "../../../../Common/Store/Reducer/UserInfo";

export default combineReducers({
  project,
  game,
  builder,
  interaction,
  contextMenu,
  userinfo
});
