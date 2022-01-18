import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
// import uuidv4 from "uuid/v4";
import { URL, PAGETYPE } from "../../../../Common/Util/Constant";
import * as socketActions from "../../Store/Reducer/socket";
import * as chatActions from "../../Store/Reducer/chat";
import { showPopUp } from "../../../../Common/Component/PopUp";
// import { FormattedMessage } from "react-intl";
import { setMyProject } from "../MultiSocket/Container";
// import AssetLibrary from "../../utils/assetLibrary";

const socket = io(URL.SOCKET_SERVER, {});
export const socketUtil = {
  socket: socket,
  sendSocketEvent: (event, data = {}) => {
    socket.emit(event, data);
  }
};

class Container extends Component {
  socketTimer = undefined;
  EVENT_CONNECT = "connect";
  EVENT_JOIN = "join";
  EVENT_JOIN_ROOM = "joinRoom";
  EVENT_INSTANT_RUN_ACK = "instantRunAck";
  EVENT_INSTANT_RUN = "instantRun";
  EVENT_STATE =
    this.props.pageType === PAGETYPE.WIZLIVE_1V4 ? "multiState" : "state";
  EVENT_STATE_TUTORIAL = "stateTutorial";
  EVENT_REQUEST_IMAGE = "requestImage";
  EVENT_RESPONSE_IMAGE = "responseImage";
  EVENT_TIMER = this.props.pageType === PAGETYPE.WIZLIVE_1V4 ? 500 : 2000;
  EVENT_MULTI_STATE = "multiState";
  EVENT_LEAVE = "leave";
  EVENT_HIGHLIGHT = "highlight";
  //chat
  EVENT_CHAT_MESSAGE = "chatMessage";

  constructor(props) {
    super(props);
    const { pageType } = props;
    this.codeSync =
      pageType !== PAGETYPE.VIDEOCLASS &&
      pageType !== PAGETYPE.OCP &&
      pageType !== PAGETYPE.TUTORIAL &&
      pageType !== PAGETYPE.MONITOR &&
      pageType !== PAGETYPE.QNA_READONLY &&
      pageType !== PAGETYPE.BUILDER_READONLY;
    this.isTutorial = pageType === PAGETYPE.TUTORIAL;
    this.joinedRoom = [];
    this.currentUser = null;
  }

  componentDidMount() {
    this.setSocket();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.email) {
      if (this.props.instantRunURL !== nextProps.instantRunURL) {
        this.socket.emit(this.EVENT_INSTANT_RUN, {
          email: this.props.email,
          url: nextProps.instantRunURL
        });
        return false;
      }

      if (this.props.requestImage !== nextProps.requestImage) {
        if (nextProps.requestImage === true) {
          this.socket.emit(this.EVENT_REQUEST_IMAGE, {
            email: this.props.email
          });
        }
      }
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    // chatting
    if (this.props.messageQueue.length > 0) {
      this.props.messageQueue.forEach(msg => {
        let _msg = msg;
        if (this.props.pageType === PAGETYPE.WIZLIVE_1V4) {
          _msg = { ..._msg, roomId: this.props.roomId };
        }
        this.socket.emit(this.EVENT_CHAT_MESSAGE, _msg);
      });
      this.props.clearMsgQueue();
    }

    // code sync
    if (!this.props.email) {
      return;
    }
    if (this.codeSync) {
      if (this.socketTimer) {
        clearTimeout(this.socketTimer);
      }
      this.socketTimer = setTimeout(() => {
        const { pId, scene, interaction, preview } = this.props;
        const state = JSON.stringify({
          scene,
          interaction: { ...interaction, isPublished: undefined },
          preview: { ...preview, isPlaying: false }
        });
        const data = { pId, state, email: this.props.email };

        if (this.isTutorial) {
          const { scenes } = scene;
          const { selectedSceneId, selectedObject } = this.props;
          const _sprite = scenes[selectedSceneId].sprites[selectedObject.name];
          this.socket.emit(this.EVENT_STATE_TUTORIAL, {
            email: this.props.email,
            code: _sprite.code
          });
        } else {
          // 1:4 수업
          if (this.props.pageType === PAGETYPE.WIZLIVE_1V4) {
            if (this.props.currentUser.email === this.props.email) {
              // console.log(
              //   3333,
              //   " ---- Set My Project to localStorage : " +
              //     this.props.currentUser.email
              // );
              setMyProject({ scene, interaction, preview });

              // console.log(
              //   3333,
              //   `sending ${
              //     this.props.currentUser.email
              //   }'s project state --- socket event: ${this.EVENT_STATE} `
              // );
              this.socket.emit(this.EVENT_STATE, data);
            }
            // 1:1 수업
          } else {
            this.socket.emit(this.EVENT_STATE, data);
          }
        }
      }, this.EVENT_TIMER);
    } else if (this.isTutorial) {
      // const { pId, scene, interaction, preview } = this.props;
      // const state = JSON.stringify({
      //   scene,
      //   interaction: { ...interaction, isPublished: undefined },
      //   preview: { ...preview, isPlaying: false }
      // });
      // const data = { pId, state };
      // if (this.isTutorial) {
      //   const { scenes } = scene;
      //   const { selectedSceneId, selectedObject } = this.props;
      //   const _sprite = scenes[selectedSceneId].sprites[selectedObject.name];
      //   if (!_sprite) return;
      //   const _code = _sprite.code;
      //   if (this.lastSentCode === _code) {
      //     return;
      //   }
      //   this.lastSentCode = _code;
      //   this.socket.emit(this.EVENT_STATE_TUTORIAL, {
      //     email: this.props.email,
      //     code: _sprite.code
      //   });
      // } else {
      //   this.socket.emit(this.EVENT_STATE, data);
      // }
    }
    if (this.props.pageType === PAGETYPE.WIZLIVE_1V4) return;

    if (this.joinedRoom.length !== Object.keys(this.props.rooms).length) {
      Object.keys(this.props.rooms).forEach(roomId => {
        if (this.joinedRoom.indexOf(roomId) === -1) {
          this.socket.emit(this.EVENT_JOIN_ROOM, { roomId });
          this.joinedRoom.push(roomId);
        }
      });
    }
  }

