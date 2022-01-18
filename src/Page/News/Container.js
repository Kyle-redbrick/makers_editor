import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import View from "./View";
import * as request from "../../Common/Util/HTTPRequest";
class Container extends Component {
  constructor(props) {
    super(props);
    this.limit = 10;
    this.state = { news: [], currentPage: 1, newsCount: 0 };
  }
  componentDidMount = () => {
    this.fetchNews();
  };
  fetchNews = async () => {
    let res = await request.getNewsList({
      type: "all",
      limit: this.limit,
      offset: this.limit * (this.state.currentPage - 1)
    });
    let news = await res.json();
    this.setState(prev => ({
      news: prev.news.concat(news.rows),
      newsCount: news.count
    }));
  };
  onClickMore = () => {
    this.setState(
      prev => ({ currentPage: prev.currentPage + 1 }),
      () => {
        this.fetchNews();
      }
    );
  };
  render() {
    const { news, newsCount } = this.state;
    const { onClickMore } = this;
    return <View news={news} onClickMore={onClickMore} newsCount={newsCount} />;
  }
}
export default connect(
  state => ({ email: state.userinfo.email }),
  {}
)(withRouter(injectIntl(Container)));
