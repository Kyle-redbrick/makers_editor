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

import NewProjectPopup from "./Component/NewProjectPopup";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageId: props.email ? "main" : "makingNew",
      selectProject: {},
    };
    if (!props.email) {
      this.pageList = [
        { title: "홈", id: "main", onImg: homeOnIcon, offImg: homeOffIcon },
        {
          title: "새로 만들기",
          id: "makingNew",
          onImg: createOnIcon,
          offImg: createOffIcon,
        },
        {
          title: "열기",
          id: "myProject",
          onImg: openOnIcon,
          offImg: openOffIcon,
        },
        {
          title: "퍼블리싱 앱",
          id: "myPublished",
          onImg: publishingOnIcon,
          offImg: publishingOffIcon,
        },
      ];
    } else {
      this.pageList = [
        {
          title: "새로 만들기",
          id: "makingNew",
          onImg: createOnIcon,
          offImg: createOffIcon,
        },
      ];
    }
  }
  onClickPage = (pageId) => {
    if (pageId === "makingNew") {
      showPopUp(<NewProjectPopup gameDimension="2D" />);
    }
    this.resetSelectProject();
    this.setCurrentPage(pageId);
  };

  setCurrentPage = (pageId) => {
    this.setState({ currentPageId: pageId });
  };

  resetSelectProject = () => {
    this.setState({ selectProject: {} });
  };

  handleEdit = (id, callback1, callback2) => {
    this.resetSelectProject();
    showPopUp(
      <PopUp.OneInput
        titleId="ID_PROJECT_POPUP_EDIT_TITLE"
        buttonNameId="ID_PROJECT_POPUP_EDIT_OK"
        buttonAction={(newVal) => {
          this.editProject(id, newVal, callback1, callback2);
        }}
      />,
      { dismissOverlay: true }
    );
  };
  editProject = (id, title, callback1, callback2) => {
    this.resetSelectProject();
    const params = {
      title: title,
    };
    request
      .updateSaasProject({ params, pId: id })
      .then((res) => res.json())
      .then(() => {
        callback1();
        callback2();
      });
  };
  onClickProjectEdit = (published) => {
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
  onClickDetailBtn = (id, type) => {
    if (this.state.selectProject.id === id) {
      this.resetSelectProject();
    } else {
      this.setState({ selectProject: { id, type } });
    }
  };

  handleDelete = async (id, callback1, callback2) => {
    this.resetSelectProject();
    request
      .deleteSaasProject(id)
      .then((res) => res.json())
      .then(() => {
        callback1();
        callback2();
      });
    // await request.deleteDevelopingProject({
    //   pId,
    //   email: this.props.email,
    // });
    // request
    //   .deleteDevelopingProject({ pId, email: this.props.email })
    //   .then((res) => res.json())
    //   .then(() => {
    //     callback();
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  };
  handleCopy = async (pId, callback1, callback2) => {
    console.log("copy 예정");
    // const res = await request.getDevelopingProject({ pId });
    // const project = await res.json();
    // if (project) {
    //   const param = {
    //     pId: generatePID(this.props.email),
    //     email: project.email,
    //     icon: project.icon,
    //     name: `${project.name} copy`,
    //     state: project.state,
    //     url: project.url,
    //     useCustomIcon: project.useCustomIcon,
    //   };
    //   request
    //     .copyDevelopingProject({ param })
    //     .then((res) => res.json())
    //     .then(() => {
    //       callback();
    //     })
    //     .catch((e) => console.error(e));
    // }
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
      handleCopy,
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
  (state) => ({ email: state.userinfo.email, userId: state.userinfo.id }),
  {}
)(injectIntl(withRouter(Container)));
