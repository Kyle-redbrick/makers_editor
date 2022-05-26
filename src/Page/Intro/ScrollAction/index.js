import React from "react";
import { FormattedMessage } from "react-intl";
import IconCheck from "../../../Image/icon-scroll-check.svg";
import ImgScroll1 from "../../../Image/img-scroll-1.png";
import ImgScroll2 from "../../../Image/img-scroll-2.png";
import ImgScroll3 from "../../../Image/img-scroll-3.png";
import ImgScroll4 from "../../../Image/img-scroll-4.png";
import "./index.scss"; 

function ScrollAction () { 
  return (
    <div className="scroll-action">
      <div className="scroll-action__wrap">
        <div className="scroll-action__left">
          <img alt="체크 아이콘" src={IconCheck} />
          <h3 className="scroll-action__title"><FormattedMessage id="ID_INTRO_SCROLL_AREA_LEFT_TITLE" /></h3>
          <p className="scroll-action__child-title"><FormattedMessage id="ID_INTRO_SCROLL_AREA_LEFT_CHILD_TITLE" /></p>
        </div>
        <div className="scroll-action__right">
          <img alt="self check" src={ImgScroll1} />
          <img alt="dashboard" src={ImgScroll2} />
        </div>
      </div>
      <div className="scroll-action__wrap">
       < div className="scroll-action__left">
          <img alt="체크 아이콘" src={IconCheck} />
          <h3 className="scroll-action__title"><FormattedMessage id="ID_INTRO_SCROLL_AREA_LEFT_TITLE_2" /></h3>
          <p className="scroll-action__child-title"><FormattedMessage id="ID_INTRO_SCROLL_AREA_LEFT_CHILD_TITLE_2" /></p>
        </div>
        <div className="scroll-action__right">
          <img alt="self check" src={ImgScroll3} />
          <img alt="dashboard" src={ImgScroll4} />
        </div>
      </div>
    </div>
  )
}

export default ScrollAction ;
