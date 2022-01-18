import React, { Component } from 'react';
import { injectIntl } from "react-intl";
import { Link } from 'react-router-dom';
import "./index.scss";

import tutorialIcon from '../../../../Image/dreamclass/tutorial-video-icon.svg';
import arrowIcon from '../../../../Image/dreamclass/tutorial-arrow-icon.svg';
import closeIcon from '../../../../Image/dreamclass/tutorial-popup-close-icon.svg';

class TutorialPopup extends Component {
  state = {
    isOpened : true
  };

  handleClose = () => {
    let expiredAt = new Date();
    let exdays = 1;
    expiredAt.setTime(expiredAt.getTime() + exdays * 24 * 60 * 60 * 1000);
    let exObj = { expiredAt };
    localStorage.setItem("tutorialPopupStatus", JSON.stringify(exObj));

    this.setState({
      isOpened: false
    });
  }

  render() {
    let { isOpened } = this.state;
    const { intl } = this.props;

    try {
      let exObj = localStorage.getItem("tutorialPopupStatus") || "{}";
      exObj = JSON.parse(exObj);
      if (exObj.expiredAt) {
        isOpened = false;
        if (new Date(exObj.expiredAt) < Date.now()) {
          localStorage.removeItem("tutorialPopupStatus");
          isOpened = true;
        }
      }
    } catch (err) {
      localStorage.removeItem("tutorialPopupStatus");
      console.error(err);
    }

    if (!isOpened) {
      return <div />;
    }

    return (
      <div className="tutorialPopup">
        <div className="tutorialPopupWrapper">
          <Link to="/tutorial" className="leftArea">
            <img className="infoIcon" src={tutorialIcon} alt=""/>
            <p className="text">
              {intl.formatMessage({id: "ID_TUTORIAL_POPUP_TITLE"})}
            </p>
            <img className="arrowIcon" src={arrowIcon} alt=""/>
          </Link>
          <img className="closeIcon" src={closeIcon} alt="" onClick={this.handleClose}/>
        </div>
      </div>
    )
  }
}


export default injectIntl(TutorialPopup);