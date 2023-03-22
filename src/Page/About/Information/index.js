import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import SlideArrowIcon from "../../../Image/infor_btn_arrow_down.svg";
import RedbrickLogo from "../../../Image/Redbrick_logo.png";
import IGroupLogo from "../../../Image/iGroup_logo.png";
import mangoSteemLogo from "../../../Image/mango_steem_logo.png";
import IDCLogo from "../../../Image/IDC_Asia_logo.png";
import "./index.scss";

function Information() {
  const [isActive, setIsActive] = useState({ info1: false, info2: false });

  const toggleSlideBox = (info) => {
    if (info == "info1") {
      setIsActive({ ...isActive, info1: !isActive.info1 });
    } else {
      setIsActive({ ...isActive, info2: !isActive.info2 });
    }
  };
  return (
    <div className="information">
      <h3 className="information__title">
        <FormattedMessage id="ID_ABOUT_INFORMATION_TITLE" />
      </h3>
      <div className="information__slide-box">
        <button
          type="button"
          className={
            isActive.info1
              ? "information__slide-title active"
              : "information__slide-title"
          }
          onClick={() => toggleSlideBox("info1")}
        >
          <FormattedMessage id="ID_ABOUT_INFORMATION_TECHNICAL" />
          <img alt="슬라이드 아이콘" src={SlideArrowIcon} />
        </button>

        <div
          className={
            isActive.info1
              ? "information__slide-inner-wrap information__slide-inner-wrap--technical show"
              : "information__slide-inner-wrap information__slide-inner-wrap--technical"
          }
        >
          <div className="information__slide-inner-content">
            <div className="information__slide-box__section">
              <FormattedMessage id="ID_ABOUT_INFORMATION_TECHNICAL_INNER" />
            </div>
          </div>
        </div>
      </div>
      <div className="information__slide-box">
        <button
          type="button"
          className={
            isActive.info2
              ? "information__slide-title active"
              : "information__slide-title"
          }
          onClick={() => toggleSlideBox("info2")}
        >
          <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE" />
          <img alt="슬라이드 아이콘" src={SlideArrowIcon} />
        </button>

        <div
          className={
            isActive.info2
              ? "information__slide-inner-wrap information__slide-inner-wrap--profile show"
              : "information__slide-inner-wrap information__slide-inner-wrap--profile"
          }
        >
          <div className="information__slide-inner-content">
            <div className="information__slide-box__section">
              <b>
                <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER" />
              </b>
              <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_FOUNDED" />
              <br />
              <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_ADDRESS" />
              <a
                className="information__link"
                rel="noopener noreferrer"
                href="https://mangosteems.com/"
                target="_blank"
              >
                <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_ADDRESS_SECOND_LINE" />
              </a>
              <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_CONTACT" />
              <br />
              <br />
              <b>
                <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_PARTNER_TITLE" />
              </b>
              <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_PARTNER_IGROUP" />
              <a
                className="information__link"
                rel="noopener noreferrer"
                href="https://www.igroupnet.com/"
                target="_blank"
              >
                <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_PARTNER_ADDRESS" />
              </a>
              <div className="information__slide-box__img_container">
                <img src={mangoSteemLogo} alt="managosteem logo" />
                <img src={IGroupLogo} alt="igroup logo" />
              </div>
            </div>
            <div className="information__slide-box__section">
              <b>{`< Developer >`}</b>
              <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_PARTNER_IDC" />
              <br />
              {/* <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_PARTNER_ADDRESS" /> */}
              <a
                className="information__link"
                rel="noopener noreferrer"
                href="http://www.igroupkorea.kr/"
                target="_blank"
              >
                <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_INNER_PARTNER_IDC_ADDRESS" />
              </a>
              <span>Redbrick</span>
              <a
                className="information__link"
                rel="noopener noreferrer"
                href="https://redbrick.land/"
                target="_blank"
              >
                <FormattedMessage id="ID_ABOUT_INFORMATION_PROFILE_DEVELOPER_REDBRICK" />
              </a>
              <div className="information__slide-box__img_container">
                <img src={IDCLogo} alt="IDC logo" />
                <img className="redbrick_logo" src={RedbrickLogo} alt="redbrick logo" />
              </div>
            </div>
            <div className="information__slide-box__section">
              <b>{`< Sales Agent >`}</b>
              <span>IWASHIMA Co., Ltd</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
