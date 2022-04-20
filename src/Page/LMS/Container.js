import React, { Component } from "react";
import { connect } from "react-redux";
import View from "./View";
import { Course, RecommendedProject, TodayQuest } from "../../models";

function Container(props) {

  return <View {...props} />;
}

export default connect(
  (state) => ({ email: state.userinfo.email, userId: state.userinfo.id }),
  {}
)(Container);
