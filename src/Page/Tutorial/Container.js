import React, { Component } from "react";
import { Course } from "../../models";
import { getCourses } from "./api";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { courses: [] };
  }
  componentDidMount() {
    this.loadCourses();
  }
  loadCourses() {
    getCourses().then(courses => {
      this.setState({ courses: courses.map(course => new Course(course)) });
    })
  }

  render() {
    return <View courses={this.state.courses} />;
  }
}

export default Container;
