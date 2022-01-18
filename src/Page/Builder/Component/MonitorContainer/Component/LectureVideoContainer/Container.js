import React, { Component } from "react";
import View from "./View";

export default class Container extends Component {
  render() {
    const {
      handleLectureVideoBtn,
      isTutor,
      selectedLectureVideoURL
    } = this.props;
    return (
      <View
        isTutor={isTutor}
        handleLectureVideoBtn={handleLectureVideoBtn}
        selectedLectureVideoURL={selectedLectureVideoURL}
      />
    );
  }
}
