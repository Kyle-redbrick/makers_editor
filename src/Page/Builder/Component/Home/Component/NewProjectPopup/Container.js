import React, { Component } from "react";
import { injectIntl } from "react-intl";
import View from "./View";
import generatePID from "../../../../../../Common/Util/PIDGenerator";
import * as request from "../../../../../../Common/Util/HTTPRequest";
import { PAGETYPE } from "../../../../../../Common/Util/Constant";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorFormat: "text",
      projectName: ""
    };
  }
  componentDidMount = () => {
    this.setState({
      projectName: this.props.intl.formatMessage(
        { id: "ID_TIP_LAYOUT_NEW_PROJECT_FORMAT" },
        {
          randomChar: String.fromCharCode(
            Math.floor(Math.random() * Math.floor(48)) + 48
          )
        }
      )
    });
  };
  onChangeProjectName = e => {
    this.setState({ projectName: e.target.value });
  };

  onClickEditorFormat = type => {
    this.setState({ editorFormat: type });
  };
  onClickMake2DProject = () => {
    this.createNewProject();
  };

  createNewProject = async () => {
    let type =
      this.props.gameDimension === "3D"
        ? "js3d"
        : this.state.editorFormat === "text"
        ? "js"
        : "wizlabOOBC";

    let res = await request.getTemplateProjectsByType({ type });
    let template = await res.json();
    if (!template) return;
    let emptyTemplate = template.filter(
      item => item.description === "empty"
    )[0];
    if (!emptyTemplate) return;
    if (this.props.email) {
      this.createNewProjectFromServer(emptyTemplate.id);
    } else {
      let pageURL = `/${
        this.props.gameDimension === "3D"
          ? PAGETYPE.BUILDER3D
          : PAGETYPE.BUILDER
      }?t=${emptyTemplate.id}`;
      window.history.replaceState({}, "", pageURL);
      window.location.reload();
    }
  };

  createNewProjectFromServer = async templateId => {
    const { projectName } = this.state;
    let params = {
      pId: generatePID(this.props.email),
      email: this.props.email,
      name: projectName,
      templateId
    };
    try {
      const response = await request.postDevelopingProject(params);
      const project = await response.json();
      if (project) {
        let pageURL = `/${
          this.props.gameDimension === "3D"
            ? PAGETYPE.BUILDER3D
            : PAGETYPE.BUILDER
        }/${project.pId}`;

        window.history.replaceState({}, "", pageURL);
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { editorFormat, projectName } = this.state;
    const {
      onChangeProjectName,
      onClickEditorFormat,
      onClickMake2DProject
    } = this;
    const { gameDimension } = this.props;
    return (
      <View
        editorFormat={editorFormat}
        projectName={projectName}
        onChangeProjectName={onChangeProjectName}
        onClickEditorFormat={onClickEditorFormat}
        onClickMake2DProject={onClickMake2DProject}
        gameDimension={gameDimension}
      />
    );
  }
}
export default injectIntl(Container);
