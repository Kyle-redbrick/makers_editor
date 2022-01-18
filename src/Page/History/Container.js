import React, { Component } from "react";
import View from "./View";
import * as userInfoActions from "../../Common/Store/Reducer/UserInfo";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { injectIntl } from "react-intl";
// import * as TrackingUtil from "../../Common/Util/TrackingUtil";

class Container extends Component {
  componentDidMount() {
    // TrackingUtil.sendPageEvent("point", this.props.userinfo.email);
  }
  render() {
    if (!this.props.userinfo.email) {
      return <Redirect to="/" />;
    }

    return <View />;
  }
}

export default connect(
  state => ({ userinfo: state.userinfo }),
  {
    updateUserInfo: userInfoActions.updateUserInfo
  }
)(injectIntl(withRouter(Container)));
