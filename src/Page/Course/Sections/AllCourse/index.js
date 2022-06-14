import SampleThumbnail from "../../../../Image/course_thumbnail.png";
import { URL } from "../../../../Common/Util/Constant"
import "./index.scss";
import React, { useCallback, useEffect, useState } from "react";
import { getLearnCourses } from "../../../../Common/Util/HTTPRequest";
import { FormattedMessage, injectIntl } from "react-intl";


function AllCourse(props) {

  const [courses, setCourses] = useState([])

  useEffect(() => {
    getCourses()
  }, []);

  const getCourses = async () => {
    const data = await getLearnCourses()
    setCourses(data.body)
  }

  const linkToLearn = (courseId) => {
    window.open(`/course/${courseId}`, "_self");
  }


  return (

    <div className="all-course__wrap">
      <h3 className="all-course__title">
        <FormattedMessage id="ID_LEARN_ALL_COURSES" />
        <span className="all-course__project-list-length">{courses.length}</span>
      </h3>

      <div className="all-course__project">
        <ul className="all-course__project-list">
          {
            courses.map((item, index) =>
              <li key={index} className="all-course__project-item" onClick={() => linkToLearn(item.lectureId)}>
                <div className="all-course__project-inner">
                  <div className="all-course__project-thumbnail">
                    {/* /* TODO 비로그인 후구 구매 시,  해당 dimmed 노출처리. */ }
                    {!item.unlocked &&
                      <div className="all-course__non-pay-dimmed">
                        <FormattedMessage id="ID_LEARN_NON_LEARNING_TITLE" />
                        <FormattedMessage id="ID_LEARN_NON_LEARNING_SECOND_TITLE" />  
                      </div>
                    }
                    
                    <img alt="코스 강의 썸네일" src={URL.S3_DREAMCLASS + item.posterUrl} />
                    <span className="all-course__project-label">{item.label}</span>
                  </div>
                  <h3 className="all-course__project-title">{item.title}</h3>
                  <div className="all-course__project-info">

                    {
                      item.unlocked &&
                      <>
                        {
                          item.progressStatus == "clear" ?
                            <span className="all-course__project-progress-label all-course__project-progress-label--ing">
                              <FormattedMessage id="ID_LEARN_CLEAR" />
                            </span> :
                            <span className="all-course__project-progress-label all-course__project-progress-label--learning">
                              <FormattedMessage id="ID_LEARN_LEARNING" />
                            </span>
                        }
                        <span className="all-course__project-progress-length">
                          <FormattedMessage id="ID_COMMON_TOTAL" /> {item.projects} <FormattedMessage id="ID_COMMON_MISSION" />
                        </span>
                      </>
                    }
                  </div>
                </div>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default injectIntl(AllCourse);