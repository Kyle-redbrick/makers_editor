import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import * as request from "../../../../Common/Util/HTTPRequest";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";
import PublishPopup from "../../../../Common/Component/Publish";
import generatePID from "../../../../Common/Util/PIDGenerator";

import View from "./View";

import homeOnIcon from "../../../../Image/icon-home-pressed.svg";
import homeOffIcon from "../../../../Image/icon-home-default.svg";
import createOnIcon from "../../../../Image/icon-create-pressed.svg";
import createOffIcon from "../../../../Image/icon-create-default.svg";
import openOnIcon from "../../../../Image/icon-open-pressed.svg";
import openOffIcon from "../../../../Image/icon-open-default.svg";
import publishingOnIcon from "../../../../Image/icon-publishing-pressed.svg";
import publishingOffIcon from "../../../../Image/icon-publishing-default.svg";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageId: props.email ? "main" : "makingNew",
      selectProject: {}
    };
    if (props.email) {
      this.pageList = [
        { title: "홈", id: "main", onImg: homeOnIcon, offImg: homeOffIcon },
        {
          title: "새로 만들기",
          id: "makingNew",
          onImg: createOnIcon,
          offImg: createOffIcon
        },
        {
          title: "열기",
          id: "myProject",
          onImg: openOnIcon,
          offImg: openOffIcon
        },
        {
          title: "퍼블리싱 앱",
          id: "myPublished",
          onImg: publishingOnIcon,
          offImg: publishingOffIcon
        }
      ];
    } else {
      this.pageList = [
        {
          title: "새로 만들기",
          id: "makingNew",
          onImg: createOnIcon,
          offImg: createOffIcon
        }
      ];
    }
  }
  onClickPage = pageId => {
    this.resetSelectProject();
    this.setCurrentPage(pageId);
  };

  setCurrentPage = pageId => {
    this.setState({ currentPageId: pageId });
  };

  resetSelectProject = () => {
    this.setState({ selectProject: {} });
  };

  handleEdit = (pId, name, callback) => {
    this.resetSelectProject();
    showPopUp(
      <PopUp.OneInput
        titleId="ID_PROJECT_POPUP_EDIT_TITLE"
        defaultInput={name}
        buttonNameId="ID_PROJECT_POPUP_EDIT_OK"
        buttonAction={newVal => {
          this.editProject(pId, newVal, callback);
        }}
      />,
      { dismissOverlay: true }
    );
  };
  editProject = (pId, newName, callback) => {
    this.resetSelectProject();
    request
      .updateDevelopingProject({ pId, name: newName })
      .then(res => res.json)
      .then(json => {
        callback(pId, newName);
        // this.getMyProjects({
        //   currentPage: this.state.currentPage,
        //   keyword: this.state.keyword
        // });
      })
      .catch(e => console.error(e));
  };
  onClickProjectEdit = published => {
    showPopUp(
      <PublishPopup
        pId={published.pId}
        isDeveloping={false}
        publishCallback={this.updateItemInfo}
        isBuilder={true}
      />,
      { defaultPadding: false, scrollable: true }
    );
  };
  onClickDetailBtn = (pId, type) => {
    if (this.state.selectProject.pId === pId) {
      this.resetSelectProject();
    } else {
      this.setState({ selectProject: { pId, type } });
    }
  };

  handleDelete = async (pId, callback) => {
    await request.deleteDevelopingProject({
      pId,
      email: this.props.email
    });
    // let result = await res.json();
    request
      .deleteDevelopingProject({ pId, email: this.props.email })
      .then(res => res.json())
      .then(() => {
        callback();
      })
      .catch(e => {
        console.error(e);
      });
  };
  handleCopy = async (pId, callback) => {
    const res = await request.getDevelopingProject({ pId });
    const project = await res.json();
    if (project) {
      const param = {
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
        .then(() => {
          callback();
        })
        .catch(e => console.error(e));
    }
  };

  render() {
    const { canClose, closeProjectPopup } = this.props;
    const {
      pageList,
      onClickPage,
      setCurrentPage,
      handleEdit,
      onClickProjectEdit,
      onClickDetailBtn,
      resetSelectProject,
      handleDelete,
      handleCopy
    } = this;
    const { currentPageId, selectProject } = this.state;
    return (
      <View
        pageList={pageList}
        onClickPage={onClickPage}
        currentPageId={currentPageId}
        setCurrentPage={setCurrentPage}
        canClose={canClose}
        closeProjectPopup={closeProjectPopup}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleCopy={handleCopy}
        onClickProjectEdit={onClickProjectEdit}
        resetSelectProject={resetSelectProject}
        onClickDetailBtn={onClickDetailBtn}
        selectProject={selectProject}
      />
    );
  }
}
export default connect(
  state => ({ email: state.userinfo.email, userId: state.userinfo.id }),
  {}
)(injectIntl(withRouter(Container)));
