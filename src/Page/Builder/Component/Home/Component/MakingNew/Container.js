import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import View from "./View";
import NewProjectPopup from "../NewProjectPopup";
import { showPopUp } from "../../../../../../Common/Component/PopUp";
import * as request from "../../../../../../Common/Util/HTTPRequest";
import { PAGETYPE } from "../../../../../../Common/Util/Constant";
import generatePID from "../../../../../../Common/Util/PIDGenerator";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: [],
      dataType: [],
      keyword: ""
    };
  }
  fetchTemplates = async () => {
    const { dataType, keyword } = this.state;
    try {
      let res = await request.getTemplateProjectsByKeyword({
        type: dataType,
        keyword
      });
      let templates = await res.json();
      if (templates) {
        templates = templates.rows.filter(item => item.description !== "empty");
        this.setState({ templates });
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  onClick2DGame = () => {
    showPopUp(<NewProjectPopup gameDimension="2D" email={this.props.email} />);
  };

  onClick3DGame = () => {
    showPopUp(<NewProjectPopup gameDimension="3D" email={this.props.email} />);
  };

  onClickProject = templateId => {
    if (!templateId) return;
    let pageURL;
    if (this.props.email) {
      pageURL = `/${PAGETYPE.BUILDER}/${generatePID(
        this.props.email
      )}/${templateId}`;
    } else {
      pageURL = `/${PAGETYPE.BUILDER}?t=${templateId}`;
    }
    this.props.history.replace({
      pathname: pageURL
    });
    window.location.reload();
  };

  setFilteringData = (filteredType = [], keyword = "") => {
    this.setState({ dataType: filteredType, keyword }, () => {
      this.fetchTemplates();
    });
  };
  render() {
    const {
      onClick2DGame,
      onClick3DGame,
      onClickProject,
      setFilteringData
    } = this;
    const { templates } = this.state;

    return (
      <View
        onClick2DGame={onClick2DGame}
        onClick3DGame={onClick3DGame}
        templates={templates}
        onClickProject={onClickProject}
        intl={this.props.intl}
        setFilteringData={setFilteringData}
      />
    );
  }
}
export default connect(
  state => ({ email: state.userinfo.email }),
  {}
)(injectIntl(withRouter(Container)));
