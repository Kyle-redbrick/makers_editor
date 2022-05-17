import React from "react";
import Thumbnail from "../../../../Image/course_thumbnail.png";
import ClearIcon from "../../../../Image/icon-clear.svg";
import "./index.scss";
import { URL } from "../../../../Common/Util/Constant"


function MyProjectRight (props) {
  return (
    <div className="right-banner">
      {console.log(6666666,props.projects)}
      <div className="course-content__wrap">
        { props.session.isLogin ? <AfterList {...props} /> : <BeforeList {...props} /> }
      </div>
    </div>
  )
}

export default MyProjectRight;

/* TODO 로그인 전 차시 리스트 */
const BeforeList = () => {
  return (
    <ul className="course-content__list course-content__list--register">
      <li className="course-content__item">
        <div className="course-content__outline">
          <div className="course-content__thumbnail">
            {/* TODO 과정 내 차시 썸네일 */}
            <img alt="차시 썸네일" src={Thumbnail} />
            {/* TODO 과정 내 차시 횟수 */}
            <span className="course-content__label">Mission 1</span>
          </div>
          <div className="course-content__info">
            {/* TODO 차시명 */}
            <h3 className="course-content__title">차시명이 들어가는 곳 최대 두줄까지</h3>
            {/* TODO 더보기 / 호버 시 더보기 내용 나오는 효과 */}
            <p className="course-content__more-btn">+ 더보기</p>
          </div>

          {/* hover 시 나타나는 div */}
          <div className="course-content__hover">
            <span className="course-content__hover-label">Mission 2</span>
            <h3 className="course-content__hover-title">차시명이 들어가는 곳 최대 두줄까지</h3>
            <p className="course-content__hover-content">
              차시 세부 설명 최대 4 줄. 차시 세부 설명 최대 4 줄. 차시 세부 설명 최대 4 줄. 차시 세부 설명 최대 4 줄. 
            </p>
          </div>
        </div>
      </li>
    </ul>
  )
}
/* // 로그인 전 차시 리스트 */

/* TODO 로그인 후 차시 리스트 */
const AfterList = (props) => {
  return (
    <ul className="course-content__list">
      {
        props.projects.map((item,index)=> 
          <li key={index} className="course-content__item">
            <div className="course-content__outline">
              <div className="course-content__thumbnail">
                <img alt="차시 썸네일" src={URL.S3_DREAMCLASS + item.resources.thumbnailURL} />
                <span className="course-content__label">{item.label}</span>
              </div>
              <div className="course-content__info">
                <h3 className="course-content__title">{item.title}</h3>
                <div className="course-content__clear-label">
                  {
                    !item.unlocked ? 
                    <>
                      <img alt="수강 완료한 강의 아이콘" src={ClearIcon} />
                      <span className="course-content__clear-text">All step clear</span>
                    </> : 
                    <>
                      <div className="course-content__progress-bar">
                        <div className="course-content__progress-bar-thumb">
                          <div className="course-content__progress-bar-track" style={{width:"50%"}}></div>
                        </div>
                        <span className="course-content__progress-length"><b>5</b>/8 Step</span>
                      </div>

                    </>
                  }






                  
                </div>
              </div>
            </div>
          </li>
        )
      }
    </ul>
  )
}