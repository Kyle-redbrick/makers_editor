import React from "react";
import Thumbnail from "../../../../Image/course_thumbnail.png";
import ClearIcon from "../../../../Image/icon-clear.svg";
import "./index.scss";

function MyProjectRight () {
  return (
    <div className="right-banner">
      <div className="course-content__wrap">
        { false ? <BeforeList /> : <AfterList /> }
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
const AfterList = () => {
  return (
    <ul className="course-content__list">
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
            {/* TODO 수강 완료한 강의에만 노출 */}
            <div className="course-content__clear-label">
              <img alt="수강 완료한 강의 아이콘" src={ClearIcon} />
              <span className="course-content__clear-text">All step clear</span>
            </div>
          </div>
        </div>
      </li>

      {/* TODO 해당 계정에서 마지막으로 접속한 차시(미션)일때 클래스 progress 추가 */}
      <li className="course-content__item progress">
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

            {/* TODO 수강 진행중인 강의에만 노출 */}
            <div className="course-content__progress-bar">
              <div className="course-content__progress-bar-thumb">
                <div className="course-content__progress-bar-track" style={{width:"50%"}}></div>
              </div>
              <span className="course-content__progress-length"><b>5</b>/8 Step</span>
            </div>
          </div>
        </div>
      </li>

      {/* TODO 이전 강의 미수료 시, 잠금 표시 이미지 노출됨 / 클래스 lock 추가 */}
      <li className="course-content__item lock">
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

            {/* TODO 수강 진행중인 강의에만 노출 */}
            <div className="course-content__progress-bar">
              <div className="course-content__progress-bar-thumb">
                <div className="course-content__progress-bar-track" style={{width:"50%"}}></div>
              </div>
              <span className="course-content__progress-length"><b>5</b>/8 Step</span>
            </div>
          </div>
        </div>
      </li>

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

            {/* TODO 수강 진행중인 강의에만 노출 */}
            <div className="course-content__progress-bar">
              <div className="course-content__progress-bar-thumb">
                <div className="course-content__progress-bar-track" style={{width:"50%"}}></div>
              </div>
              <span className="course-content__progress-length"><b>5</b>/8 Step</span>
            </div>
          </div>

          {/* TODO 클릭 시 나오는 상세 내용 */}
          <div className="course-content__detail-content">
            <h3 className="course-content__detail-title">차시명이 한줄일 경우 이렇게 나와야 합니다. 여기는 최대 두줄입니다.</h3>
            <p className="course-content__detail-explan">해당 차시에 대한 세부 설명이 들어가는 곳입니다. 여기는 최대 세줄까지 가능합니다.</p>

            {/* TODO 버튼 종류 1 : 미션을 진행하지 않은 상태일 경우 */}
            <button type="button" className="course-content__learn-btn course-content__learn-btn--now">Learn Now</button>
            {/* TODO 버튼 종류 2 : 미션을 진행했으나 완료하지 않은 상태일 경우 */}
            {/* <button type="button" className="course-content__learn-btn course-content__learn-btn--ing">Continue</button> */}
            {/* TODO 버튼 종류 3 : 미션을 완료한 상태일 경우 */}
            {/* <button type="button" className="course-content__learn-btn course-content__learn-btn--clear">Learn Again</button> */}

            <a href="" rel="noopener noreferrer" className="course-content__game-preview">Game Preview</a>
          </div>
        </div>
      </li>
    </ul>
  )
}
/* // 로그인 후 차시 리스트 */