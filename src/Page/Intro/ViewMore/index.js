import React from "react";
import AtomImg from "../../../Image/img-atom.png";
import MoreIcon from "../../../Image/btn_arrow_right.svg";
import CharacterImg from "../../../Image/img_left-character.png"; 
import CharacterImg2 from "../../../Image/img_right-character.png"; 
import { FormattedMessage } from "react-intl";
import "./index.scss";

function ViewMore () {
  return (
    <div className="view-more">
      <img alt="캐릭터 이미지" src={AtomImg} />
      <p className="view-more__notice-text"><FormattedMessage id="ID_INTRO_VIEW_MORE_NOTICE_TITLE" /></p>

      <div className="view-more__box">
        <div className="view-more__box-inner">
          <div className="view-more__inner-left">
            <h3 className="view-more__box-title"><FormattedMessage id="ID_INTRO_VIEW_MORE_LEFT_TITLE" /></h3>
            <a rel="noopener noreferrer" className="view-more__link">
              view more
              <img alt="더보기 아이콘" src={MoreIcon} />
            </a>
          </div>

          <img alt="캐릭터 이미지" src={CharacterImg} />
        </div>

        <div className="view-more__box-inner">
          <div className="view-more__inner-left">
            <h3 className="view-more__box-title"><FormattedMessage id="ID_INTRO_VIEW_MORE_RIGHT_TITLE" /></h3>
            <a rel="noopener noreferrer" className="view-more__link">
              view more
              <img alt="더보기 아이콘" src={MoreIcon} />
            </a>
          </div>

          <img alt="캐릭터 이미지" src={CharacterImg2} />
        </div>
      </div>
    </div>
  )
}

export default ViewMore ;