import React, { Component } from "react";
import { connect } from "react-redux";
import View from "./View";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";
import SignUp from "../../../../Common/Component/SignUp";

class Container extends Component {
  handleSignup = () => {
    if (this.props.userinfo.email) {
      showPopUp(
        <PopUp.OneButton
          title="신규회원 전용 이벤트입니다."
          buttonName="확인"
        />,
        {
          darkmode: true,
          mobileFullScreen: true
        }
      );
    } else {
      showPopUp(<SignUp />, {
        darkmode: true,
        dismissOverlay: true,
        mobileFullScreen: true,
        scrollable: true
      });
    }
  };

  render() {
    return <View handleSignup={this.handleSignup} />;
  }
}
export default connect(
  state => ({
    userinfo: state.userinfo
  }),
  {}
)(Container);
