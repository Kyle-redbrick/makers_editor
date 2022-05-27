import React, { useState, useEffect, useCallback } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import MyProjectLeft from "./MyProjectLeft";
import MyProjectRight from "./MyProjectRight";

import "./MyProjectBanner.scss";

const MyProjectBanner = (props) => {

  return (
    <div className="project-banner">
      {
        props.session.isLogin ? <div className="left-slide__title-box">
          <h3 className="page-title--child">{props.curriculum[props.slideIndex].course.title}</h3>
          <div className="left-slide__child-title-box">
            <span className="left-slide__child-title-left">Learns for students new to coding. Learn to code by creating simple games with block coding.</span>
            <span className="left-slide__child-title-right"><b>{props.curriculum[props.slideIndex].course.progress.completed}</b> / {props.curriculum[props.slideIndex].course.progress.net} Missions assigned</span>
          </div>
        </div> : <h3 className="page-title">
          <FormattedMessage id="ID_LEARN_TITLE_NONLOGIN" />
        </h3>
      }
      <div className="project-banner-wrap">
        <MyProjectLeft {...props} />
        <MyProjectRight projects={props.curriculum[props.slideIndex].projects} session={props.session} />
      </div>
    </div>
  )
}

export default injectIntl(MyProjectBanner);
