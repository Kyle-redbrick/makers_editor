import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import QueryString from "query-string";
import * as request from "../../../../Common/Util/HTTPRequest";
import View from "./View";
import { ConsoleView } from "react-device-detect";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      allGames: [],
      games: [],
      placeholderGames: []
    };
  }

  get type() {
    return this.props.match.params.type;
  }
  get tab() {
    return this.query.tab || "all";
  }
  get keyword() {
    return this.query.keyword || null;
  }
  get query() {
    return QueryString.parse(this.props.location.search);
  }

  componentDidMount() {
    this.scrollToTop();
    this.initAndLoad();
    window.addEventListener("scroll", this.onWindowScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onWindowScroll);
  }
  initAndLoad() {
    this.setState({ total: 0, games: [], allGames: [] }, () => {
      this.loadMore();
    })
  }

  loadMore(count = 8) {
    // if (this.isLoading) {
    //   return;
    // }
    // this.isLoading = true;

    const options = {
      offset: this.state.allGames.length,
      limit: count
    }
    const queryString = QueryString.stringify(options);
    request
      .getAllProjects(queryString)
      .then(res => res.json())
      .then(json => {
        console.log(121, json)

        this.setState(prev => ({
          total: json.body.records,
          allGames: [...prev.allGames, json.body.list]
        }))
      }).finally(() => {
        // this.isLoading = false;
        this.onWindowScroll();
      })
    // request
    //   .getPublishedList(queryString)
    //   .then(res => res.json())
    //   .then(json => {
    //     this.setState(prev => ({
    //       total: json.count,
    //       games: [].concat(prev.games, json.rows)
    //     }));
    //     if(this.type === "search" && json.count <= 0) {
    //       this.loadPlaceholderGames();
    //     }
    //   })
    //   .finally(() => {
    //     this.isLoading = false;
    //     this.onWindowScroll();
    //   });
  }
  // loadPlaceholderGames() {
  //   request
  //     .getProjectsByType({ type: "recommend", limit: 12, offset: 0 })
  //     .then(res => res.json())
  //     .then(recommends => {
  //       this.setState({
  //         placeholderGames: recommends.map(recommend => recommend.project)
  //       });
  //     });
  // }

  // componentDidUpdate(prevProps) {
  //   const prevType = prevProps.match.params.type;
  //   if (prevType !== this.type) {
  //     this.initAndLoad();
  //   }
  //   const prevQuery = QueryString.parse(prevProps.location.search);
  //   const prevTab = prevQuery.tab || "all";
  //   if (prevTab !== this.tab) {
  //     this.initAndLoad();
  //   }
  //   const prevKeyword = prevQuery.keyword;
  //   if (prevKeyword !== this.keyword && this.keyword) {
  //     this.initAndLoad();
  //   }
  // }

  onWindowScroll = e => {
    if (window.scrollY + window.innerHeight > document.body.offsetHeight * 0.66) {
      if (this.state.total > this.state.allGames[0].length) {
        this.loadMore();
      }
    }
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  render() {
    return (
      <View
        total={this.state.total}
        allGames={this.state.allGames}
        games={this.state.games}
        placeholderGames={this.state.placeholderGames}
        onClickTab={this.onClickTab}
      />
    );
  }
}

export default withRouter(Container);
