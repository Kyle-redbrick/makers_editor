import { combineReducers } from "redux";
import project from "./project";
import scene from "./scene";
import preview from "./preview";
import interaction from "./interaction";
import video from "./video";
import chat from "./chat";
import chatbot from "./chatbot";
import webrtc from "./webrtc";
import socket from "./socket";
import game from "./game";
import block from "./block";
import modal from "./modal";
import userinfo from "../../../../Common/Store/Reducer/UserInfo";
import popup from "../../../../Common/Store/Reducer/Popup";
import tabs from "./tabs";
import dream from "./dream";

export default combineReducers({
  project: project,
  scene: scene,
  preview: preview,
  interaction: interaction,
  userinfo: userinfo,
  popup: popup,
  video: video,
  chat: chat,
  webrtc: webrtc,
  socket: socket,
  chatbot: chatbot,
  game: game,
  block: block,
  modal: modal,
  tabs: tabs,
  dream: dream
});
