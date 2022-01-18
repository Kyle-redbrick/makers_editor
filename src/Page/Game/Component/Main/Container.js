import React, { Component } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import QueryString from "query-string";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorsProjects:[],
      monthlyProjects:[],
      weeklyProjects:[],
      newProjects:[]
    };
    this.limit = 20;
  }

  async componentDidMount() {
    const editorsProjects = await this.getProjects("recommend");
    const monthlyProjects = await this.getProjects("monthly");
    const weeklyProjects = await this.getProjects("weekly");
    const newProjects = await this.getProjects("news");

    this.setState({
      editorsProjects,
      monthlyProjects,
      weeklyProjects,
      newProjects
    })
  }

  getProjects = async type => {
    try{
      let res, json;
      switch(type){
        case "recommend":
          res = await request.getProjectsByType({ type: type, limit: this.limit, offset: 0 })
          json = await res.json();
          json = json.map(item=>item.project);
          break;
        case "news":
          res = await request.getProjectsByType({ type: type, limit: this.limit, offset: 0 })
          json = await res.json();
          break;
        case "monthly":
        case "weekly":
          const options = {
            order: {
              weekly: "weeklyViewCount",
              monthly: "monthlyViewCount"
            }[type],
            keyword: null,
            projectType: null,
            offset: 0,
            limit: this.limit
          }
          const queryString = QueryString.stringify(options);
          res = await request.getPublishedList(queryString);
          json = await res.json();
          json = json.rows;
          break;

        default:
          break;
      }
      return json;
    }catch(e){
      console.error(e);
      return [];
    }
  }

  render() {
    return (
      <View
        editorsProjects={this.state.editorsProjects}
        monthlyProjects={this.state.monthlyProjects}
        weeklyProjects={this.state.weeklyProjects}
        newProjects={this.state.newProjects}
      />
    );
  }
}

export default Container;

