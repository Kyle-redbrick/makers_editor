import React, { Component } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import * as userInfoActions from "../../../../Common/Store/Reducer/UserInfo";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { ImageCompressor } from "../../../../Common/Util/FileCompressor";
import View from "./View";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";

class Container extends Component {
  constructor(props) {
    super(props);

    this.TAB_TYPE = {
      ICON: {
        title: this.props.intl.formatMessage({
          id: `ID_MYPAGE_ICONSETTING_TABTAPE_ICON`
        }),
        tooltip: this.props.intl.formatMessage({
          id: `ID_MYPAGE_ICONSETTING_TABTAPE_ICONTOOLTIP`
        })
      },
      EDGE: {
        title: this.props.intl.formatMessage({
          id: `ID_MYPAGE_ICONSETTING_TABTAPE_EDGE`
        }),
        tooltip: this.props.intl.formatMessage({
          id: `ID_MYPAGE_ICONSETTING_TABTAPE_EDGETOOLTIP`
        })
      }
    };

    this.state = {
      selectedTab: this.TAB_TYPE.ICON.title,
      selectedIconUrl: undefined,

      customIconUrl: null,
      profile: this.props.userinfo
    };
  }

  componentDidMount = () => {
    this.getUserProfile();
  };

  getUserProfile = async () => {
    const profile = await request
      .userProfile({ email: this.props.userinfo.email })
      .then(res => res.json())
      .catch(e => console.error(e));

    this.setState({
      selectedIconUrl: profile.icon,
      customIconUrl: profile.customIcon
        ? JSON.parse(profile.customIcon)[0]
        : null,
      profile
    });
  };

  handleUploadIcon = () => {
    document.getElementById("uploadInput").click();
  };

  handleUploadFile = async event => {
    let data = new FormData();
    const file = event.target.files[0];
    if (!file) return;
    let downsized = await ImageCompressor(file);
    data.append("file", downsized);
    try {
      const response = await request.upload(data);
      const json = await response.json();

      this.setState({
        selectedIconUrl: json.url,
        customIconUrl: json.url
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleSelectTab = tab => {
    if (tab === this.state.selectedTab) return;
    this.setState({
      selectedTab: tab
    });
  };

  handleSelectIcon = iconUrl => {
    if (iconUrl === this.state.selectedIconUrl) return;
    this.setState({
      selectedIconUrl: iconUrl
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { selectedIconUrl, customIconUrl } = this.state;
    if (!selectedIconUrl) {
      return;
    }
    const params = {
      email: this.props.userinfo.email,
      icon: selectedIconUrl
    };
    if (customIconUrl) {
      params["customIcon"] = JSON.stringify([customIconUrl]);
    }

    try {
      await request.updateUserInfo(params);
      this.props.updateUserInfo(params);
      showPopUp(
        <PopUp.OneButton
          title={this.props.intl.formatMessage({
            id: "ID_SETTING_ALERT_TITLE_SUCC"
          })}
          subtitle={this.props.intl.formatMessage({
            id: "ID_SETTING_ALERT_PROFILE_SUCC"
          })}
          buttonName={this.props.intl.formatMessage({
            id: "ID_SETTING_ALERT_CLOSEBTN"
          })}
          buttonAction={() => {
            this.props.history.replace("/mypage");
          }}
        />,
        { darkmode: true }
      );
    } catch (err) {
      showPopUp(
        <PopUp.OneButton
          title={this.props.intl.formatMessage({
            id: "ID_SETTING_ALERT_TITLE_FAIL"
          })}
          subtitle={this.props.intl.formatMessage({
            id: "ID_SETTING_ALERT_RETRY"
          })}
          buttonName={this.props.intl.formatMessage({
            id: "ID_SETTING_ALERT_CLOSEBTN"
          })}
        />,
        { darkmode: true }
      );
    }
  };

  onClickMobileTooltip = tooltip => {
    showPopUp(
      <PopUp.OneButton
        title={tooltip}
        buttonNameId="ID_MYPAGE_TOOLTIP_TIER_CONFIRM"
        intl={this.props.intl}
      />,
      { darkmode: true, dismissButton: false }
    );
  };

  render() {
    if (!this.props.userinfo.email) {
      return <Redirect to="/" />;
    }
    const { selectedTab, selectedIconUrl, profile, customIconUrl } = this.state;
    return (
      <View
        handleUploadIcon={this.handleUploadIcon}
        handleUploadFile={this.handleUploadFile}
        handleSelectIcon={this.handleSelectIcon}
        handleSubmit={this.handleSubmit}
        handleSelectTab={this.handleSelectTab}
        selectedTab={selectedTab}
        selectedIconUrl={selectedIconUrl}
        profile={profile}
        TAB_TYPE={this.TAB_TYPE}
        customIconUrl={customIconUrl}
        onClickMobileTooltip={this.onClickMobileTooltip}
      />
    );
  }
}

export default connect(
  state => ({ userinfo: state.userinfo }),
  {
    updateUserInfo: userInfoActions.updateUserInfo
  }
)(injectIntl(withRouter(Container)));
