import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import View from "./View";
import * as request from "../../../../../../Common/Util/HTTPRequest";
import { PAGETYPE } from "../../../../../../Common/Util/Constant";
import { showPopUp } from "../../../../../../Common/Component/PopUp";
import NewProjectPopup from "../NewProjectPopup";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickDetailBtn: false,
      myProjects: [],
      myPublisheds: [],
      myApks: [],
      news: [],
    };
    this.limit = 10;
  }
  componentDidMount = () => {
    this.fetchMyProjects();
    this.fetchMyPublished();
  };
  fetchMyProjects = async () => {
    let params = { offset: 0, limit: 10 };

    try {
      let res = await request.getMySaasProject(params);
      let myProjects = await res.json();
      this.setState({ myProjects: myProjects.data.projectList || [] });
    } catch (error) {
      console.log(error);
      this.setState({ myProjects: [] });
    }
  };

  fetchMyPublished = async () => {
    let params = { offset: 0, limit: 10 };

    try {
      let res = await request.getMyPublishedSaasProject(params);
      let myProjects = await res.json();
      // console.log("myProjects", myProjects.data.projectList);
      this.setState({ myPublisheds: myProjects.data.projectList || [] });
    } catch (error) {
      console.log(error);
      this.setState({ myPublisheds: [] });
    }
  };

  onClick2DGame = () => {
    showPopUp(<NewProjectPopup gameDimension="2D" email={this.props.email} />);
  };

  onClickMyProjectMore = () => {
    this.props.resetSelectProject();
    this.props.setCurrentPage("myProject");
  };
  onClickMyPublishedMore = () => {
    this.props.resetSelectProject();
    this.props.setCurrentPage("myPublished");
  };

  onClickProject = (id) => {
    if (!id) return;
    this.props.history.replace({
      pathname: `/${id}`,
      // pathname: `/${PAGETYPE.BUILDER}/${id}`,
    });
    window.location.reload();
  };

  onClickPublishProject = (pId) => {
    if (!pId) return;
    this.props.history.push(`?pId=${pId}`);
  };
  setSlickRef = (ref) => {
    this.slick = ref;
  };
  handlePrev = (e) => {
    e.preventDefault();
    this.slick.slickPrev();
  };
  handleNext = (e) => {
    e.preventDefault();
    this.slick.slickNext();
  };
  setProjectName = (pId, newName) => {
    this.setState((prev) => ({
      myProjects: prev.myProjects.map((item, index) => {
        if (item.pId === pId) {
          item.name = newName;
        }
        return item;
      }),
    }));
  };
  render() {
    const {
      handleEdit,
      onClickProjectEdit,
      onClickDetailBtn,
      selectProject,
      handleDelete,
      handleCopy,
    } = this.props;
    const { myProjects, myPublisheds, myApks, news } = this.state;
    const {
      onClick2DGame,
      onClick3DGame,
      onClickMyProjectMore,
      onClickMyPublishedMore,
      onClickMyApkMore,
      onClickProject,
      onClickPublishProject,
      setSlickRef,
      handlePrev,
      handleNext,
      fetchMyProjects,
      setProjectName,
      fetchMyPublished,
    } = this;
    return (
      <View
        onClick2DGame={onClick2DGame}
        onClick3DGame={onClick3DGame}
        onClickMyProjectMore={onClickMyProjectMore}
        onClickMyPublishedMore={onClickMyPublishedMore}
        onClickMyApkMore={onClickMyApkMore}
        setSlickRef={setSlickRef}
        handlePrev={handlePrev}
        handleNext={handleNext}
        onClickDetailBtn={onClickDetailBtn}
        onClickProjectEdit={onClickProjectEdit}
        handleEdit={handleEdit}
        selectProject={selectProject}
        myProjects={myProjects}
        myPublisheds={myPublisheds}
        myApks={myApks}
        onClickProject={onClickProject}
        onClickPublishProject={onClickPublishProject}
        news={news}
        intl={this.props.intl}
        handleDelete={handleDelete}
        handleCopy={handleCopy}
        fetchMyProjects={fetchMyProjects}
        fetchMyPublished={fetchMyPublished}
        setProjectName={setProjectName}
      />
    );
  }
}
export default connect(
  (state) => ({ email: state.userinfo.email, userId: state.userinfo.id }),
  {}
)(injectIntl(withRouter(Container)));
