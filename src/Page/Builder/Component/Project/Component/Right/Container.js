import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { PAGETYPE } from "../../../../../../Common/Util/Constant";
import * as request from "../../../../../../Common/Util/HTTPRequest";
import generatePID from "../../../../../../Common/Util/PIDGenerator";
import PopUp, { showPopUp } from "../../../../../../Common/Component/PopUp";
import store from "../../../../Store/";

import View from "./View";
/* this container is not used */
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      keyword: "",
      templateProjects: []
    };
    this.projectsRef = React.createRef();
  }

  componentDidMount() {
    request
      .getTemplateProjects()
      .then(res => res.json())
      .then(json => {
        this.setState({ templateProjects: json });
      })
      .catch(e => {
        console.error(e);
      });
  }

  createNewProject = templateId => {
    const { email } = this.props;
    let pageURL = `/${PAGETYPE.BUILDER}/${generatePID(email)}`;
    if (templateId) {
      pageURL += `/${templateId}`;
    }

    this.props.history.replace({
      pathname: pageURL
    });
    window.location.reload();
  };

  loadProject = pId => {
    this.props.history.replace({
      pathname: `/${PAGETYPE.BUILDER}/${pId}`
    });
    window.location.reload();
  };

  loadMore = () => {
    this.setState(
      prev => {
        return { currentPage: prev.currentPage + 1 };
      },
      () => {
        this.props.getMyProjects({
          currentPage: this.state.currentPage,
          keyword: this.state.keyword
        });
      }
    );
  };

  handleKeywordChange = e => {
    this.setState({ keyword: e.target.value, currentPage: 1 }, () => {
      this.props.getMyProjects({
        currentPage: this.state.currentPage,
        keyword: this.state.keyword
      });
    });
  };

  handleOnScroll = () => {
    const container = this.projectsRef.current;
    if (
      container.offsetHeight + container.scrollTop >=
      container.scrollHeight
    ) {
      this.loadMore();
    }
  };

  handleCopy = pId => {
    showPopUp(
      <PopUp.TwoButton
        titleId="ID_PROJECT_POPUP_COPY_TITLE"
        cancelButtonNameId="ID_PROJECT_POPUP_COPY_CANCEL"
        confirmButtonNameId="ID_PROJECT_POPUP_COPY_OK"
        confirmAction={() => this.copyProject(pId)}
        darkMode={true}
      />,
      { store, dismissOverlay: true }
    );
  };
  handleEdit = (pId, name) => {
    showPopUp(
      <PopUp.OneInput
        titleId="ID_PROJECT_POPUP_EDIT_TITLE"
        defaultInput={name}
        buttonNameId="ID_PROJECT_POPUP_EDIT_OK"
        buttonAction={newVal => {
          this.editProject(pId, newVal);
        }}
      />,
      { store, dismissOverlay: true }
    );
  };
  handleRemove = (pId, name) => {
    showPopUp(
      <PopUp.TwoButton
        titleId="ID_PROJECT_POPUP_DELETE_TITLE"
        titleValue={{ projectName: name }}
        subtitleId="ID_PROJECT_POPUP_DELETE_SUB_TITLE"
        cancelButtonNameId="ID_PROJECT_POPUP_DELETE_CANCEL"
        confirmButtonNameId="ID_PROJECT_POPUP_DELETE_OK"
        confirmAction={() => this.deleteProject(pId)}
      />,
      { store, dismissOverlay: true }
    );
  };

  deleteProject = pId => {
    request
      .deleteDevelopingProject({ pId, email: this.props.email })
      .then(res => res.json())
      .then(json => {
        this.props.getMyProjects({
          currentPage: this.state.currentPage,
          keyword: this.state.keyword
        });
      })
      .catch(e => {
        console.error(e);
      });
  };

  copyProject = async pId => {
    let project = await request
      .getDevelopingProject({ pId })
      .then(res => res.json());
    let param = {
      pId: generatePID(this.props.email),
      email: project.email,
      icon: project.icon,
      name: `${project.name} copy`,
      state: project.state,
      url: project.url,
      useCustomIcon: project.useCustomIcon
    };

    request
      .copyDevelopingProject({ param })
      .then(res => res.json())
      .then(json => {
        this.props.getMyProjects({
          currentPage: this.state.currentPage,
          keyword: this.state.keyword
        });
      })
      .catch(e => console.error(e));
  };

  editProject = (pId, newName) => {
    request
      .updateDevelopingProject({ pId, name: newName })
      .then(res => res.json)
      .then(json => {
        this.props.getMyProjects({
          currentPage: this.state.currentPage,
          keyword: this.state.keyword
        });
      })
      .catch(e => console.error(e));
  };
  render() {
    const { category, myprojects, myprojectCnt, intl } = this.props;
    const {
      createNewProject,
      handleKeywordChange,
      handleOnScroll,
      projectsRef,
      loadProject,
      handleCopy,
      handleEdit,
      handleRemove
    } = this;
    const { keyword, templateProjects } = this.state;
    return (
      <View
        templateProjects={templateProjects}
        projectsRef={projectsRef}
        category={category}
        createNewProject={createNewProject}
        myprojects={myprojects}
        myprojectCnt={myprojectCnt}
        keyword={keyword}
        handleKeywordChange={handleKeywordChange}
        handleOnScroll={handleOnScroll}
        loadProject={loadProject}
        handleCopy={handleCopy}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
        intl={intl}
      />
    );
  }
}

export default connect(
  state => ({
    email: state.userinfo.email
  }),
  {}
)(withRouter(injectIntl(Container)));
