import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import onClickOutside from "react-onclickoutside";
import { PAGETYPE } from "../../../../Common/Util/Constant";
import * as request from "../../../../Common/Util/HTTPRequest";
import * as builderAction from "../../Store/Reducer/builder";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { isDropDownOpen: false };
  }

  onClickDropDownBtn = () => {
    const isDropDownOpen = !this.state.isDropDownOpen;
    this.setState({ isDropDownOpen });
  };
  handleClickOutside = () => {
    this.setState({ isDropDownOpen: false });
  };
  onBlurNameInput = input => {
    const projectName = input.value.trim();
    if (this.checkProjectNameValid(projectName)) {
      input.value = projectName;
      this.updateProjectName(this.props.pId, projectName);
    } else {
      input.value = this.props.projectName;
    }
  };
  checkProjectNameValid(name) {
    if (!name || name === "") {
      return false;
    }
    return true;
  }
  updateProjectName(pId, name) {
    request.updateDevelopingProject({ pId, name }).catch(e => console.error(e));
  }

  onClickMobileTest = () => {
    window.alert("준비 중입니다.");
  };
  onClickShare = () => {
    window.alert("준비 중입니다.");
  };
  onClickPublish = () => {
    this.props.setIsPublishOn(true);
  };
  onClickMain = () => {
    const didConfirm = window.confirm("다른 프로젝트를 보러 나갈까요?");
    if (didConfirm) {
      const { history } = this.props;
      history.push("/" + PAGETYPE.BUILDER);
    }
  };

  render() {
    const { pId, projectName, email } = this.props;
    const { isDropDownOpen } = this.state;
    const isNameInputDisabled = !pId;
    const loggedIn = !!email;
    return (
      <View
        projectName={projectName}
        isNameInputDisabled={isNameInputDisabled}
        loggedIn={loggedIn}
        isDropDownOpen={isDropDownOpen}
        onClickDropDownBtn={this.onClickDropDownBtn}
        onBlurNameInput={this.onBlurNameInput}
        onClickMobileTest={this.onClickMobileTest}
        onClickShare={this.onClickShare}
        onClickPublish={this.onClickPublish}
        onClickMain={this.onClickMain}
      />
    );
  }
}

export default connect(
  state => {
    const { project, userinfo } = state;
    const { pId } = project;
    const projectName = project.name;
    const email = userinfo ? userinfo.email : undefined;
    return { pId, projectName, email };
  },
  {
    setIsPublishOn: builderAction.setIsPublishOn
  }
)(injectIntl(withRouter(onClickOutside(Container))));
