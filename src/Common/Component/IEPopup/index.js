import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import closeImage from "../../../Image/popup-close.svg";
import chromedownloadImage from "../../../Image/chrome-download.png";
import "./index.scss";

export default class IEPopup extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowing: true };
  }

  handleCloseBtn = () => {
    this.setState({ isShowing: false });
  };

  handleDownloadBtn = e => {
    e.preventDefault();
    window.open("https://www.google.com/intl/ko/chrome/", "_blank");
  };

  render() {
    return this.state.isShowing ? (
      <div className="IEPopup__wrapper">
        <div className="IEPopup">
          <div className="IEPopup__download">
            <img
              className="IEPopup__download__img"
              src={chromedownloadImage}
              alt="download btn"
              onClick={this.handleDownloadBtn}
            />
          </div>
          <div className="IEPopup__message">
            <FormattedMessage id="ID_BROWSER_BLOCK_TEXT3" />
          </div>
          <div className="IEPopup__close">
            <img
              className="IEPopup__close__img"
              src={closeImage}
              alt="close btn"
              onClick={this.handleCloseBtn}
            />
          </div>
        </div>
      </div>
    ) : (
      <div />
    );
  }
}
