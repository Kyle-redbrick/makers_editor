import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import "./index.scss";

class LectureVideoListContainer extends Component {
  handleClickOutside = e => {
    this.props.handleLectureVideoListBtn(false);
  };

  render() {
    const { handleLectureVideoListBtn, lectureVideos } = this.props;
    return (
      <div className="LectureVideoList">
        <div className="LectureVideoBox">
          {lectureVideos.map((video, index) => {
            return (
              <div>
                <div
                  className="LectureVideoBoxItem"
                  index={index}
                  onClick={() => handleLectureVideoListBtn(false, video.url)}
                >
                  <p className="LectureVideoBoxItem--title">{video.title}</p>
                  <p className="LectureVideoBoxItem--time">{video.duration}</p>
                </div>
                <p className="LectureVideoBoxItem--line" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default onClickOutside(LectureVideoListContainer);
