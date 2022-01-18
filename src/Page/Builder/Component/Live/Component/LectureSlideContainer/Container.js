import React, { Component } from "react";
import View from "./View";

export default class Container extends Component {
  render() {
    const {
      isTutor,
      handleLectureSlideBtn,
      lectureSlides,
      selectedSlideIndex,
      handleSelectedLectureSlide
    } = this.props;
    return (
      <View
        selectedSlideIndex={selectedSlideIndex}
        handleSelectedLectureSlide={handleSelectedLectureSlide}
        isTutor={isTutor}
        handleLectureSlideBtn={handleLectureSlideBtn}
        lectureSlides={lectureSlides}
      />
    );
  }
}
