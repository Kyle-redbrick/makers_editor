import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../Common/Component/Layout";
import { FormattedMessage } from "react-intl";
import BlockIcon from "../../Image/intro-block-coding-icon.png";
import JavaSIcon from "../../Image/intro-javascript-icon.png";
import AstroBoyImg from "../../Image/img_AstroBoy.png";
import AstroKittyImg from "../../Image/img_AstroKitty.png";
import SuzuImg from "../../Image/img_Suzu.png";
import ContactUS from "../Intro/Contact";
import VerticalSlide from "../Intro/ThirdSection";
import ImgBoy from "../../Image/img_astro_boy_character.png";
import ImgSuzu from "../../Image/img_suzu_character.png";
import ImgKitty from "../../Image/img_astro_kitty_character.png";
import ImgBannerBoy from "../../Image/banner-astro-boy.png";
import ImgBannerSuzu from "../../Image/banner-suzu.png";
import ImgBannerKitty from "../../Image/banner-kitty.png";
import Curriculum from "./Curriculum";
import HorizontalSlide from "./HorizontalSlide";
import Structure from "./Structure";
import Information from "./Information";
import BannerCharacterImg from "../../Image/img-about-banner-character.png";
import "./index.scss";

function View({
  isChange,
  onChangeClick
}) {
  return (
    <Layout>
      <div className="Page--About">
        <div className="about__section-banner">
          <div className="about-banner">
            <div className="about-banner__title-box">
              <h3 className="about-banner__title"><FormattedMessage id="ID_ABOUT_TOP_BANNER_TITLE" /></h3>
              <span className="about-banner__child-title"><FormattedMessage id="ID_ABOUT_TOP_BANNER_CHILD_TITLE" /></span>
            </div>
            <img alt="캐릭터 이미지" src={BannerCharacterImg} />
          </div>
        </div>

        <div className="first_section">
          <div className="first_section first_section--about">
            <div className="first_section__header">
              <FormattedMessage id="ID_ABOUT_INTRO_TITLE" />
            </div>
            <div className="first_section__body">
              <FormattedMessage id="ID_ABOUT_INTRO_CHILD_TITLE" />
            </div>

            <div className="first-section__character-list">
              <span
                className={`first-section__character-item ${isChange === 1 ? "active": ""}`}
                onClick={() => onChangeClick(1)}
              >
                <img alt="astro boy" src={ImgBoy} />
              </span>
              <span
                className={`first-section__character-item ${isChange === 2 ? "active": ""}`}
                onClick={() => onChangeClick(2)}
              >
                <img alt="suzu"  src={ImgSuzu} />
              </span>
              <span
                className={`first-section__character-item ${isChange === 3 ? "active": ""}`}
                onClick={() => onChangeClick(3)}
              >
                <img alt="astro kitty"  src={ImgKitty} />
              </span>
            </div>

            <div className="first-section__character-intro-banner-list">
              <img alt="astro boy detail" src={ImgBannerBoy} className={`${isChange === 1 ? "on": ""}`} />
              <img alt="suzu detail" src={ImgBannerSuzu} className={`${isChange === 2 ? "on": ""}`} />
              <img alt="kitty detail" src={ImgBannerKitty} className={`${isChange === 3 ? "on": ""}`} />
            </div>
          </div>
        </div>
        <HorizontalSlide />

        <Curriculum />

        {/* vertical slide area */}
        <VerticalSlide />

        <Structure />

        <Information />

        <ContactUS />
      </div>
    </Layout>
  );
}

export default View;