import React, { Component } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Redirect } from "react-router-dom";
import View from "./View";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";
import * as action from "../../../../Common/Store/Reducer/UserInfo";
import ApkPayLinkPopup from "../APKPayLinkPopup";

class Container extends Component {
  constructor(props) {
    super(props);

    this.CREATINGPROCESS_TYPE = {
      GUIDE: "GUIDE",
      SELECTAPP: "SELECTAPP",
      APPINFO: "APPINFO",
      MAKING: "MAKING"
    };

    this.state = {
      currentProcessType: this.CREATINGPROCESS_TYPE.GUIDE,
      projects: [],
      projectTotalCount: 0,
      selectedProject: undefined,
      apkInfo: undefined
    };
  }

  componentDidMount = async () => {
    this.setProjects();
    this.checkTicket();
  };

  checkTicket = async () => {
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
          onCancel={() => {
            this.props.history.replace("/myapk");
          }}
        />,
        { defaultPadding: false, mobileFullscreen: true }
      );
      return;
    }
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

  setProjects = async () => {
    const json = await this.getPublishedProjects();
    if (!json || !json.success) {
      // error handling for user exercise (ex. popup)
      return;
    }
    const projectInfo = {
      projects: json.projects,
      projectTotalCount: json.projectTotalCount
    };
    await this.setProjectToState(projectInfo);
  };

  getPublishedProjects = async () => {
    const json = await request
      .getPublishedProjectsByUserWithOffset({
        userId: this.props.userinfo.id,
        limit: 200,
        offset: this.state.projectTotalCount
      })
      .then(res => res.json())
      .catch(e => {
        console.error(e.message);
        return undefined;
      });
    return json;
  };

  setProjectToState = projectInfo => {
    const { projects, projectTotalCount } = projectInfo;
    return new Promise(resolve =>
      this.setState(
        {
          projects: [...this.state.projects, ...projects],
          projectTotalCount
        },
        resolve
      )
    );
  };

  handleNextProcessType = async (processType, payload) => {
    switch (processType) {
      case this.CREATINGPROCESS_TYPE.GUIDE:
        this.setNextProcess();
        break;
      case this.CREATINGPROCESS_TYPE.SELECTAPP:
        const { selectedProject } = payload;
        if (!selectedProject) return;
        await this.setSelectedProjectToState(selectedProject);
        this.setNextProcess();
        break;

      case this.CREATINGPROCESS_TYPE.APPINFO:
        const { appName, appIcon, packageName } = payload;
        if (!appName || !appIcon || !packageName) return;
        await this.setAPKInfoToState(payload);
        if (!this.state.apkInfo || !this.state.selectedProject) return;
        await this.createAPK();
        break;
      default:
        break;
    }
  };

  createAPK = async () => {
    const createdAPKInfo = await this.postCreateWizlabAPK();
    if (!createdAPKInfo || !createdAPKInfo.success) {
      // error handling
      showPopUp(<PopUp.OneButton title="실패" />);
      return;
    }
    this.props.updateUserInfo({
      apkTicket: this.props.userinfo.apkTicket - 1
    });
    this.setNextProcess();
  };

  postCreateWizlabAPK = async () => {
    const { packageName, appName, appIcon } = this.state.apkInfo;
    const json = await request
      .createWizlabAPK({
        userId: this.props.userinfo.id,
        packageName,
        appName,
        appIcon,
        pId: this.state.selectedProject.pId
      })
      .then(res => res.json())
      .catch(e => {
        console.error(e);
        return undefined;
      });
    return json;
  };

  setSelectedProjectToState = selectedProject => {
    return new Promise(resolve =>
      this.setState(
        {
          selectedProject
        },
        resolve
      )
    );
  };

  setAPKInfoToState = apkInfo => {
    return new Promise(resolve =>
      this.setState(
        {
          apkInfo
        },
        resolve
      )
    );
  };

  setNextProcess = () => {
    const processes = Object.keys(this.CREATINGPROCESS_TYPE);
    const { currentProcessType } = this.state;
    const currentProcessIndex = processes.indexOf(currentProcessType);
    if (currentProcessIndex + 1 >= processes.length) return;
    const nextProcessIndex = currentProcessIndex + 1;
    this.setProcessTypeToState(processes[nextProcessIndex]);
  };
  setProcessTypeToState = processType => {
    this.setState({
      currentProcessType: processType
    });
  };

  onClickMovableProcess = async processType => {
    this.checkTicket();
    await this.setSelectedProjectToState(null);
    this.setProcessTypeToState(processType);
  };

  render() {
    if (!this.props.userinfo.email) {
      return <Redirect to="/" />;
    }
    const {
      projects,
      selectedProject,
      currentProcessType,
      apkInfo
    } = this.state;

    return (
      <View
        intl={this.props.intl}
        CREATINGPROCESS_TYPE={this.CREATINGPROCESS_TYPE}
        currentProcessType={currentProcessType}
        projects={projects}
        selectedProject={selectedProject}
        handleNextProcessType={this.handleNextProcessType}
        apkInfo={apkInfo}
        history={this.props.history}
        onClickMovableProcess={this.onClickMovableProcess}
      />
    );
  }
}

export default connect(
  state => ({ userinfo: state.userinfo }),
  {
    updateUserInfo: action.updateUserInfo
  }
)(injectIntl(Container));
