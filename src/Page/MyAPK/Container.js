import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import View from "./View";
import * as request from "../../Common/Util/HTTPRequest";
import { showPopUp } from "../../Common/Component/PopUp";
import ApkPayLinkPopup from "./Components/APKPayLinkPopup";
import { WIZLAB_APK_STATUS } from "../../Common/Util/Constant";
import NotificationSocket from "../../Common/Util/NotificationSocket";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apkInfo: {
        count: 0,
        apks: []
      }
    };
  }
  componentDidMount = () => {
    this.setPageInfo();
    NotificationSocket.subscribe(this.onReceiveNoti);
  };

  componentWillUnmount() {
    NotificationSocket.unsubscribe(this.onReceiveNoti);
  }

  onReceiveNoti = noti => {
    if (noti.type === "apk") {
      this.setPageInfo();
    }
  };

  setPageInfo = async () => {
    const json = await this.getWizlabAPKs();
    if (!json || !json.success) {
      // error handle for user exercise (ex. popup)
      return;
    }
    const apkInfo = { count: json.count, apks: json.wizlabAPKs };
    this.setPageInfoToState(apkInfo);
  };

  getWizlabAPKs = async () => {
    const json = await request
      .getWizlabAPKs({ userId: this.props.userinfo.id })
      .then(res => res.json())
      .catch(e => {
        console.error(e.message);
        return undefined;
      });

    return json;
  };

  setPageInfoToState = apkInfo => {
    this.setState({
      apkInfo
    });
  };

  onClickCreateAPK = async () => {
    const userInfo = await this.getUserTicket();
    if (!userInfo || !userInfo.success) {
      return;
    }
    if (userInfo.user.apkTicket < 1) {
      showPopUp(
        <ApkPayLinkPopup
          onClickPay={() => {
            this.props.history.push("/payment");
          }}
        />,
        { defaultPadding: false, mobileFullscreen: true }
      );
      return;
    }
    this.props.history.push("/myapk/createAPK");
  };

  getUserTicket = async () => {
    const userInfo = await request
      .getUserApkTicket({
        id: this.props.userinfo.id
      })
      .then(res => res.json())
      .catch(e => {
        console.error(e);
        return undefined;
      });
    return userInfo;
  };

  onClickProject = apk => {
    window.open(`/builder/${apk.pId}`);
  };

  onClickUpdateAPK = apk => {};

  onClickPay = () => {
    this.props.history.push("/payment");
  };

  onClickHistory = () => {
    this.props.history.push("/payment/result");
  };

  onClickEditPopupSubmit = apk => {
    if (!apk) return;
    const apks = [...this.state.apkInfo.apks];
    apks[apk.apkIndex].apkVersion.status = WIZLAB_APK_STATUS.ONGOING;
    this.setState({
      apkInfo: {
        ...this.state.apkInfo,
        apks
      }
    });
  };

  render() {
    if (!this.props.userinfo.email) {
      return <Redirect to="/" />;
    }
    const { intl, isFromBuilder } = this.props;
    const { apkInfo } = this.state;
    return (
      <View
        intl={intl}
        apkInfo={apkInfo}
        onClickCreateAPK={this.onClickCreateAPK}
        onClickProject={this.onClickProject}
        onClickUpdateAPK={this.onClickUpdateAPK}
        onClickPay={this.onClickPay}
        userinfo={this.props.userinfo}
        onClickHistory={this.onClickHistory}
        onClickEditPopupSubmit={this.onClickEditPopupSubmit}
        isFromBuilder={isFromBuilder}
      />
    );
  }
}

export default connect(state => ({ userinfo: state.userinfo }))(
  withRouter(injectIntl(Container))
);
