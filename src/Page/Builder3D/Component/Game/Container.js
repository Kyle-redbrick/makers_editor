import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as builderAction from "../../Store/Reducer/builder";
import { generateBabylonPage } from "../../../Builder/utils/gamePageGenerator";
import Popup, { showPopUp } from "../../../../Common/Component/PopUp";
import WizError from "../../../../Common/Util/WizError";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { gameSrc: null, gameContainerStyle: {} };
  }
  componentDidMount() {
    this.updateGameContainerStyle();
    window.addEventListener("message", this.onGameMessage, false);
    window.addEventListener("resize", this.onresize);
  }
  componentWillUnmount() {
    window.removeEventListener("message", this.onGameMessage);
    window.removeEventListener("resize", this.onresize);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.onChangeIsPlaying();
    }
  }

  onChangeIsPlaying() {
    if (this.props.isPlaying) {
      if (this.checkGameDataValidAndWarn()) {
        this.playGame();
      } else {
        this.props.setIsPlaying(false);
      }
    } else {
      this.stopGame();
    }
  }
  checkGameDataValidAndWarn() {
    if (!this.checkAllSceneHasCamera()) {
      alert("모든 씬에 적어도 하나의 카메라가 필요해요!");
      return false;
    }
    return true;
  }
  checkAllSceneHasCamera() {
    const { sceneIds, scenes } = this.props.game;
    for (let i in sceneIds) {
      let hasCamera = false;

      const sceneId = sceneIds[i];
      const scene = scenes[sceneId];
      const { gameObjectIds, gameObjects } = scene;
      for (let j in gameObjectIds) {
        const gameObjectId = gameObjectIds[j];
        const gameObject = gameObjects[gameObjectId];
        if (gameObject.type === "camera") {
          hasCamera = true;
          break;
        }
      }

      if (!hasCamera) {
        return false;
      }
    }
    return true;
  }
  async playGame() {
    const gameSrc = await generateBabylonPage({
      gameData: this.props.game,
      onParseError: this.handleError,
      isBuilderPlay: true
    });
    this.setState({ gameSrc });
  }
  stopGame() {
    this.setState({ gameSrc: null });
  }

  onGameMessage = message => {
    if (message.data.type === "error") {
      const { error, payload } = message.data;
      this.handleError(error, payload);
    }
  };
  handleError = (error, payload) => {
    this.props.setIsPlaying(false);
    const wizError = WizError.create({
      error,
      payload: this.getPayloadWithNames(payload),
      intl: this.props.intl
    });
    this.showWizError(wizError);
  };
  getPayloadWithNames = payload => {
    if (!payload) return payload;
    const payloadWithNames = { ...payload };
    if (payload.sceneId) {
      const scene = this.props.game.scenes[payload.sceneId];
      payloadWithNames.sceneName = scene.name;
      delete payloadWithNames.sceneId;
      if (payload.spriteId) {
        payloadWithNames.gameObjectName =
          scene.gameObjects[payload.spriteId].name;
        delete payloadWithNames.spriteId;
      }
    }
    return payloadWithNames;
  };
  showWizError = wizError => {
    const { formatMessage } = this.props.intl;
    showPopUp(
      <Popup.OneButton
        title={wizError.getTitle()}
        subtitle={wizError.getMessage()}
        buttonName={formatMessage({ id: "ID_BUILDER_ALERT_CONFIRMBTN" })}
      />
    );
  };

  onresize = e => {
    this.updateGameContainerStyle();
  };
  updateGameContainerStyle() {
    let top, left, width, height;

    const gameElement = document.getElementById("game");
    const parentWidth = gameElement.clientWidth;
    const parentHeight = gameElement.clientHeight;
    if (parentHeight / parentWidth > 9 / 16) {
      width = parentWidth;
      height = (parentWidth * 9) / 16;
    } else {
      width = (parentHeight * 16) / 9;
      height = parentHeight;
    }

    width = width * 0.9;
    height = height * 0.9;
    top = (parentHeight - height) / 2;
    left = (parentWidth - width) / 2;

    this.setState({ gameContainerStyle: { top, left, width, height } });
  }

  onClickClose = () => {
    this.props.setIsPlaying(false);
  };

  render() {
    const { isPlaying } = this.props;
    const { gameSrc, gameContainerStyle } = this.state;
    return (
      <View
        isPlaying={isPlaying}
        gameSrc={gameSrc}
        gameContainerStyle={gameContainerStyle}
        onClickClose={this.onClickClose}
      />
    );
  }
}

export default connect(
  state => {
    const { game, builder } = state;
    const { isPlaying } = builder;
    return { game, isPlaying };
  },
  { setIsPlaying: builderAction.setIsPlaying }
)(injectIntl(Container));
