import React, { Component } from "react";
import { Link } from "react-router-dom";
import eventImg from "../../../../Image/ch_pop_ev.png";
import "./index.scss";
import { FormattedMessage } from "react-intl";

export default class EventPopup extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpened: true };
  }

  dismiss = day => {
    if (day) {
      let expiredAt = new Date().getTime();
      expiredAt += 1000 * 60 * 60 * 24;
      localStorage.setItem("expiredAt", expiredAt);
    }
    this.setState({ isOpened: false });
  };

  render() {
    return (
      <div
        className={`EventPopup ${!this.state.isOpened && "EventPopupHidden"}`}
      >
        <div className="EventPopupWrapper">
          <div className="EventPopupImg">
            <Link to="/codingparty">
              <img src={eventImg} alt="main img" />
            </Link>
          </div>
          <div className="EventPopupBtns">
            <div
              className="EventPopupBtn EventPopupBtnLeft"
              onClick={e => this.dismiss(true)}
            >
              <FormattedMessage id="ID_EVENT_MAIN_POPUP_BTN1" />
            </div>
            <div className="EventPopupBtn" onClick={e => this.dismiss(false)}>
              <FormattedMessage id="ID_EVENT_MAIN_POPUP_BTN2" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
