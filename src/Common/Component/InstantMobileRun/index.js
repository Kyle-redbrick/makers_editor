import React, { Component } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as request from "../../Util/HTTPRequest";
import { URL } from "../../Util/Constant";
import generateGamePage from "../../../Page/Builder/utils/gamePageGenerator";
import * as socketActions from "../../../Page/Builder/Store/Reducer/socket";
import closeImg from "../../../Image/builder/x-copy-3.svg";
import closeImg_darkmode from "../../../Image/builder/x-copy-3_darkmode.svg";
import { getColorTheme } from "../../../Page/Builder/utils/colorThemeUtil";

class InstantMobileRun extends Component {
  constructor(props) {
    super(props);
    this.pushTimer = null;
    this.pushTimeLimit = 5000;
    this.state = {
      isWaiting: true
    };
  }

  componentDidMount = () => {
    this.sendRequestToMobile();
    /*for css */
    const popup = document
      .querySelector(".InstantMobileRun")
      .closest(".popup_contents");
    popup.style.borderRadius = "20px";
    const dismissBtn = popup.querySelector("#popup_dismissbtn");
    dismissBtn.style.display = "none";
  };

  componentWillUnmount() {
    window.clearTimeout(this.pushTimer);
  }
  generateLink = async () => {
    const { pId, name } = this.props.project;
    /** made gamePage html  */
    const state = {
      editorMode: this.props.scene.editorMode,
      scene: {
        scenes: this.props.scene.scenes,
        sceneIds: this.props.scene.sceneIds,
        soundIds: this.props.scene.soundIds
      },
      preview: {
        screenMode: this.props.preview.screenMode
      }
    };

    const gameMeta = {
      pId,
      gameTitle: name,
      liveTest: true
    };
    try {
      const doc = await generateGamePage(state, gameMeta);
      /** upload gamePage html  */
      let res = await request.uploadPublished({ doc });
      let json = await res.json();
      await request.updateDevelopingProject({ pId, url: json.url });

      return json.url;
    } catch (e) {
      console.error(e);
    }
  };

  handleRetryBtn = () => {
    this.setState(
      {
        isWaiting: true
      },
      () => {
        this.sendRequestToMobile();
      }
    );
  };

  sendRequestToMobile = async () => {
    try {
      // socket
      const url = await this.generateLink();
      this.props.setInstantRunURL(url);
      // firebase message push
      const { pId } = this.props.project;
      let playerUrl = URL.LIVE_TEST + pId;

      // push to mobile by server
      let response = await request.pushInstantRun({
        email: this.props.email,
        url: playerUrl
      });
      let result = await response.json();
      if (result && result.status === "failed") {
        // console.log("failed before timeout");
        this.setState({
          isWaiting: false
        });
      } else {
        // warning:
        // there is a case that component unmounted before this code run,
        // because socketContainer emit url at the same time.
        this.pushTimer = window.setTimeout(() => {
          console.log("failed after timeout");
          this.setState({
            isWaiting: false
          });
        }, this.pushTimeLimit);
      }
    } catch (err) {
      console.error(err);
    }
  };
  render() {
    const { isWaiting } = this.state;
    const { intl } = this.props;
    const colorTheme = getColorTheme();

    return (
      <div className="InstantMobileRun">
        <div className="InstantMobileRun__header">
          <img
            className="Popup__closeBtn"
            onClick={this.props.dismiss}
            src={colorTheme === "darkMode" ? closeImg_darkmode : closeImg}
            alt="close"
          />
        </div>
        {isWaiting ? (
          <div className="InstantMobileRun__content--waiting">
            <div className="waiting__phone">
              <div className="waiting__phone__inner">
                <p className="waiting__icon" />
              </div>
            </div>
            <p className="title title--waiting">
              {intl.formatMessage({ id: "ID_POPUP_MOBILE_WAITING_TITLE" })}
            </p>
            <p className="text text--waiting">
              {intl.formatMessage({ id: "ID_POPUP_MOBILE_WAITING_DESC" })}
            </p>
          </div>
        ) : (
          <div className="InstantMobileRun__content--retry">
            <p className="title title--retry">
              {intl.formatMessage({ id: "ID_POPUP_MOBILE_FAIL_TITLE" })}
            </p>
            <ol className="Popup__caseList">
              <li className="text">
                {intl.formatMessage({ id: "ID_POPUP_MOBILE_FAIL_DESC_01" })}
              </li>
              <li className="text">
                {intl.formatMessage({ id: "ID_POPUP_MOBILE_FAIL_DESC_02" })}
              </li>
              <li className="text">
                {intl.formatMessage({ id: "ID_POPUP_MOBILE_FAIL_DESC_03" })}
              </li>
            </ol>
            <div className="Popup__storeRow">
              <a href={URL.APP_STORE} target="_blank" rel="noopener noreferrer">
                <p className="Popup__store Popup__store--apple" />
              </a>
              <a
                href={URL.PLAY_STORE}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="Popup__store Popup__store--google" />
              </a>
            </div>

            <div className="retry__submitBtn" onClick={this.handleRetryBtn}>
              <p>{intl.formatMessage({ id: "ID_POPUP_MOBILE_FAIL_BTN" })}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default connect(
  state => ({
    project: state.project,
    scene: state.scene,
    preview: state.preview,
    email: state.userinfo.email
  }),
  {
    setInstantRunURL: socketActions.setInstantRunURL
  }
)(injectIntl(InstantMobileRun));
