import React, { useCallback, useEffect, useState } from "react";
import Thumbnail from "../../../../Image/course_thumbnail.png";
import ClearIcon from "../../../../Image/icon-clear.svg";
import PrevIcon from "../../../../Image/icn_arrow_left.svg"
import "./index.scss";
import { URL } from "../../../../Common/Util/Constant"


function MyProjectRight (props) {
  return (
    <div className="right-banner">
      <div className="course-content__wrap">
        { props.session.isLogin ? <AfterList {...props} /> : <BeforeList {...props} /> }
      </div>
    </div>
  )
}
export default MyProjectRight;

const BeforeList = (props) => {
  return (
    <ul className="course-content__list course-content__list--register">
      {
        props.projects.map((item,index) => 
          <li key={index} className="course-content__item">
            <div className="course-content__outline">
              <div className="course-content__thumbnail">
                <img alt="차시 썸네일" src={Thumbnail} />
                <span className="course-content__label">{item.label}</span>
              </div>
              <div className="course-content__info">
                <h3 className="course-content__title">{item.title}</h3>
                <p className="course-content__more-btn">+ 더보기</p>
              </div>
            </div>
          </li>
        )
      }
    </ul>
  )
}

const AfterList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    props.projects.map((item,index) => {
      item.isClickd = false
    })
    setItems([...props.projects])
  }, [props]);

  const onClickItem = (i) => {
    items.map((item,index) => {
      i == index ? item.isClickd = !item.isClickd : item.isClickd = false
    })
    setItems([...items])
  }

  return (
    <ul className="course-content__list">
      {
        items.map((item,index)=> 
          <li key={index} className={`course-content__item ${!item.unlocked && "lock"}`} onClick={()=> onClickItem(index)}>
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
                        <span className="course-content__progress-length"><b>{item.progress.completed}</b>/{item.progress.net} Step</span>
                      </div>
                    </>
                  }
                </div>

                {
                  item.isClickd &&
                  <div className="course-content__detail-content">
                  <h3 className="course-content__detail-title">{item.title}</h3>
                  <p className="course-content__detail-explan">{item.intro}</p>

                  {/* TODO 버튼 종류 1 : 미션을 진행하지 않은 상태일 경우 */}
                  <button type="button" className="course-content__learn-btn course-content__learn-btn--now">Learn Now</button>
                  {/* TODO 버튼 종류 2 : 미션을 진행했으나 완료하지 않은 상태일 경우 */}
                  {/* <button type="button" className="course-content__learn-btn course-content__learn-btn--ing">Continue</button> */}
                  {/* TODO 버튼 종류 3 : 미션을 완료한 상태일 경우 */}
                  {/* <button type="button" className="course-content__learn-btn course-content__learn-btn--clear">Learn Again</button> */}

                  <a href="" rel="noopener noreferrer" className="course-content__game-preview">Game Preview</a>
                  </div>
                }
              </div>
            </div>
          </li>
        )
      }
    </ul>
  )
}