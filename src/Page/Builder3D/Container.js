import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as projectActions from "./Store/Reducer/project";
import * as request from "../../Common/Util/HTTPRequest";
import { PAGETYPE } from "../../Common/Util/Constant";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  async componentDidMount() {
    const pId = this.getPId();
    const { email } = this.props;
    if (pId) {
      if (email) {
        const project = await this.loadDevelopingProject(pId);
        if (project.email === email) {
          this.setProject(project);
        } else {
          this.replaceToBuilderMain(true);
        }
      } else {
        this.replaceToBuilderMain(true);
      }
    } else {
      if (email) {
        this.replaceToBuilderMain();
      } else {
        const templateId = this.getTemplateIdFromQueryParams();
        if (templateId) {
          const templateProject = await this.loadTemplateProject(templateId);
          this.setProject(templateProject);
        } else {
          this.replaceToBuilderMain();
        }
      }
    }
  }
  getPId() {
    const { match } = this.props;
    return match.params.pId;
  }
  getTemplateIdFromQueryParams() {
    const { location } = this.props;
    const urlParams = new URLSearchParams(location.search);
    const templateId = urlParams.get("t");
    return templateId;
  }

  async loadDevelopingProject(pId) {
    let project = await request
      .getDevelopingProject({ pId })
      .then(res => res.json());
    if (!project) {
      project = await this.createDevelopingProject(pId);
    }
    return project;
  }
  async createDevelopingProject(pId) {
    const { email } = this.props;
    const name = "새 3D 프로젝트";
    const type = "js3d";
    const templateId = this.getTemplateIdFromUrlParams();
    const params = { pId, email, name, type, templateId };
    const project = await request
      .postDevelopingProject(params)
      .then(res => res.json());
    return project;
  }
  getTemplateIdFromUrlParams() {
    const { match } = this.props;
    return match.params.templateId;
  }
  async loadTemplateProject(templateId) {
    const templateProject = await request
      .getDefaultTemplateProject({ id: templateId })
      .then(res => res.json());
    return templateProject;
  }
  setProject(project) {
    this.setBrowserTitle(project.name);
    project.state = JSON.parse(project.state);
    // AssetLibrary.loadAssetsFromScene(project.state.scene, () => {
    this.props.setProject(project);
    this.setState({ isLoading: false });
    // });
  }
  setBrowserTitle = title => {
    document.title = `wizclass`;
    if (title) document.title += ` - ${title}`;
  };
  replaceToBuilderMain(shouldAlert = false) {
    if (shouldAlert) {
      alert("잘못된 접근입니다.");
    }
    const { history } = this.props;
    history.replace("/" + PAGETYPE.BUILDER);
  }

  render() {
    const { isLoading } = this.state;
    return <View isLoading={isLoading} pageType={PAGETYPE.BUILDER3D} />;
  }
}

export default connect(
  state => ({ email: state.userinfo.email }),
  { setProject: projectActions.setProject }
)(withRouter(Container));
