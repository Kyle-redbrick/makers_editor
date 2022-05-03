import React from "react";
import Thumbnail from "../../../../Image/course_thumbnail.png";
import "./index.scss";

function MyProjectRight () {
  return (
    <div className="right-banner">
      <div className="course-content__wrap">
        <ul className="course-content__list">
          <li className="course-content__item">
            <div className="course-content__outline">
              <div className="course-content__thumbnail">
                {/* TODO 과정 내 차시 썸네일 */}
                <img alt="차시 썸네일" src={Thumbnail} />
                {/* TODO 과정 내 차시 횟수 */}
                <span className="course-content__label">Mission</span>
              </div>
              <div className="course-content__info">
                {/* TODO 차시명 */}
                <h3 className="course-content__title">차시명이 들어가는 곳 최대 두줄까지</h3>
                {/* TODO 더보기 / 호버 시 더보기 내용 나오는 효과 */}
                <p className="course-content__more-btn">+ 더보기</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MyProjectRight;