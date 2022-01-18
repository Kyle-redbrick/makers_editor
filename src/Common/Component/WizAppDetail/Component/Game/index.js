import React, { Component } from "react";
import "./index.scss";
import * as request from "../../../../Util/HTTPRequest";
import GameRanking from "../../../GameRanking";
import { connect } from "react-redux";
import { detectIE } from "../../../../Util/detectBrowser";
import { FormattedMessage } from "react-intl";
import chromeBtnImage from "../../../../../Image/chrome-download.png";
import FullBtnImage from "../../../../../Image/dreamclass/play-full-screen-icon.svg";
import MinimizeBtnImage from "../../../../../Image/dreamclass/minimize-screen.svg";
import { getGuestId } from "../../../../../Common/Util/GuestIdUtil";

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.isIE = detectIE();
    this.screenRef = null;
    this.setScreenRef = elem => {
      this.screenRef = elem;
    };
    this.iframeRef = null;
    this.setIframeRef = elem => {
      this.iframeRef = elem;
    };

    this.state = {
      iframeFocused: true,
      isPlaying: false,
      isFullScreen: false,
      blankPadding: "LR",
      btnGroupHeight: 38,
      isRankingVisible: false,
      isASC: false,
      gameURL: props.project ? props.project.url : undefined
    };
  }

  componentDidMount() {
    window.addEventListener("focus", this.handleWindowFocus);
    window.addEventListener("message", this.gameEventHandler, false);
    this.getProject();
  }

  componentDidUpdate(prevProps, prevState) {
    let { isFullScreen } = this.state;
    if (isFullScreen !== prevState.isFullScreen) {
      if (isFullScreen) {
        this.onFullScreenResize();
        window.addEventListener("resize", this.onFullScreenResize);
      } else {
        window.removeEventListener("resize", this.onFullScreenResize);
      }
      const isMobile = window.innerWidth < 1080;
      if (isMobile) {
        this.setWizAppDetailZIndexTo(isFullScreen ? "front" : "back");
      }
    }
    if (prevProps.pId !== this.props.pId) {
      this.getProject();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.gameEventHandler);
    window.removeEventListener("focus", this.handleWindowFocus);
  }

  getProject = () => {
    // const pId = this.props.pId;
    // request
    //   .getPublishedProject({ pId })
    //   .then(res => res.json())
    //   .then(async json => {
    //     if (json.url) {
    //       this.setState({ gameURL: json.url });
    //     }
    //   });
  };

  handleScreenClick = e => {
    e.stopPropagation();
    if (this.iframeRef) {
      this.iframeRef.contentWindow.focus();
      this.setState({
        iframeFocused: true
      });
    }
  };
  handleWindowFocus = () => {
    this.setState({
      iframeFocused: false
    });
  };

  gameEventHandler = event => {
    if (event.data.source) {
      if (event.data.source === "wizlab") {
        if (event.data.type === "gameEvent") {
          const { type, data } = JSON.parse(event.data.message);
          switch (type) {
            case "showRanking":
              this.handleRankingShow(false);
              break;
            case "showRankingAscending":
              this.handleRankingShow(true);
              break;
            case "hideRanking":
              this.handleRankingHide();
              break;
            case "saveScore":
              this.saveScore(data);
              break;
            case "saveGameData":
              this.saveGameData(data);
              break;
            case "resetGameData":
              this.resetGameData();
              break;
            case "loadGameData":
              this.loadGameData();
              break;
            default:
          }
        }
      }
    }
  };

  getGameDataDefaultParams() {
    let params = { pId: this.props.pId };
    if (this.props.email) {
      params.email = this.props.email;
    } else {
      params.guestId = getGuestId();
    }
    return params;
  }

  sendMessageToIframe = data => {
    document
      .getElementById("wizlab__Iframe")
      .contentWindow.postMessage(
        { message: JSON.stringify(data), source: "wizlab", type: "gameData" },
        "*"
      );
  };

  saveGameData = data => {
    const params = this.getGameDataDefaultParams();
    params.data = data;
    request
      .saveGameData(params)
      .then(() => {
        this.sendMessageToIframe({ type: "onSaveGameData" });
      })
      .catch(err => console.error(err));
  };

  resetGameData = () => {
    const params = this.getGameDataDefaultParams();
    params.data = "{}";
    request
      .saveGameData(params)
      .then(() => {
        this.sendMessageToIframe({ type: "onResetGameData" });
      })
      .catch(err => console.error(err));
  };

  loadGameData = () => {
    const params = this.getGameDataDefaultParams();
    request
      .loadGameData(params)
      .then(res => res.json())
      .then(json => {
        this.sendMessageToIframe({ type: "onLoadGameData", data: json.data });
      })
      .catch(err => console.error(err));
  };

  handleRankingShow = isAsc => {
    this.setState({ isRankingVisible: true, isAsc: isAsc }, () => {
      this.iframeRef.blur();
      this.screenRef.focus();
      // console.log("after ranking show", document.activeElement);
    });
  };

  handleRankingHide = () => {
    this.setState({ isRankingVisible: false }, () => {
      this.iframeRef.contentWindow.focus();
      // console.log("after ranking hide", document.activeElement);
    });
  };

  saveScore = score => {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
    }

    this.saveTimer = setTimeout(() => {
      const { pId } = this.props;
      let params = {
        pId: pId,
        score: score
      };
      let rankingId;
      if (this.props.email) {
        rankingId = this.props.email;
        params.email = rankingId;
      } else {
        rankingId = getGuestId();
        params.guestId = rankingId;
      }

      request
        .saveScore(params)
        .then(res => res.json())
        .then(json => {
          // console.log(json)
        })
        .catch(err => console.error(err));
    }, 100);
  };

  handlePlayBtn = () => {
    this.setState(state => ({
      isPlaying: !state.isPlaying
    }));
  };

  handleFullBtn = e => {
    e.stopPropagation();
    this.setState(state => ({
      isFullScreen: !state.isFullScreen
    }));
  };

  getScreenRatio = () => {
    let { screenMode } = this.props;
    let screenRatio = {};
    switch (screenMode) {
      case "VERTICAL":
        screenRatio.w = 9;
        screenRatio.h = 16;
        break;
      case "HORIZONTAL":
      default:
        screenRatio.w = 16;
        screenRatio.h = 9;
        break;
    }
    return screenRatio;
  };

  onFullScreenResize = () => {
    if (this.iframeRef) {
      this.iframeRef.contentWindow.focus();
    }
    const { btnGroupHeight, blankPadding } = this.state;
    const screenRatio = this.getScreenRatio();
    const windowRatio = {};
    windowRatio.w = window.innerWidth || document.body.clientWidth;
    windowRatio.h = window.innerHeight || document.body.clientHeight;
    windowRatio.h -= btnGroupHeight;

    const compareResult =
      windowRatio.w / windowRatio.h > screenRatio.w / screenRatio.h;
    let nextBlankPadding;
    if (compareResult) nextBlankPadding = "LR";
    else nextBlankPadding = "TB";
    if (blankPadding !== nextBlankPadding) {
      this.setState({ blankPadding: nextBlankPadding });
    }
  };

  getGamePage = () => {
    const { gameURL } = this.state;
    if (gameURL) {
      return (
        <iframe
          sandbox="allow-scripts allow-same-origin"
          id="wizlab__Iframe"
          ref={this.setIframeRef}
          title="wizlab"
          src={gameURL}
          scrolling="no"
          frameBorder="0"
        />
      );
    } else {
      return (
        <div className="GameScreen--progress">
          <div className="GameScreen--progress__left rotate">
            <span />
          </div>
          <div className="GameScreen--progress__right rotate">
            <span />
          </div>
        </div>
      );
    }
  };

  setWizAppDetailZIndexTo = position => {
    const wizAppDetailElement = document.getElementById("wizappDetail");
    if (wizAppDetailElement)
      wizAppDetailElement.style.zIndex = position === "front" ? 11 : 10;
  };

  render() {
    const {
      isFullScreen,
      blankPadding,
      isRankingVisible,
      iframeFocused,
      isAsc
    } = this.state;
    const { screenMode, pId } = this.props;
    const fullToggle = isFullScreen ? "FULL" : "NOFULL";
    const direction = screenMode === "VERTICAL" ? "VERT" : "HORI";
    let rankingToggle = isRankingVisible ? "on" : "off";
    return (
      <div className={`DetailGameContainer DetailGameContainer--${fullToggle}`}>
        {isFullScreen && <div className="DetailGameContainer__overlay" />}
        <div
          className={`GameLayout GameLayout--${fullToggle}--${direction}--${blankPadding}`}
        >
          {this.isIE ? (
            <div className="BlockedNoti">
              <div className="BlockedNoti__inner">
                <p className="BlockedNoti__text">
                  <FormattedMessage id="ID_BROWSER_BLOCK_TEXT1" />
                </p>
                <p className="BlockedNoti__text">
                  <FormattedMessage id="ID_BROWSER_BLOCK_TEXT2" />
                </p>
                <a
                  href={"https://www.google.com/chrome/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="BlockedNoti__chromeBtn"
                    src={chromeBtnImage}
                    alt="download-chrome"
                  />
                </a>
              </div>
            </div>
          ) : (
            <div
              className="GameScreen"
              ref={this.setScreenRef}
              onClick={this.handleScreenClick}
            >
              {!iframeFocused && <div className="GameScreen__block" />}
              {this.getGamePage()}
              <div className={`GameScreen__ranking--${rankingToggle}`}>
                {isRankingVisible && (
                  <GameRanking
                    isAsc={isAsc}
                    pId={pId}
                    handleRankingHide={this.handleRankingHide}
                  />
                )}
              </div>
            </div>
          )}

          <div className="GameBtnGroup">
            <div className="FullBtn" onClick={this.handleFullBtn}>
              <img className="FullBtn__img" src={isFullScreen ? MinimizeBtnImage : FullBtnImage} alt="full-btn" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  state => ({
    email: state.userinfo.email
  }),
  {}
)(GameContainer);
