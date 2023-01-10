import React from "react";
import { FormattedMessage } from "react-intl";
import IconCheck from "../../../Image/icon-scroll-check.svg";
import IconDashboard from "../../../Image/icon-scroll-dashboard.svg";
import ScrollImg from "../../../Image/img-scroll-1.png";
import ScrollImg2 from "../../../Image/img-scroll-2.png";
import ScrollImg3 from "../../../Image/img-scroll-3.png";
import ScrollImg4 from "../../../Image/img-scroll-4.png";
import ScrollImgJa1 from "../../../Image/Img-scroll-ja-1.png";
import ScrollImgJa2 from "../../../Image/Img-scroll-ja-2.png";
import ScrollImgJa3 from "../../../Image/Img-scroll-ja-3.png";
import ScrollImgJa4 from "../../../Image/Img-scroll-ja-4.png";

import "./index.scss"; 

function ScrollAction () { 
  const lang = localStorage.getItem("lang"); 
  return (
    <div className="scroll-action">
      <div className="scroll-action__wrap">
        <div className="scroll-action__left" data-aos="fade-up">
          <img alt="체크 아이콘" src={IconCheck} />
          <h3 className="scroll-action__title"><FormattedMessage id="ID_INTRO_SCROLL_AREA_LEFT_TITLE" /></h3>
          <p className="scroll-action__child-title"><FormattedMessage id="ID_INTRO_SCROLL_AREA_LEFT_CHILD_TITLE" /></p>
        </div>
        <div className="scroll-action__right">
          <div className="scroll-action__img-wrap">
            <h3 className="scroll-action__img-title"><FormattedMessage id="ID_INTRO_SCROLL_ACTION_IMG_TITLE_1" /></h3>
            <p className="scroll-action__img-child-title"><FormattedMessage id="ID_INTRO_SCROLL_ACTION_IMG_CHILD_TITLE_1" /></p>
            <img alt="self check"src={lang === "en" ? ScrollImg : ScrollImgJa1} />
          </div>
          <div className="scroll-action__img-wrap scroll-action__img-wrap--secound ">
            <h3 className="scroll-action__img-title"><FormattedMessage id="ID_INTRO_SCROLL_ACTION_IMG_TITLE_2" /></h3>
            <p className="scroll-action__img-child-title"><FormattedMessage id="ID_INTRO_SCROLL_ACTION_IMG_CHILD_TITLE_2" /></p>
            <img alt="dashboard"src={lang === "en" ? ScrollImg2 : ScrollImgJa2} />
          </div>
        </div>
      </div>
      <div className="scroll-action__wrap">
       < div className="scroll-action__left" data-aos="fade-up" >
          <img alt="체크 아이콘" src={IconDashboard} />
          <h3 className="scroll-action__title"><FormattedMessage id="ID_INTRO_SCROLL_AREA_LEFT_TITLE_2" /></h3>
          <p className="scroll-action__child-title"><FormattedMessage id="ID_INTRO_SCROLL_AREA_LEFT_CHILD_TITLE_2" /></p>
        </div>
        <div className="scroll-action__right">
          <div className="scroll-action__img-wrap">
            <h3 className="scroll-action__img-title"><FormattedMessage id="ID_INTRO_SCROLL_ACTION_IMG_TITLE_3" /></h3>
            <p className="scroll-action__img-child-title"><FormattedMessage id="ID_INTRO_SCROLL_ACTION_IMG_CHILD_TITLE_3" /></p>
            <img alt="code sorting feature"src={lang === "en" ? ScrollImg3 : ScrollImgJa3} />
          </div>
          <div className="scroll-action__img-wrap">
            <h3 className="scroll-action__img-title"><FormattedMessage id="ID_INTRO_SCROLL_ACTION_IMG_TITLE_4" /></h3>
            <p className="scroll-action__img-child-title"><FormattedMessage id="ID_INTRO_SCROLL_ACTION_IMG_CHILD_TITLE_4" /></p>
            <img alt="API Dictionary"src={lang === "en" ? ScrollImg4 : ScrollImgJa4} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollAction ;
