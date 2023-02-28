import React from "react";
import AtomImg from "../../../Image/img-atom.png";
import MoreIcon from "../../../Image/btn_arrow_right.svg";
import CharacterImg from "../../../Image/img_left-character.png";
import CharacterImg2 from "../../../Image/img_right-character.png";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import "./index.scss";

function ViewMore() {

  const goToContact = () => {
    const contact = document.querySelector(".contact")

    contact.scrollIntoView()
  }
  return (
    <div className="view-more">
      <img alt="캐릭터 이미지" src={AtomImg} />
      <p className="view-more__notice-text"><FormattedMessage id="ID_INTRO_VIEW_MORE_NOTICE_TITLE" /></p>

      <div className="view-more__box">
        <div className="view-more__box-inner">
          <div className="view-more__inner-left">
            <h3 className="view-more__box-title"><FormattedMessage id="ID_INTRO_VIEW_MORE_LEFT_TITLE" /></h3>
            {/* TODO 클릭 시 About 페이지로 이동  */}
            <div className="view-more__link" onClick={goToContact}>
              <FormattedMessage id="ID_COMMON_VIEW_MORE_2" />
              <img alt="더보기 아이콘" src={MoreIcon} />
            </div>
          </div>

          <img alt="캐릭터 이미지" src={CharacterImg} />
        </div>

        <div className="view-more__box-inner">
          <div className="view-more__inner-left">
            <h3 className="view-more__box-title"><FormattedMessage id="ID_INTRO_VIEW_MORE_RIGHT_TITLE" /></h3>
            {/* TODO 클릭 시 무료체험용 과정 페이지로 이동 */}
            <Link to="/learn" className="view-more__link">
              <FormattedMessage id="ID_COMMON_VIEW_MORE_2" />
              <img alt="더보기 아이콘" src={MoreIcon} />
            </Link>
          </div>

          <img alt="캐릭터 이미지" src={CharacterImg2} />
        </div>
      </div>
    </div>
  )
}

export default ViewMore;