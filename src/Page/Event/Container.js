import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../Common/Store/Reducer/UserInfo";
import View from "./View";

function Container(props) {

  return (
    <View {...props} />
  );
}
export default connect(
  state => ({ 
    userinfo: state.userinfo
  }, 
  { updateUserInfo: action.updateUserInfo}),
  {})(Container);
