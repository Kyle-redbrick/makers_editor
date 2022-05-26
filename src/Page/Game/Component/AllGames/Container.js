import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import QueryString from "query-string";
import * as request from "../../../../Common/Util/HTTPRequest";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      allGames: [],
      showMore: true
    };
    this.limit = 12;
  }

  componentDidMount() {
    this.loadAllGames(this.limit)
  }

  async initAndLoad() {
    this.isAllLoaded = false;
    await this.loadMore([]);
  }

  loadAllGames(limit) {
    const options = {
      offset: this.state.allGames.length,
      limit: limit
    }
    const queryString = QueryString.stringify(options);

    request
      .getAllProjects(queryString)
      .then(res => res.json())
      .then(json => {
        this.setState(prevState => ({
          total: json.body.records,
          allGames: [].concat(prevState.allGames, json.body.list)
        }), () => {
          if (this.state.allGames.length >= this.state.total) {
            this.setState({ showMore: false })
          }
        });
      })
  }

  onClickMore = () => {
    this.loadAllGames(this.limit);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  render() {
    return (
      <View
        total={this.state.total}
        allGames={this.state.allGames}
        showMore={this.state.showMore}
        onClickMore={this.onClickMore}
      />
    );
  }
}

export default withRouter(Container);
