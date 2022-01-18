import React, { Component } from "react";
import closeImage from "../../../../../../Image/popup-close.svg";
import prevArrow from "../../../../../../Image/prev-page-btn.svg";
import nextArrow from "../../../../../../Image/next-page-btn.svg";

import "./index.scss";

export default class LectureSlideContainer extends Component {
  selectedSlideIndex = 0;

  componentDidMount() {
    const { lectureSlides } = this.props;
    this.setState({ lectures: lectureSlides });
  }

  onClickFirstPage = e => {
    this.selectedSlideIndex = 0;
    this.props.handleSelectedLectureSlide(this.selectedSlideIndex);
  };

  onClickLastPage = e => {
    this.selectedSlideIndex = this.props.lectureSlides.length - 1;
    this.props.handleSelectedLectureSlide(this.selectedSlideIndex);
  };

  onClickPrevPage = e => {
    if (this.selectedSlideIndex > 0) {
      this.selectedSlideIndex -= 1;
      this.props.handleSelectedLectureSlide(this.selectedSlideIndex);
    }
  };

  onClickNextPage = e => {
    if (this.selectedSlideIndex + 1 < this.props.lectureSlides.length) {
      this.selectedSlideIndex += 1;
      this.props.handleSelectedLectureSlide(this.selectedSlideIndex);
    }
  };

  render() {
    const { isTutor, handleLectureSlideBtn, lectureSlides } = this.props;
    return (
      <div className="LectureSlide">
        {isTutor && (
          <div className="LectureSlide--Tutor">
            <div className="LectureSlide--Content">
              <div className="LectureSlide--Content--content">
                <img src={lectureSlides[this.selectedSlideIndex]} alt="slide" />
              </div>
              <div className="LectureSlide--Content--control">
                <button
                  className="Control--firstbutton"
                  onClick={this.onClickFirstPage}
                >
                  처음으로
                </button>
                <div className="Control--prev" onClick={this.onClickPrevPage}>
                  <img src={prevArrow} alt="prev-slide"></img>
                  <p className="Control--prev--text">이전</p>
                </div>
                <div className="Control--pageinfo">
                  {this.selectedSlideIndex + 1}/{lectureSlides.length}
                </div>
                <div className="Control--next" onClick={this.onClickNextPage}>
                  <p className="Control--next--text">다음</p>
                  <img src={nextArrow} alt="next-slide"></img>
                </div>
                <button
                  className="Control--lastbutton"
                  onClick={this.onClickLastPage}
                >
                  마지막으로
                </button>
              </div>
            </div>

            <div className="Exit" onClick={() => handleLectureSlideBtn(false)}>
              <img src={closeImage} alt="close btn" />
            </div>
          </div>
        )}
        {!isTutor && (
          <div className="LectureSlide--Student">
            <div className="LectureSlide--Content">
              <div className="LectureSlide--Content--content">
                <img
                  src={lectureSlides[this.props.selectedSlideIndex]}
                  alt="slide"
                />
              </div>
              <div className="LectureSlide--Content--control">
                <div className="Control--pageinfo">
                  {this.props.selectedSlideIndex + 1}/{lectureSlides.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
