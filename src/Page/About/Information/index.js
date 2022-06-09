import React, {useState} from "react";
import { FormattedMessage } from "react-intl";
import SlideArrowIcon from "../../../Image/infor_btn_arrow_down.svg";
import "./index.scss";

function Information () {
  const [isActive, setIsActive] = useState(false);
  const toggleSlideBox = () => {
    setIsActive(isActive => !isActive);
  }
  return (
    <div className="information">
      <h3 className="information__title"><FormattedMessage id="ID_ABOUT_INFORMATION_TITLE" /></h3>
      <div className="information__slide-box">
        {/* TODO btn 클릭 시 하나 씩 열리게 스크립트 작업 필요 */}
        <button type="button" className={isActive ? "information__slide-title active" : "information__slide-title"} onClick={() => toggleSlideBox()}>
          <FormattedMessage id="ID_ABOUT_INFORMATION_TECHNICAL" />
          <img alt="슬라이드 아이콘" src={SlideArrowIcon} />
        </button>

        <div className={isActive ? "information__slide-inner-wrap information__slide-inner-wrap--technical show" : "information__slide-inner-wrap information__slide-inner-wrap--technical"}>
          <div className="information__slide-inner-content">
            <FormattedMessage id="ID_ABOUT_INFORMATION_TECHNICAL_INNER" />
          </div>
        </div>
      </div>
      <div className="information__slide-box">
        {/* TODO btn 클릭 시 하나 씩 열리게 스크립트 작업 필요 */}
        <button type="button" className={isActive ? "information__slide-title active" : "information__slide-title"} onClick={() => toggleSlideBox()}>
          <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE" />
          <img alt="슬라이드 아이콘" src={SlideArrowIcon} />
        </button>

        <div className={isActive ? "information__slide-inner-wrap information__slide-inner-wrap--profile show" : "information__slide-inner-wrap information__slide-inner-wrap--profile"}>
          <div className="information__slide-inner-content">
            <b><FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER" /></b>
            <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_FOUNDED" />
            <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_ADDRESS" />
            <a className="information__link" rel="noopener noreferrer">
              <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_ADDRESS_SECOND_LINE" />
            </a>
            <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_CONTACT" />
            <br />
            <b><FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_PARTNER_TITLE" /></b>
            <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_PARTNER_IGROUP" />
            <a className="information__link" rel="noopener noreferrer">
              <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_PARTNER_ADDRESS" />
            </a>
            <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_PARTNER_IDC" />
            <a className="information__link" rel="noopener noreferrer">
              <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_PARTNER_IDC_ADDRESS" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information ;