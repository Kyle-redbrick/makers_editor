import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import View from "./View";
import * as request from "../../../../Common/Util/HTTPRequest";
import { PAGETYPE } from "../../../../Common/Util/Constant";
import generatePID from "../../../../Common/Util/PIDGenerator";
import * as TrackingUtil from "../../../../Common/Util/TrackingUtil";
import store from "../../Store";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";
import { withRouter } from "react-router-dom";
export const PROJECT_CATEGORY = { NEW: "NEW", LOAD: "LOAD" };

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myprojects: [],
      myprojectCnt: undefined,
      currentPage: 1,
      keyword: "",
      templateProjects: [],
      projectItemWidth: 180,
      lastItemIndex: 0, // for More Popup Position

      isLoading: false
    };
    this.pageSize = 50;
    this.projectsRef = React.createRef();
    this.templateId = localStorage.getItem("templateId");
  }

  componentDidMount = () => {
    this.getMyProjects({ currentPage: 1, keyword: "" });
    request
      .getTemplateProjects()
      .then(res => res.json())
      .then(json => {
        this.setState({ templateProjects: json }, () => {
          this.loadTemplateByHome();
        });
      })
      .catch(e => {
        console.error(e);
      });
    this.onSizeChange();
    window.addEventListener("resize", this.onSizeChange);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.onSizeChange);
    localStorage.removeItem("templateId");
  };

  onSizeChange = () => {
    if (!document.getElementById("ProjectItems")) return;
    const wrapWidth = document
      .getElementById("ProjectItems")
      .getBoundingClientRect().width;
    const unitWidth = 180;
    const itemCount = parseInt(wrapWidth / 200);
    const extraWidth = wrapWidth % 200;
    const projectItemWidth = unitWidth + extraWidth / itemCount;

    this.setState({
      projectItemWidth,
      lastItemIndex: itemCount
    });
  };

  getMyProjects = props => {
    if (!this.props.email) return;
    let { currentPage, keyword } = props;
    let pageOffset = Math.ceil((currentPage - 1) * this.pageSize);
    let limit = this.pageSize;
    keyword = encodeURIComponent(keyword);

    let params = {
      email: this.props.email,
      offset: pageOffset,
      limit: limit,
      keyword: keyword
    };
    request
      .getDevelopingProjects(params)
      .then(res => res.json())
      .then(result => {
        const { count, rows } = result;
        this.setState(prev => {
          return {
            myprojects: currentPage === 1 ? rows : prev.myprojects.concat(rows),
            myprojectCnt: count
          };
        });
      })
      .catch(err => console.error(err));
  };
  createNewProject = template => {
    const { email } = this.props;
    const is3dProject = template.type === "js3d";
    if (email) {
      const isEmptyTemplete = template.order === 0;
      TrackingUtil.sendGAEvent({
        category: "Builder",
        action: `Create${isEmptyTemplete ? "New" : "Templete"}Project`,
        label: isEmptyTemplete ? undefined : template.name
      });
      let pageURL = `/${
        is3dProject ? PAGETYPE.BUILDER3D : PAGETYPE.BUILDER
      }/${generatePID(email)}`;
      if (template.id) {
        pageURL += `/${template.id}`;
      }

      this.props.history.replace({
        pathname: pageURL
      });
      if (!is3dProject) window.location.reload();
    } else {
      let pageURL = `/${
        is3dProject ? PAGETYPE.BUILDER3D : PAGETYPE.BUILDER
      }?t=${template.id}`;

      this.props.history.replace({
        pathname: pageURL
      });
      window.location.reload();
    }
  };

  loadProject = (pId, type) => {
    const is3dProject = type === "js3d";
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `LoadProject`
    });
    this.props.history.replace({
      pathname: `/${is3dProject ? PAGETYPE.BUILDER3D : PAGETYPE.BUILDER}/${pId}`
    });
    if (!is3dProject) window.location.reload();
  };

  loadMore = () => {
    this.setState(
      prev => {
        return { currentPage: prev.currentPage + 1 };
      },
      () => {
        this.getMyProjects({
          currentPage: this.state.currentPage,
          keyword: this.state.keyword
        });
      }
    );
  };

  loadTemplateByHome = () => {
    if (this.templateId && this.state.templateProjects.length > 0) {
      this.state.templateProjects.forEach(element => {
        if (element.id === Number(this.templateId)) {
          this.createNewProject(element);
          localStorage.removeItem("templateId");
          return;
        }
      });
    }
  };

  handleKeywordChange = e => {
    this.setState({ keyword: e.target.value, currentPage: 1 }, () => {
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
      }
      this.searchTimer = setTimeout(() => {
        TrackingUtil.sendGAEvent({
          category: "Builder",
          action: `SearchProject`
        });

        this.getMyProjects({
          currentPage: this.state.currentPage,
          keyword: this.state.keyword
        });
      }, 500);
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
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `ProjectActions`,
      label: "Copy"
    });
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
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `ProjectActions`,
      label: "Edit"
    });
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
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `ProjectActions`,
      label: "Remove"
    });
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
        this.getMyProjects({
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
        this.getMyProjects({
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
        this.getMyProjects({
          currentPage: this.state.currentPage,
          keyword: this.state.keyword
        });
      })
      .catch(e => console.error(e));
  };

  render() {
    const {
      canClose,
      closeProjectPopup,
      intl,
      userId,
      email,
      pageType
    } = this.props;
    const {
      myprojects,
      myprojectCnt,
      templateProjects,
      keyword,
      projectItemWidth,
      lastItemIndex
    } = this.state;
    const {
      getMyProjects,
      pageSize,
      createNewProject,
      handleKeywordChange,
      handleOnScroll,
      projectsRef,
      loadProject,
      handleCopy,
      handleEdit,
      handleRemove
    } = this;
    return (
      <View
        canClose={canClose}
        closeProjectPopup={closeProjectPopup}
        getMyProjects={getMyProjects}
        myprojects={myprojects}
        myprojectCnt={myprojectCnt}
        pageSize={pageSize}
        templateProjects={templateProjects}
        keyword={keyword}
        createNewProject={createNewProject}
        handleKeywordChange={handleKeywordChange}
        handleOnScroll={handleOnScroll}
        loadProject={loadProject}
        handleCopy={handleCopy}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
        intl={intl}
        projectsRef={projectsRef}
        projectItemWidth={projectItemWidth}
        lastItemIndex={lastItemIndex}
        userId={userId}
        email={email}
        pageType={pageType}
      />
    );
  }
}

export default connect(
  state => ({ email: state.userinfo.email, userId: state.userinfo.id }),
  {}
)(injectIntl(withRouter(Container)));
