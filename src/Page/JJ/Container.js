import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as request from "../../Common/Util/HTTPRequest";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProjects: [],
      rankProjects: [],
      searchProjects: [],
      searchKeyword: ""
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      let res;
      res = await request.getJJProjects({
        limit: 14,
        order: "likeCount"
      });
      let rankProjects = await res.json();
      res = await request.getJJProjects({
        limit: 21,
        order: "editedAt"
      });
      let newProjects = await res.json();
      this.setState({ newProjects, rankProjects });
    } catch (e) {
      console.error(e);
    }
  };

  getSearchData = async () => {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.searchTimer = setTimeout(async () => {
      const res = await request.getJJProjects({
        limit: 1000,
        order: "editedAt",
        keyword: this.state.searchKeyword
      });
      const json = await res.json();
      this.setState({ searchProjects: json });
    }, 500);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchKeyword !== this.state.searchKeyword) {
      if (this.state.searchKeyword.length < 1) {
        // this.setState({ searchProjects: [] }, this.getData);
        this.setState({ searchProjects: [] });
      } else {
        this.getSearchData();
      }
    }
  }

  handleOnChange = e => {
    const value = e.target.value;
    this.setState({ searchKeyword: value });
  };

  render() {
    const {
      newProjects,
      rankProjects,
      searchProjects,
      searchKeyword
    } = this.state;
    const { handleOnChange } = this;
    return (
      <View
        newProjects={newProjects}
        rankProjects={rankProjects}
        searchProjects={searchProjects}
        searchKeyword={searchKeyword}
        handleOnChange={handleOnChange}
      />
    );
  }
}
export default connect(
  state => ({
    email: state.userinfo.email
  }),
  {}
)(injectIntl(Container));
