import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { showPopUp } from "../../../../../../Common/Component/PopUp";
import { PAGETYPE } from "../../../../../../Common/Util/Constant";
import * as request from "../../../../../../Common/Util/HTTPRequest";
import View from "./View";
import PublishPopup from "../../../../../../Common/Component/Publish";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: [],
      keyword: "",
      myPublisheds: [],
      currentPage: 1,
    };
    this.pageSize = 15;
    this.projectsRef = React.createRef();
  }

  componentDidMount = () => {
    if (!this.props.email) return;
  };

  fetchMyPublisheds = async () => {
    console.log("fetchMyPublisheds");
    let { currentPage } = this.state;
    let pageOffset = Math.ceil((currentPage - 1) * this.pageSize);
    let params = {
      offset: pageOffset,
      limit: this.pageSize,
    };
    try {
      let res = await request.getMyPublishedSaasProject(params);
      let myPublished = await res.json();
      return myPublished.data.projectList;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // fetchMyPublisheds = async () => {
  //   let { currentPage, dataType, keyword } = this.state;
  //   let pageOffset = Math.ceil((currentPage - 1) * this.pageSize);

  //   let params = {
  //     type: dataType,
  //     email: this.props.email,
  //     offset: pageOffset,
  //     limit: this.isFirstFetchData ? 60 : this.pageSize,
  //     keyword
  //   };
  //   try {
  //     let res = await request.getPublishedProjectsByType(params);
  //     let myPublisheds = await res.json();
  //     return myPublisheds.rows.map(p => {
  //       p.type = p.project.type;
  //       return p;
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return [];
  //   }
  // };

  isFirstFetchData = () => {
    let { currentPage } = this.state;
    return currentPage === 1;
  };
  onClickShowProject = (pId) => {
    if (!pId) return;
    this.props.history.push(`?pId=${pId}`);
  };
  onClickProject = (pId, type) => {
    if (!pId) return;
    this.props.history.replace({
      pathname: `/${
        type === "js3d" ? PAGETYPE.BUILDER3D : PAGETYPE.BUILDER
      }/${pId}`,
    });
    type !== "js3d" && window.location.reload();
  };
  //TODO : have to refactoring
  handleOnScroll = () => {
    const container = this.projectsRef.current;
    console.log(
      "container.offsetHeight + container.scrollTop",
      container.offsetHeight + container.scrollTop
    );
    console.log("container.scrollHeight", container.scrollHeight);
    if (
      container.offsetHeight + container.scrollTop >=
      container.scrollHeight
    ) {
      this.setState(
        (prev) => ({
          currentPage: prev.currentPage + 1,
        }),
        async () => {
          let data = await this.fetchMyPublisheds();
          this.setState((prev) => ({
            myPublisheds: prev.myPublisheds.concat(data),
          }));
        }
      );
      // } else {
      //   alert("스크롤 이벤트 실패");
    }
  };
  handleProjectLive = async (published) => {
    published.live = !published.live;
    if (!published.tags) {
      published.tags = [];
    }
    try {
      await request.postPublishedProject(published);
      this.updateItemInfo(published);
    } catch (e) {
      console.error(e);
    }
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
  updateItemInfo = (params) => {
    this.setState((state) => ({
      myPublisheds: state.myPublisheds.map((item) => {
        if (item.pId === params.pId) {
          return {
            ...item,
            ...params,
          };
        } else {
          return item;
        }
      }),
    }));
  };

  //TODO : have to refactoring
  setFilteringData = (filteredType = [], keyword = "") => {
    this.setState(
      { currentPage: 1, dataType: filteredType, keyword },
      async () => {
        let data = await this.fetchMyPublisheds();
        this.setState({ myPublisheds: data });
      }
    );
  };
  render() {
    const { onClickProjectEdit, onClickDetailBtn, selectProject } = this.props;
    const {
      onClickProject,
      onClickShowProject,
      handleOnScroll,
      projectsRef,
      handleProjectLive,
      setFilteringData,
    } = this;
    const { myPublisheds } = this.state;
    return (
      <View
        myPublisheds={myPublisheds}
        setFilteringData={setFilteringData}
        onClickProject={onClickProject}
        onClickShowProject={onClickShowProject}
        handleOnScroll={handleOnScroll}
        projectsRef={projectsRef}
        handleProjectLive={handleProjectLive}
        onClickProjectEdit={onClickProjectEdit}
        onClickDetailBtn={onClickDetailBtn}
        selectProject={selectProject}
      />
    );
  }
}
export default connect(
  (state) => ({ email: state.userinfo.email }),
  {}
)(injectIntl(withRouter(Container)));
