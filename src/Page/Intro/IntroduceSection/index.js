import React from "react";
import { FormattedMessage } from "react-intl";
import IntroduceImg from "../../../Image/introduce-img-1.png";
import IntroduceImg2 from "../../../Image/introduce-img-2.png";
import IntroduceImg3 from "../../../Image/introduce-img-3.png";
import "./index.scss";

function IntroduceSection (){
  return (
    <div className="introduce-area">
      <div className="introduce-area__content-box">
        <h3 className="introduce-area__content-title"><FormattedMessage id="ID_INTRO_INTRODUCE_AREA_CONTENT_TITLE" /></h3>
        <p className="introduce-area__content-child-title"><FormattedMessage id="ID_INTRO_INTRODUCE_AREA_CONTENT_CHILD_TITLE_1" /></p>
        <img alt="과정소개1" src={IntroduceImg } />
      </div> 

      <div className="introduce-area__content-box">
        <h3 className="introduce-area__content-title"><FormattedMessage id="ID_INTRO_INTRODUCE_AREA_CONTENT_TITLE_2" /></h3>
        <p className="introduce-area__content-child-title"><FormattedMessage id="ID_INTRO_INTRODUCE_AREA_CONTENT_CHILD_TITLE_2" /></p>
        <img alt="과정소개2" src={IntroduceImg2 } />
      </div> 

      <div className="introduce-area__content-box">
        <h3 className="introduce-area__content-title"><FormattedMessage id="ID_INTRO_INTRODUCE_AREA_CONTENT_TITLE_3" /></h3>
        <p className="introduce-area__content-child-title"><FormattedMessage id="ID_INTRO_INTRODUCE_AREA_CONTENT_CHILD_TITLE_3" /></p>
        <img alt="과정소개3" src={IntroduceImg3 } />
      </div> 
    </div>
  )
}

export default IntroduceSection ;