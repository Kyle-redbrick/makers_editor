import React from "react";
import { FormattedMessage } from "react-intl";
import ImgCurriculum1 from "../../../Image/img-curriculum-1.svg";
import ImgCurriculum2 from "../../../Image/img-curriculum-2.svg";
import ImgCurriculum3 from "../../../Image/img-curriculum-3.svg";
import "./index.scss";

function Curriculum () {
  return (
    <div className="curriculum">
      <h3 className="curriculum__title"><FormattedMessage id="ID_ABOUT_CURRICULUM_TITLE" /></h3>

      <div className="curriculum__cards">
        <div className="curriculum__card-item">
          <img alt="CSTA Standard" src={ImgCurriculum1} />
          <div className="curriculum__card-info curriculum__card-info--first">
            <h3 className="curriculum__card-title"><FormattedMessage id="ID_ABOUT_CURRICULUM_CARD_TITLE_1" /></h3>
            <p className="curriculum__card-content"><FormattedMessage id="ID_ABOUT_CURRICULUM_CARD_CONTENT_1" /></p>
          </div>
        </div>

        <div className="curriculum__card-item">
          <img alt="STEM Convergence" src={ImgCurriculum2} />
          <div className="curriculum__card-info curriculum__card-info--second">
            <h3 className="curriculum__card-title"><FormattedMessage id="ID_ABOUT_CURRICULUM_CARD_TITLE_2" /></h3>
            <p className="curriculum__card-content"><FormattedMessage id="ID_ABOUT_CURRICULUM_CARD_CONTENT_2" /></p>
          </div>
        </div>

        <div className="curriculum__card-item">
          <img alt="UN SDGs" src={ImgCurriculum3} />
          <div className="curriculum__card-info curriculum__card-info--third">
            <h3 className="curriculum__card-title"><FormattedMessage id="ID_ABOUT_CURRICULUM_CARD_TITLE_3" /></h3>
            <p className="curriculum__card-content"><FormattedMessage id="ID_ABOUT_CURRICULUM_CARD_CONTENT_3" /></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Curriculum;