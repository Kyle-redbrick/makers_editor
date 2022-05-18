import React from "react";
import SampleThumbnail from "../../../../Image/course_thumbnail.png";
import { URL } from "../../../../Common/Util/Constant"
import "./index.scss";

function AllCourse(props) {
  return (
    
    <div className="all-course__wrap">
      <h3 className="all-course__title">
        All Course
        <span className="all-course__project-list-length">{props.curriculum.length}</span>
      </h3>

      <div className="all-course__project">
        <ul className="all-course__project-list">
        {
          props.curriculum.map((item,index)=> 
              <li key={index} className={`all-course__project-item ${!item.course.unlocked && "lock"}`}>
                <div className="all-course__project-inner">
                  <div className="all-course__project-thumbnail">
                    <img alt="코스 강의 썸네일" src={URL.S3_DREAMCLASS + item.course.posterURL} />
                    <span className="all-course__project-label">{item.course.label}</span>
                  </div>
                  <h3 className="all-course__project-title">{item.course.title}</h3>
                  <div className="all-course__project-info">
                    {
                      props.curriculum[index].course.progress.completed >= props.curriculum[index].course.progress.net ? 
                      <span className="all-course__project-progress-label all-course__project-progress-label--ing">Clear</span> : 
                      <span className="all-course__project-progress-label all-course__project-progress-label--learning">Learning</span> 
                    }
                    <span className="all-course__project-progress-length">총 {props.curriculum[index].projects.length}차시</span>
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