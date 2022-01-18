import React, { Component } from "react";
import View from "./View";

export default class Container extends Component {
  render() {
    const { handleLectureVideoListBtn, lectureVideos } = this.props;
    return (
      <View
        lectureVideos={lectureVideos}
        handleLectureVideoListBtn={handleLectureVideoListBtn}
      />
    );
  }
}
