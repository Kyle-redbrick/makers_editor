import React, { useEffect}  from "react";
import { Link } from "react-router-dom";
import Layout from "../../Common/Component/Layout";
import { FormattedMessage } from "react-intl";
import BlockIcon from "../../Image/intro-block-coding-icon.png";
import JavaSIcon from "../../Image/intro-javascript-icon.png";
import AstroBoyImg from "../../Image/img_AstroBoy.png";
import AstroKittyImg from "../../Image/img_AstroKitty.png";
import SuzuImg from "../../Image/img_Suzu.png";
import ImgSecondVisual from "../../Image/second-visual-img.png";
import IconKids from "../../Image/ic-kids.svg";
import IconMission from "../../Image/ic-mission.svg";
import IconClock from "../../Image/ic-clock.svg";
import ThirdSection from "./ThirdSection";
import PlayGameSection from "./PlayGameSection";
import LineBanner from "./LineBanner";
import TextImg from "../../Image/fade-in-text.png";
import TextImg2 from "../../Image/fade-in-text-2.png";
import IntroduceSection from "./IntroduceSection";
import ViewMore from "./ViewMore";
/* import IntroduceSection from "./IntroduceSection"; */
import Contact from "./Contact";
import ScrollAction from "./ScrollAction";

import "./index.scss";

function View(props) {
  
  return (
    <Layout>
      <div className="Page--Intro">
        <div className="intro__section-banner">
          <div className="intro-banner" />
        </div>

        <div className="first-section"> 
          <div className="first-section first-section--intro">
            <div className="first-section__header">
              <FormattedMessage id="ID_INTRO_ABOUT_ASTRO_CODING_GO_TITLE" />
            </div>

            <div className="first-section__video-wrap">
              {/* TODO video  */}
              <div className="first-section__video">
                {/* TODO video play button */}
                <button type="button" className="first-section__play-btn" />
              </div>
            </div>

          </div>
        </div>

        <div className="second-section">
          <div className="second-section__inner">
            <div className="second-section__header">
              <FormattedMessage id="ID_INTRO_SECOND_SECTION_TITLE" />
            </div>

            <img className="second-section__visual-img" alt="비주얼 이미지" src={ImgSecondVisual} />

            <div className="second-section__mission">
              <ul className="second-section__mission-info-list">
                <li className="second-section__mission-list-item">
                  <img alt="6 to 12 아이콘" src={IconKids} /> 
                  <span className="second-section__mission-title">
                    <FormattedMessage id="ID_INTRO_SECOND_SECTION_INFO_TITLE_1" />
                  </span>
                  <span className="second-section__mission-explain">
                    <FormattedMessage id="ID_INTRO_SECOND_SECTION_INFO_TITLE_1_EXPLAN" />
                  </span>
                </li>

                <li className="second-section__mission-list-item">
                  <img alt="36 mission 아이콘" src={IconMission} /> 
                  <span className="second-section__mission-title">
                    <FormattedMessage id="ID_INTRO_SECOND_SECTION_INFO_TITLE_2" />
                  </span>
                  <span className="second-section__mission-explain">
                    <FormattedMessage id="ID_INTRO_SECOND_SECTION_INFO_TITLE_2_EXPLAN" />
                  </span>
                </li>

                <li className="second-section__mission-list-item">
                  <img alt="100 hours 아이콘" src={IconClock} /> 
                  <span className="second-section__mission-title">
                    <FormattedMessage id="ID_INTRO_SECOND_SECTION_INFO_TITLE_3" />
                  </span>
                  <span className="second-section__mission-explain">
                    <FormattedMessage id="ID_INTRO_SECOND_SECTION_INFO_TITLE_3_EXPLAN" />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Vertical slide 배너 영역 */}
        <ThirdSection />

        {/* 띠배너 영역 */} 
        <LineBanner />

        {/* 게임 영상 재생 영역 */}
        <PlayGameSection />

        {/* 텍스트 이미지 애니메이션 효과 */}
        <div className="intro-page__fade-in-text">
          <img  alt="why use astro coding go?"  data-aos="fade-up" data-aos-duration="700"  className="intro-page__fade-in-img" src={TextImg} />
        </div>
        
        {/* introduce 영역 */}
        <IntroduceSection />
        {/* //introduce 영역 */}

        {/* 텍스트 이미지 애니메이션 효과 */}
        <div className="intro-page__fade-in-text">
          <img  alt="A self-Learning Platform For Instructors"  data-aos="fade-up" data-aos-duration="700"  className="intro-page__fade-in-img" src={TextImg2} />
        </div>

        {/* 스크롤 애니메이션 */}
        <ScrollAction />

         {/* view more section */}
         <ViewMore />

        {/* Contact Us */}
        <Contact />
       
      </div>
    </Layout>
  );
}

export default View;