import React, { useCallback, useEffect, useState } from "react";
import Thumbnail from "../../../../Image/course_thumbnail.png";
import {injectIntl, FormattedMessage} from "react-intl";
import ClearIcon from "../../../../Image/icon-clear.svg";
import PrevIcon from "../../../../Image/icn_arrow_left.svg"
import { URL } from "../../../../Common/Util/Constant"
import * as Popup from "../../../../Common/Component/PopUp";
import GamePopup from "../../../CourseDetail/Components/GamePopup";
import * as LearnButtons from "../../../../Common/Component/Button/Learn";
import AlertIcon from "../../../../Image/icn_alert-circle.svg";
import "./index.scss";


function MyProjectRight (props) {
  return (
    <div className="right-banner">
      {/* TODO 비구매 이용 시, 클래스 non-scroll 추가 */}
      <div className="course-content__wrap">
        {!props.course.unlocked &&
          <div className="course-content__non-pay-box">
            <img alt="느낌표 아이콘" src={AlertIcon} />
            <FormattedMessage id="ID_LEARN_ALERT_TITLE" />
          </div>
        }
        { props.session.isLogin ? <AfterList {...props} /> : <BeforeList {...props} /> }
      </div>
    </div>
  )
}
export default injectIntl(MyProjectRight);

const BeforeList = (props) => {

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
    <ul className="course-content__list course-content__list--register">
      {
        items.map((item,index) =>
          <li key={index} className="course-content__item" onClick={() => onClickItem(index)}>
            <div className="course-content__outline">
              <div className="course-content__thumbnail">
                <img alt="차시 썸네일" src={URL.S3_DREAMCLASS + item.resources.thumbnailURL} />
                <span className="course-content__label">{item.label}</span>
              </div>
              <div className="course-content__info">
                <h3 className="course-content__title">{item.title}</h3>
                <p className="course-content__more-btn">
                  <FormattedMessage id="ID_COMMON_VIEW_MORE" />
                </p>
              </div>
              {
                item.isClickd &&
                <div className="course-content__detail-content">
                  <span className="course-content__hover-label">{item.label}</span>
                  <h3 className="course-content__hover-title">{item.title}</h3>
                  <p className="course-content__hover-content">
                    {item.intro}
                  </p>
                  <button className="course-btn-prev">
                    <img alt="이전으로 아이콘" src={PrevIcon} />
                    <FormattedMessage id="ID_COMMON_GO_BACK" />
                  </button>
                </div>
              }
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

  const handleClickGame = useCallback(
    (item) => {
      Popup.showPopUp(<GamePopup url={item.resources.gameURL} />, {
        dismissButton: false,
        dismissOverlay: true,
        defaultPadding: false,
        darkmode: true,
        mobileFullscreen: true,
        overflow: true,
      });
    },
    [GamePopup, Popup.showPopUp]
  );


  return (
    <ul className="course-content__list">
      {
        items.map((item, index) =>
          <li key={index} className={`course-content__item ${!item.unlocked && "lock"}`} onClick={() => onClickItem(index)}>
            <div className="course-content__outline">
              <div className="course-content__thumbnail">
                <img alt="차시 썸네일" src={URL.S3_DREAMCLASS + item.resources.thumbnailURL} />
                <span className="course-content__label">{item.label}</span>
              </div>
              <div className="course-content__info">
                <h3 className="course-content__title">{item.title}</h3>
                <div className="course-content__clear-label">
                  {item.unlocked &&
                    <>
                    {
                      item.progress.completed / item.progress.net === 1 ?
                        <>
                          <img alt="수강 완료한 강의 아이콘" src={ClearIcon} />
                          <span className="course-content__clear-text">
                            <FormattedMessage id="ID_LEARN_ALL_STEPS_CLEAR" />
                          </span>
                        </>
                        :
                        <div className="course-content__progress-bar">
                          <div className="course-content__progress-bar-thumb">
                            <div className="course-content__progress-bar-track" style={{ width: item.progress.completed / item.progress.net * 100 }}></div>
                          </div>
                          <span className="course-content__progress-length"><b>{item.progress.completed}</b>/{item.progress.net} Step</span>
                        </div>
                    }
                    </>
                  }
                </div>
                {
                  item.isClickd &&
                  <div className="course-content__detail-content">
                    <h3 className="course-content__detail-title">{item.title}</h3>
                    <p className="course-content__detail-explan">{item.intro}</p>
                    {
                      item.progress.completed >= item.progress.net ? (
                        <LearnButtons.LearnAgain learnWidth={true} completed id={item.id} />
                      ) : (
                        item.progress.completed === 0 ? (
                          <LearnButtons.LearnNow learnWidth={true} id={item.id} isShowVideo={true} videoURL={URL.S3_DREAMCLASS + item.resources.videoURL} />
                        ) : (
                          <LearnButtons.LearnContinue learnWidth={true} id={item.id} />
                        )
                      )
                    }
                    <button className="course-content__game-preview" onClick={() => handleClickGame(item)}>
                      <FormattedMessage id="ID_LEARN_GAME_PREVIEW" />
                    </button>
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