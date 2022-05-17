import React from "react";
import SampleThumbnail from "../../../../Image/course_thumbnail.png";
import "./index.scss";

function AllCourse(props) {
  return (
    <div className="all-course__wrap">
      <h3 className="all-course__title">
        All Course
        {/* TODO all project list 갯수 */}
        <span className="all-course__project-list-length">5</span>
      </h3>

      <div className="all-course__project">
        <ul className="all-course__project-list">
          <li className="all-course__project-item">
            <div className="all-course__project-inner">
              <div className="all-course__project-thumbnail">
                <img alt="코스 강의 썸네일" src={SampleThumbnail} />
                <span className="all-course__project-label">Course 1</span>
              </div>
              <h3 className="all-course__project-title">과정명이 들어가는 곳. 최대 두줄입니다.</h3>
              <div className="all-course__project-info">
                {/* TODO 강의 진행상황 라벨 - 완료 시 라벨 / 진행중 라벨 */}
                <span className="all-course__project-progress-label all-course__project-progress-label--ing">Clear</span>
                {/* <span className="all-course__project-progress-label all-course__project-progress-label--learning">Learning</span> */}
                <span className="all-course__project-progress-length">총 4차시</span>
              </div>
            </div>
          </li>

          {/* TODO 잠겨있는 코스일 경우 클래스 lock 추가 */}
          <li className="all-course__project-item lock">
            <div className="all-course__project-inner">
              <div className="all-course__project-thumbnail">
                <img alt="코스 강의 썸네일" src={SampleThumbnail} />
                <span className="all-course__project-label">Course 1</span>
              </div>
              <h3 className="all-course__project-title">과정명이 들어가는 곳. 최대 두줄입니다.</h3>
              <div className="all-course__project-info">
                {/* TODO 강의 진행상황 라벨 - 완료 시 라벨 / 진행중 라벨 */}
                {/* <span className="all-course__project-progress-label all-course__project-progress-label--ing">Clear</span> */}
                <span className="all-course__project-progress-label all-course__project-progress-label--learning">Learning</span>
                <span className="all-course__project-progress-length">총 4차시</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AllCourse;