import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import Popup, { showPopUp } from "../../../../Common/Component/PopUp";
import WizError from "../../../../Common/Util/WizError";
import * as chatbotActions from "../../Store/Reducer/chatbot";
import * as previewActions from "../../Store/Reducer/preview";
import * as webrtcActions from "../../Store/Reducer/webrtc";
import {
  generatePhaserPage
} from "../../utils/gamePageGenerator";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDoc: undefined,
      isDummyRankingVisiable: false,
      gameWrapperWidth: 0,
      gameWrapperHeight: 0
    };
    this.gameIframe = React.createRef();
    this.isPlaying = false;
  }
  componentDidMount() {
    window.addEventListener("message", this.gamePageMessageListener, false);
    window.addEventListener("resize", this.resizeView);
    this.resizeView();
  }
  componentDidUpdate(prevProps) {
    const { isPlaying, volume } = this.props;
    if (isPlaying !== prevProps.isPlaying) {
      if (isPlaying) {
        this.showGame();
      } else {
        this.setState({ gameDoc: undefined, isDummyRankingVisiable: false });
      }
    }
    if (volume !== prevProps.volume && isPlaying) {
      this.onUpdateSystemVolume();
    }

    if (prevProps.screenMode !== this.props.screenMode) {
      this.resizeView();
    }
  }
  componentWillUnmount() {
    window.removeEventListener("message", this.gamePageMessageListener);
    window.removeEventListener("resize", this.resizeView);
  }
  resizeView = () => {
    const h = window.innerHeight;
    const w = window.innerWidth;
    let gameWrapperWidth, gameWrapperHeight;
    if (this.props.screenMode === "HORIZONTAL") {
      if (h / w > 9 / 16) {
        gameWrapperWidth = w;
        gameWrapperHeight = (w * 9) / 16;
      } else {
        gameWrapperWidth = (h * 16) / 9;
        gameWrapperHeight = h;
      }
    } else {
      if (w / h > 9 / 16) {
        gameWrapperWidth = (h * 9) / 16;
        gameWrapperHeight = h;
      } else {
        gameWrapperWidth = w;
        gameWrapperHeight = (w * 16) / 9;
      }
    }

    gameWrapperHeight *= 0.8;
    gameWrapperWidth *= 0.8;
    this.setState({
      gameWrapperWidth,
      gameWrapperHeight
    });
  };

  async showGame() {
    const state = {
      editorMode: this.props.editorMode,
      scene: {
        scenes: this.props.scenes,
        sceneIds: this.props.sceneIds,
        soundIds: this.props.soundIds
      },
      preview: {
        screenMode: this.props.screenMode
      }
    };
    const gameMeta = {
      pId: this.props.project.pId,
      isFromWizlab: true,
      systemVolume: this.props.volume
    };
    const page = await generatePhaserPage(
      state,
      gameMeta,
      this.handleParseError,
      this.props.intl
    );
    this.setState({ gameDoc: page });
  }
  handleParseError = (error, payload) => {
    //this.props.setIsPlaying(false);
    setTimeout(() => this.props.setIsPlaying(false), 30);
    const wizError = WizError.create({
      error,
      payload,
      intl: this.props.intl
    });
    this.showWizError(wizError);
    this.props.setLog({ game: false });
  };
  showWizError(wizError) {
    const { formatMessage } = this.props.intl;
    showPopUp(
      <Popup.OneButton
        title={wizError.getTitle()}
        subtitle={wizError.getMessage()}
        buttonName={formatMessage({ id: "ID_BUILDER_ALERT_CONFIRMBTN" })}
      />
    );
  }

  showDummyRanking = () => {
    this.setState({ isDummyRankingVisiable: true });
  };
  handleDummyRankingHide = () => {
    this.setState({ isDummyRankingVisiable: false });
  };

  onUpdateSystemVolume = volume => {
    this.gameIframe.current.contentWindow.postMessage(
      {
        type: "onUpdateSystemVolume",
        source: "wizlab",
        data: this.props.volume
      },
      "*"
    );
  };
  onClickVolume = e => {
    e.stopPropagation(0);
    if (this.props.volume === 0) {
      this.props.setGameVolume(this.oldVolume || 0);
    } else {
      this.oldVolume = this.props.volume;
      this.props.setGameVolume(0);
    }
  };
  onChangeVolume = e => {
    e.stopPropagation(0);
    const volume = parseInt(e.target.value);
    this.props.setGameVolume(volume);
  };

  gamePageMessageListener = message => {
    if (message.data.source === "wizlab") {
      if (message.data.type === "error") {
        const { error, payload } = message.data;
        this.handleGameError(error, payload);
      } else if (message.data.type === "gameEvent") {
        const gameEvent = JSON.parse(message.data.message);
        this.handleGameEvent(gameEvent);
      }
    }
  };
  handleGameError(error, payload) {
    this.props.setIsPlaying(false);
    const wizError = WizError.create({
      error,
      payload,
      intl: this.props.intl
    });
    this.showWizError(wizError);
  }
  handleGameEvent(gameEvent) {
    const { type } = gameEvent;
    if (this.getRankingGameEventTypes().includes(type)) {
      this.handleRankingGameEvent(gameEvent);
    } else if (this.getDataGameEventTypes().includes(type)) {
      this.handleDataGameEvent(gameEvent);
    }
  }
  getRankingGameEventTypes() {
    return ["saveScore", "showRanking", "showRankingAscending", "hideRanking"];
  }
  handleRankingGameEvent(rankingGameEvent) {
    const { type } = rankingGameEvent;
    if (type === "showRanking" || type === "showRankingAscending") {
      this.showDummyRanking();
    }
    const toastMsg = this.getToastMsgWithGameEventType(type);
    this.showToast(toastMsg);
  }
  getDataGameEventTypes() {
    return ["saveGameData", "loadGameData", "resetGameData"];
  }
  handleDataGameEvent(dataGameEvent) {
    const { type } = dataGameEvent;
    const toastMsg = this.getToastMsgWithGameEventType(type);
    this.showToast(toastMsg);
  }
  getToastMsgWithGameEventType(gameEventType) {
    const apiName =
      {
        saveGameData: "server.save",
        loadGameData: "server.load",
        resetGameData: "server.reset"
      }[gameEventType] || gameEventType;
    const { formatMessage } = this.props.intl;
    const toastMsg = formatMessage(
      { id: "ID_TOAST_API_NOT_SUPPORT" },
      { apiName }
    );
    return toastMsg;
  }
  showToast(toastMsg) {
    toast.info(toastMsg, { position: toast.POSITION.BOTTOM_LEFT });
  }

  render() {
    const { isPlaying, setIsPlaying, setLog, volume, intl } = this.props;
    const {
      gameDoc,
      isDummyRankingVisiable,
      gameWrapperWidth,
      gameWrapperHeight
    } = this.state;
    const {
      gameIframe,
      handleDummyRankingHide,
      onClickVolume,
      onChangeVolume
    } = this;
    return (
      <View
        volume={volume}
        onClickVolume={onClickVolume}
        onChangeVolume={onChangeVolume}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setLog={setLog}
        gameDoc={gameDoc}
        gameIframe={gameIframe}
        handleDummyRankingHide={handleDummyRankingHide}
        isDummyRankingVisiable={isDummyRankingVisiable}
        gameWrapperWidth={gameWrapperWidth}
        gameWrapperHeight={gameWrapperHeight}
        intl={intl}
      />
    );
  }
}

export default connect(
  state => ({
    project: state.project,
    isPlaying: state.preview.isPlaying,
    scene: state.scene,
    scenes: state.scene.scenes,
    sceneIds: state.scene.sceneIds,
    soundIds: state.scene.soundIds,
    screenMode: state.preview.screenMode,
    volume: state.preview.volume,
    editorMode: state.scene.editorMode
  }),
  {
    setIsPlaying: previewActions.setIsPlaying,
    addNewMsg: chatbotActions.addNewMsg,
    setGameVolume: previewActions.setGameVolume,
    setLog: webrtcActions.setLog
  }
)(injectIntl(Container));
