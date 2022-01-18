import React, { Component } from "react";
import * as request from "../../Common/Util/HTTPRequest";
import * as TrackingUtil from "../../Common/Util/TrackingUtil";
import { URL } from "../../Common/Util/Constant";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
// import generateGamePage from "../Builder/utils/gamePageGenerator";

class Container extends Component {
  constructor(props) {
    super(props);

    this.pId = this.props.match.params.pId;
    this.isLiveTest = this.props.match.path === "/liveTest/:pId";
    this.os = this.getMobileOperatingSystem();
    this.state = {
      project: {}
    };
  }

  async componentDidMount() {
    const pId = this.pId;
    let project;
    try {
      if (this.isLiveTest) {
        TrackingUtil.sendGAEvent("page", "/liveTest", this.props.email);
        project = await request
          .getDevelopingProjectInfo({ pId })
          .then(res => res.json());
      } else {
        TrackingUtil.sendGAEvent("page", "/wizapp", this.props.email);
        project = await request
          .getPublishedProject({ pId })
          .then(res => res.json());
      }
      this.setState({
        project
      });
    } catch (err) {
      console.error(err);
    }
  }

  getMobileOperatingSystem = () => {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }

    return "unknown";
  };

  render() {
    const { project } = this.state;

    if (!project || !project.pId) {
      return <div />;
    }

    return (
      <div className="Page--GamePlayer">
        <div className="GamePlayer">
          <p
            className="GamePlayer__icon"
            style={{ backgroundImage: `url(${project.icon})` }}
          />
          <p className="GamePlayer__name">{project.name}</p>
          {this.os === "iOS" && (
            <div>
              <a
                className="GamePlayer__playBtn"
                href={`https://wizschool.io/ios?pId=${this.pId}&liveTest=${this.isLiveTest}`}
              >
                <FormattedMessage id="ID_GAME_PLAYER_PLAY_BUTTON_MOBILE" />
              </a>
              {!this.isLiveTest && (
                // <p className="GamePlayer__playweb">
                <a
                  className="GamePlayer__playBtn"
                  href={`${URL.GAME_SRC}detail/${this.pId}`}
                >
                  <FormattedMessage id="ID_GAME_PLAYER_PLAY_BUTTON_MOBILE_WEB" />
                </a>
                // </p>
              )}
            </div>
          )}
          {this.os === "Android" && (
            <div>
              <a
                className="GamePlayer__playBtn"
                href={`Intent://game#Intent;scheme=wizapp;package=io.wizschool.wizapp;S.pId=${this.pId};S.liveTest=${this.isLiveTest};end`}
              >
                <FormattedMessage id="ID_GAME_PLAYER_PLAY_BUTTON_MOBILE" />
              </a>
              {!this.isLiveTest && (
                <a
                  className="GamePlayer__playBtn"
                  href={`${URL.GAME_SRC}detail/${this.pId}`}
                >
                  <FormattedMessage id="ID_GAME_PLAYER_PLAY_BUTTON_MOBILE_WEB" />
                </a>
              )}
            </div>
          )}
          {this.os === "unknown" && this.isLiveTest && (
            <a className="GamePlayer__playBtn" href={project.url}>
              <FormattedMessage id="ID_GAME_PLAYER_PLAY_BUTTON" />
            </a>
          )}
          {this.os === "unknown" && !this.isLiveTest && (
            <a
              className="GamePlayer__playBtn"
              href={`${URL.GAME_SRC}detail/${this.pId}`}
            >
              <FormattedMessage id="ID_GAME_PLAYER_PLAY_BUTTON" />
            </a>
          )}
          <p className="GamePlayer__copyright">
            <FormattedMessage id="ID_GAME_PLAYER_COPYRIGHT" />
          </p>
        </div>
      </div>
    );
  }
}
export default connect(state => ({ email: state.userinfo.email }))(Container);
