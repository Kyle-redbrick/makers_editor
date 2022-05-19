import SampleThumbnail from "../../../../Image/course_thumbnail.png";
import { URL } from "../../../../Common/Util/Constant"
import "./index.scss";
import React, { useCallback, useEffect, useState } from "react";
import {getLearnCourses} from "../../../../Common/Util/HTTPRequest"


function AllCourse(props) {

  const [courses , setCourses] = useState([])

  useEffect(() => {
    getCourses()
  }, []);

  const getCourses = async ()=> {
    const data = await getLearnCourses()
    console.log(data.body)
    setCourses(data.body)
  }

  const linkToLearn = (courseId)=> {
    console.log(courseId)
    window.open(`/course/${courseId}`,"_self");
  }


  return (
    
    <div className="all-course__wrap">
      <h3 className="all-course__title">
        All Course
        <span className="all-course__project-list-length">{courses.length}</span>
      </h3>

      <div className="all-course__project">
        <ul className="all-course__project-list">
        {
          courses.map((item,index)=> 
              <li key={index} className={`all-course__project-item ${!item.unlocked && "lock"}`} onClick={()=> linkToLearn(item.lectureId)}>
                <div className="all-course__project-inner">
                  <div className="all-course__project-thumbnail">
                    <img alt="코스 강의 썸네일" src={URL.S3_DREAMCLASS + item.posterUrl} />
                    <span className="all-course__project-label">{item.label}</span>
                  </div>
                  <h3 className="all-course__project-title">{item.title}</h3>
                  <div className="all-course__project-info">

                    {
                      item.unlocked && 
                      <>
                      {
                        item.progressStatus == "Clear" ? 
                        <span className="all-course__project-progress-label all-course__project-progress-label--ing">Clear</span> : 
                        <span className="all-course__project-progress-label all-course__project-progress-label--learning">Learning</span> 
                      }
                      <span className="all-course__project-progress-length">총 {item.projects}차시</span>
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

export default AllCourse;