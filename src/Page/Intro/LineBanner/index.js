import React from "react";
import { FormattedMessage } from "react-intl";
import LinkArrowRightIcon from "../../../Image/btn_arrow_right.svg"
import "./index.scss";

function LineBanner () {
  return (
    <div className="line-banner">
      <div className="line-banner__inner">
        <h3 className="line-banner__title"><FormattedMessage id="ID_INTRO_LINE_BANNER_TITLE" /></h3>
        <span className="line-banner__child-title"><FormattedMessage id="ID_INTRO_LINE_BANNER_CHILD_TITLE" /></span>

        {/* TODO  클릭 시 무료 체험용 과정 페이지로 랜딩 됩니다. */}
        <a  className="line-banner__go-to-link" href="https://astroboy-dev.wizclass.com/learn" rel="noopener noreferrer" ><FormattedMessage id="ID_INTRO_LINE_BANNER_GO_TO_FREE_COURSE_LINK" />
        <img alt="더보기 아이콘" src={LinkArrowRightIcon} /></a>
      </div>
    </div>
  )
}

export default LineBanner;