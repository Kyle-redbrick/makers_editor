import React, { Component } from "react";
import NotificationSocket from "../../Util/NotificationSocket";
import { injectIntl } from "react-intl";
import "./index.scss";

import checkIcon from "../../../Image/builder/icon-check-notification.svg";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = { noti: null, animationOn: false };
  }
  componentDidMount() {
    NotificationSocket.subscribe(this.onReceiveNoti);
  }
  componentWillUnmount() {
    NotificationSocket.unsubscribe(this.onReceiveNoti);
  }

  onReceiveNoti = noti => {
    if (noti.type === "apk") {
      this.onReceiveApkNoti(noti);
    }
  };

  onReceiveApkNoti = async noti => {
    await this.setNotiToState(noti);
    await this.setTimeoutWithSeconds(0.4);
    await this.setAnimationToState(true);
    await this.setTimeoutWithSeconds(3);
    await this.setAnimationToState(false);
    await this.setTimeoutWithSeconds(0.4);
    await this.setNotiToState(null);
  };

  setNotiToState = noti => {
    return new Promise(resolve => this.setState({ noti }, resolve));
  };

  setAnimationToState = isOn => {
    return new Promise(resolve =>
      this.setState(
        {
          animationOn: isOn
        },
        resolve
      )
    );
  };

  setTimeoutWithSeconds = second => {
    return new Promise(resolve => setTimeout(resolve, second * 1000));
  };

  render() {
    const { noti, animationOn } = this.state;

    let notiElement;
    if (noti) {
      if (noti.type === "apk") {
        notiElement = <APKNoti apk={noti.apk} animationOn={animationOn} />;
      }
    }

    return <div className="noti_container">{notiElement}</div>;
  }
}

function APKNoti(props) {
  const { apk, animationOn, intl } = props;
  return (
    <div className={`noti noti-apk${animationOn ? " noti-show" : ""}`}>
      <img src={checkIcon} alt="check" />
      <div className="noti_message">
        {intl.formatMessage({ id: "ID_APK_NOTI_CONFIRM_MSG" }, { appName: apk.appName })}
      </div>
    </div>
  );
}

export default injectIntl(Notification);
