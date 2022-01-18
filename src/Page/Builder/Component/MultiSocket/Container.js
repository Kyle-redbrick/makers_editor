import React, { Component } from "react";
import { connect } from "react-redux";
// import io from "socket.io-client";
// import { URL } from "../../../../Common/Util/Constant";
import AssetLibrary from "../../utils/assetLibrary";
import * as request from "../../../../Common/Util/HTTPRequest";
import * as projectActions from "../../Store/Reducer/project";
import * as tabActions from "../../Store/Reducer/tabs";
import * as interactionActions from "../../Store/Reducer/interaction";
import { socketUtil } from "../Socket/Container";

export const setMyProject = props => {
  try {
    const { scene, interaction, preview } = props;

    const state = JSON.stringify({
      scene,
      interaction: { ...interaction, isPublished: undefined },
      preview: { ...preview, isPlaying: false }
    });
    localStorage.setItem("wizProject", state);
  } catch (err) {
    console.err(err);
  }
};

class Container extends Component {
  EVENT_CONNECT = "connect";
  EVENT_MULTI_STATE = "multiState";
  EVENT_JOIN = "join";
  EVENT_LEAVE = "leave";
  EVENT_HIGHLIGHT = "highlight";
  EVENT_JOIN_ROOM = "joinRoom";

  constructor(props) {
    super(props);
    this.currentUser = null;
    this.timer = null;
  }

  componentDidMount() {
    this.setupSocket();
  }

  componentDidUpdate(prevProps) {
    if (!this.props.currentUser) return;
    // current user 상태가 변경 됐을 때
    if (prevProps.currentUser.email !== this.props.currentUser.email) {
      // current user가 나인 경우 (other -> me)
      if (this.props.currentUser.email === this.props.email) {
        // console.log(
        //   3333,
        //   " ---- Tab Click Event, get project: " + this.props.currentUser.pId
        // );

        console.log(
          3333,
          " ---- leaving channel : " + prevProps.currentUser.email
        );
        this.socket.emit(this.EVENT_LEAVE, {
          email: prevProps.currentUser.email
        });

        // console.log(
        //   3333,
        //   " ---- get my project from localStorage : " +
        //     this.props.currentUser.email
        // );
        this.getMyProject();

        console.log(
          3333,
          " ---- join channel : " + this.props.currentUser.email
        );
        this.socket.emit(this.EVENT_JOIN, {
          email: this.props.currentUser.email
        });
        // current user가 내가 아닌 경우
      } else if (this.props.currentUser.email !== this.props.email) {
        // 기존 current user가 내가 아닌 경우 (other -> other)
        if (prevProps.currentUser.email !== this.props.email) {
          this.socket.emit(this.EVENT_LEAVE, {
            email: prevProps.currentUser.email
          });

          this.getDevelopingProject(this.props.currentUser.pId);

          this.socket.emit(this.EVENT_JOIN, {
            email: this.props.currentUser.email
          });
          // 기존 current user가 나인 경우 (me -> other)
        } else if (prevProps.currentUser.email === this.props.email) {
          this.getDevelopingProject(this.props.currentUser.pId);

          this.socket.emit(this.EVENT_JOIN, {
            email: this.props.currentUser.email
          });
        }
      }
    }
    if (prevProps.highlightBtnId !== this.props.highlightBtnId) {
      if (this.props.isTutor) {
        !prevProps.highlightBtnId &&
          this.socket.emit(this.EVENT_HIGHLIGHT, {
            highlightBtnId: this.props.highlightBtnId,
            roomId: this.props.roomId
          });
      }
    }
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  setupSocket = () => {
    // const options = {}; //options reference : https://socket.io/docs/client-api/#new-Manager-url-options
    this.socket = socketUtil.socket;
    this.socket.emit(this.EVENT_JOIN_ROOM, { roomId: this.props.roomId }); // global room

    this.setSocketListener();
  };

  setSocketListener = () => {
    // this.socket.on(this.EVENT_CONNECT, () => {
    //   if (!this.props.currentUser) return;

    //   if (this.props.currentUser.email !== this.props.email) {
    //     this.socket.emit(this.EVENT_JOIN, {
    //       email: this.props.currentUser.email
    //     });
    //   }
    // });

    // sync all data
    this.socket.on(this.EVENT_MULTI_STATE, async data => {
      if (!this.props.currentUser) return;
      if (this.props.currentUser.email !== this.props.email) {
        const project = {};
        project.state = JSON.parse(data.state);
        const assets = await AssetLibrary.loadAssetsForGame(
          project.state.scene
        );
        AssetLibrary.setAll(assets);
        this.props.setProject(project);
      }
    });
    //  튜터가 버튼 표시
    this.socket.on(this.EVENT_HIGHLIGHT, data => {
      // 타이머 리셋
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.props.setBtnHighlight(data.highlightBtnId);
      
      this.timer = setTimeout(() => {
        this.props.setBtnHighlight();
      }, 200);
    });
  };

  getDevelopingProject = async pId => {
    try {
      const param = { pId };

      const data = await request
        .getDevelopingProject(param)
        .then(res => res.json());

      if (data.state) {
        // console.log(
        //   3333,
        //   `---- get ${this.props.currentUser.email}'s project state with pId: ${
        //     this.props.currentUser["pId"]
        //   } `
        // );
        const project = {};
        project.state = JSON.parse(data.state);
        const assets = await AssetLibrary.loadAssetsForGame(
          project.state.scene
        );
        AssetLibrary.setAll(assets);
        this.props.setProject(project);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // setMyProject = () => {
  //   try {
  //     const { scene, interaction, preview } = this.props;

  //     const state = JSON.stringify({
  //       scene,
  //       interaction: { ...interaction, isPublished: undefined },
  //       preview: { ...preview, isPlaying: false }
  //     });
  //     localStorage.setItem("wizProject", state);
  //   } catch (err) {
  //     console.err(err);
  //   }
  // };

  getMyProject = async () => {
    try {
      const state = localStorage.getItem("wizProject");

      const project = {};
      project.state = JSON.parse(state);
      const assets = await AssetLibrary.loadAssetsForGame(project.state.scene);
      AssetLibrary.setAll(assets);
      this.props.setProject(project);
    } catch (err) {
      console.error(err);
    }
  };

  // updateProjectState = () => {
  //   const { scene, interaction, preview } = this.props;

  //   const state = JSON.stringify({
  //     scene,
  //     interaction: { ...interaction, isPublished: undefined },
  //     preview: { ...preview, isPlaying: false }
  //   });

  //   const data = {
  //     pId: this.props.currentUser.pId,
  //     state,
  //     email: this.props.currentUser.email
  //   };
  //   // console.log(
  //   //   3333,
  //   //   `sending state ${data.pId} from ${this.props.currentUser.email}`
  //   // );
  //   this.socket.emit(this.EVENT_MULTI_STATE, data);
  // };

  render() {
    return <div style={{ display: "none" }} />;
  }
}

export default connect(
  state => {
    const { history, historyIndex, ..._scene } = state.scene;

    return {
      email: state.userinfo.email,
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
      currentUser: state.tabs.currentUser,
      highlightBtnId: state.interaction.highlightBtnId
    };
  },
  {
    setStudents: tabActions.setStudents,
    setTutor: tabActions.setTutor,
    setProject: projectActions.setProject,
    setBtnHighlight: interactionActions.setBtnHighlight
  }
)(Container);
