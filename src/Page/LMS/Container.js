import React, { Component } from "react";
import { connect } from "react-redux";
import View from "./View";
import { getMyCourses } from "./api";
import { Course, RecommendedProject, TodayQuest } from "../../models";



class Container extends Component {
  constructor(props) {
    super(props);

    console.log(props)
    this.state = {
      coursesProgress: [],
    };
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const myCourses = await getMyCourses({ userId: this.props.userId })
    this.setState({ coursesProgress : myCourses.map((course) => new Course(course))})
  }

  render() {
    return <View courseId={this.props.match && this.props.match.params.id} coursesProgress={this.state.coursesProgress} updateCourses={this.getData} {...this.props} />;
  }
}

export default connect(
  (state) => ({ email: state.userinfo.email, userId: state.userinfo.id }),
  {}
)(Container);
