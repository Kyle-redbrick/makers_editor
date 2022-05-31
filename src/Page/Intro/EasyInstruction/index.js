import React from "react";
import { FormattedMessage } from "react-intl";
import IconEasy from "../../../Image/icon-easy-1.svg";
import IconEasy2 from "../../../Image/icon-easy-2.svg";
import IconEasy3 from "../../../Image/icon-easy-3.svg";
import "./index.scss";

function EasyInstruction () {
  return (
    <div className="guidance">
      <h3 className="guidance__title"><FormattedMessage id="ID_INTRO_EASY_SECTION_TITLE" /></h3>
      <p className="guidance__child-title"><FormattedMessage id="ID_INTRO_EASY_SECTION_CHILD_TITLE" /></p>

      <div className="guidance__list">
        <div className="guidance__item">
          <img alt="create classes" src={IconEasy} />
          <p className="guidance__item-content"><FormattedMessage id="ID_INTRO_EASY_ITEM_TITLE_1" /></p>
        </div>

        <div className="guidance__item">
          <img alt="Assign missions" src={IconEasy2} />
          <p className="guidance__item-content"><FormattedMessage id="ID_INTRO_EASY_ITEM_TITLE_2" /></p>
        </div>

        <div className="guidance__item">
          <img alt="Monitor the attendance" src={IconEasy3} />
          <p className="guidance__item-content"><FormattedMessage id="ID_INTRO_EASY_ITEM_TITLE_3" /></p>
        </div>
      </div>
    </div>
  )
}

export default EasyInstruction;