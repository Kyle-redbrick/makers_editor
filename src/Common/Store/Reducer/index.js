import { combineReducers } from "redux";
import subscribe from "./Subscribe";
import userinfo from "./UserInfo";
import popup from "./Popup";

export default combineReducers({
  subscribe: subscribe,
  userinfo: userinfo,
  popup: popup
});
