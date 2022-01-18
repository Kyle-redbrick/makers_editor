import React, { Component } from "react";
import View from "./View";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as request from "../../../../Common/Util/HTTPRequest";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";

class Container extends Component {
  constructor(props) {
    super(props);
    this.tabType = { all: "전체", text: "텍스트 코딩", block: "블록 코딩" };

    this.state = {
      news: [],
      newsType: "all",
      newsPage: 0,
      populars: [],
      popularsType: "all",
      popularsPage: 0,
      limit: 10
    };
  }
  componentDidMount = () => {
    this.getNewProjects();
    this.getPopularProjects();
  };

  handleNewsTab = type => {
    this.setState(
      {
        newsType: type,
        newsPage: 0,
        news: []
      },
      () => {
        this.getNewProjects();
      }
    );
  };
  handlePopularsTab = type => {
    this.setState({ popularsType: type, popularsPage: 0, populars: [] }, () => {
      this.getPopularProjects();
    });
  };

  getNewProjects = () => {
    const { news, newsType, newsPage, limit } = this.state;
    request
      .getOcp2ChallengeNews({
        type: newsType,
        limit: limit,
        offset: limit * newsPage
      })
      .then(res => res.json())
      .then(json => {
        this.setState({
          news: news.concat(json)
        });
      });
  };

  handleNewsMore = () => {
    const { newsPage } = this.state;
    this.setState({ newsPage: newsPage + 1 }, () => {
      this.getNewProjects();
    });
  };

  handlePopularsMore = () => {
    const { popularsPage } = this.state;
    this.setState({ popularsPage: popularsPage + 1 }, () => {
      this.getPopularProjects();
    });
  };

  getPopularProjects = () => {
    const { populars, popularsType, popularsPage, limit } = this.state;

    request
      .getOcp2ChallengePopulars({
        type: popularsType,
        limit: limit,
        offset: limit * popularsPage
      })
      .then(res => res.json())
      .then(json => {
        this.setState({
          populars: populars.concat(json)
        });
      });
  };

  openFinished = () => {
    showPopUp(
      <PopUp.OneButton
        title={"챌린지 참여기간이 아닙니다."}
        buttonName={"확인"}
      />,
      {
        darkmode: true,
        dismissButton: false,
        dismissOverlay: true
      }
    );
  };

  render() {
    const {
      news,
      newsType,
      newsPage,
      populars,
      popularsType,
      popularsPage,
      limit
    } = this.state;
    const {
      handleNewsTab,
      tabType,
      handlePopularsTab,
      handleNewsMore,
      handlePopularsMore,
      openFinished
    } = this;
    let isNewsShowMore = limit * (newsPage + 1) === news.length;
    let isPopularsShowMore = limit * (popularsPage + 1) === populars.length;
    return (
      <View
        news={news}
        populars={populars}
        tabType={tabType}
        handleNewsTab={handleNewsTab}
        handlePopularsTab={handlePopularsTab}
        handleNewsMore={handleNewsMore}
        newsType={newsType}
        newsPage={newsPage}
        popularsType={popularsType}
        popularsPage={popularsPage}
        handlePopularsMore={handlePopularsMore}
        limit={limit}
        isNewsShowMore={isNewsShowMore}
        isPopularsShowMore={isPopularsShowMore}
        openFinished={openFinished}
      />
    );
  }
}

export default connect(
  state => ({ userinfo: state.userinfo }),
  {}
)(injectIntl(Container));
