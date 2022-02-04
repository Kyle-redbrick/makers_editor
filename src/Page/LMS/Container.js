import React, { Component } from "react";
import { connect } from "react-redux";
import View from "./View";
import { getMyCourses } from "./api";
import { Course, RecommendedProject, TodayQuest } from "../../models";



class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesProgress: [],
    };
  }


  componentDidMount() {
    console.log(this.props)
    console.log("componentDidMount")
    this.getData()
  }

  getData = async () => {
    const myCourses = await getMyCourses({ userId: this.props.userId })
    console.log("myCourses111", myCourses)

    this.setState({ coursesProgress : myCourses.map((course) => new Course(course))})

    console.log("22222",this.state.coursesProgress)
  }


  render() {
    return <View courseId={this.props.match && this.props.match.params.id} coursesProgress={this.state.coursesProgress} {...this.props} />;
  }
}

export default connect(
  (state) => ({ email: state.userinfo.email, userId: state.userinfo.id }),
  {}
)(Container);