  componentWillUnmount() {
    this.socket.off(this.EVENT_INSTANT_RUN_ACK);
    this.socket.off(this.EVENT_RESPONSE_IMAGE);
    this.socket.off(this.EVENT_CHAT_MESSAGE);
    this.socket.disconnect();
  }

  setSocket = () => {
    // const options = {}; //options reference : https://socket.io/docs/client-api/#new-Manager-url-options
    this.socket = socket;
    let roomId = "all";

    if (this.props.pageType === PAGETYPE.WIZLIVE_1V4) {
      roomId = this.props.roomId;
    }

    if (this.props.email) {
      this.socket.emit(this.EVENT_JOIN, { email: this.props.email });
    }

    this.socket.emit(this.EVENT_JOIN_ROOM, { roomId }); // global chat room
    this.joinedRoom.push(roomId);

    this.socket.on(this.EVENT_INSTANT_RUN_ACK, data => {
      setTimeout(() => {
        showPopUp(null);
      }, 1000);
    });
    this.socket.on(this.EVENT_RESPONSE_IMAGE, data => {
      this.props.setResponseImage(data.url);
      this.props.setRequestImage(false);
    });
  };

  render() {
    return <div style={{ display: "none" }} />;
  }
}

export default connect(
  state => {
    const { history, historyIndex, ..._scene } = state.scene;

    return {
      selectedSceneId: state.interaction.selected.scene,
      selectedObject:
        state.interaction.selected.objects[state.interaction.selected.scene],
      pId: state.project.pId,
      scene: _scene,
      interaction: {
        ...state.interaction,
        jukebox: {
          isPlaying: false
        },
        addSoundsTimeStamp: undefined
      },
      preview: state.preview,
      email: state.userinfo.email,
      project: state.project,
      instantRunURL: state.socket.url,
      requestImage: state.socket.requestImage,
      messageQueue: state.chat.messageQueue,
      rooms: state.chat.rooms,
      currentUser: state.tabs.currentUser
    };
  },
  {
    setRequestImage: socketActions.setRequestImage,
    setResponseImage: socketActions.setResponseImage,
    clearMsgQueue: chatActions.clearMsgQueue,
    addMsg: chatActions.addMsg,
    addUnreadMsgCount: chatActions.addUnreadMsgCount
  }
)(Container);
