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
      news: []
    };
    this.limit = 10;
  }
  componentDidMount = () => {
    this.fetchMyProjects();
    this.fetchMyPublished();
    this.fetchMyApk();
    this.fetchNews();
  };
  fetchNews = async () => {
    const params = { type: "builder", limit: 3, offset: 0 };
    try {
      let res = await request.getNewsList(params);
      let news = await res.json();
      this.setState({ news: news.rows || [] });
    } catch (error) {
      console.log(error);
      this.setState({ news: [] });
    }
  };
  fetchMyProjects = async () => {
    if (!this.props.email) return;
    let params = {
      email: this.props.email,
      offset: 0,
      limit: this.limit,
      keyword: ""
    };

    try {
      let res = await request.getDevelopingProjects(params);
      let myProjects = await res.json();
      this.setState({ myProjects: myProjects.rows || [] });
    } catch (error) {
      this.setState({ myProjects: [] });
      console.log(error);
    }
  };

  fetchMyPublished = async () => {
    if (!this.props.email) return;
    let params = {
      email: this.props.email,
      offset: 0,
      limit: this.limit
    };
    try {
      let res = await request.getPublishedProjectsByLive(params);
      let publisheds = await res.json();
      this.setState({
        myPublisheds:
          publisheds.rows.map(p => {
            p.type = p.project.type;
            return p;
          }) || []
      });
    } catch (error) {
      console.log(error);
      this.setState({ myPublisheds: [] });
    }
  };

  fetchMyApk = async () => {
    if (!this.props.email) return;
    try {
      let res = await request.getWizlabAPKs({ userId: this.props.userId });
      let apks = await res.json();
      if (apks.success) {
        this.setState({ myApks: apks.wizlabAPKs.slice(this.limit) || [] });
      }
    } catch (error) {
      console.log(error);
      this.setState({ myApks: [] });
    }
  };
  onClick2DGame = () => {
    showPopUp(<NewProjectPopup gameDimension="2D" email={this.props.email} />);
  };
  onClick3DGame = () => {
    showPopUp(<NewProjectPopup gameDimension="3D" email={this.props.email} />);
  };
  onClickMyProjectMore = () => {
    this.props.resetSelectProject();
    this.props.setCurrentPage("myProject");
  };
  onClickMyPublishedMore = () => {
    this.props.resetSelectProject();
    this.props.setCurrentPage("myPublished");
  };
  onClickMyApkMore = () => {
    this.props.setCurrentPage("myApk");
  };
  onClickProject = (pId, type) => {
    if (!pId) return;
    this.props.history.replace({
      pathname: `/${
        type === "js3d" ? PAGETYPE.BUILDER3D : PAGETYPE.BUILDER
      }/${pId}`
    });
    type !== "js3d" && window.location.reload();
  };
  onClickPublishProject = pId => {
    if (!pId) return;
    this.props.history.push(`?pId=${pId}`);
  };
  setSlickRef = ref => {
    this.slick = ref;
  };
  handlePrev = e => {
    e.preventDefault();
    this.slick.slickPrev();
  };
  handleNext = e => {
    e.preventDefault();
    this.slick.slickNext();
  };
  setProjectName = (pId, newName) => {
    this.setState(prev => ({
      myProjects: prev.myProjects.map((item, index) => {
        if (item.pId === pId) {
          item.name = newName;
        }
        return item;
      })
    }));
  };
  render() {
    const {
      handleEdit,
      onClickProjectEdit,
      onClickDetailBtn,
      selectProject,
      handleDelete,
      handleCopy
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
      setProjectName
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
        setProjectName={setProjectName}
      />
    );
  }
}
export default connect(
  state => ({ email: state.userinfo.email, userId: state.userinfo.id }),
  {}
)(injectIntl(withRouter(Container)));
