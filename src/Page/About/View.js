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
import "./index.scss";

function View(props) {

  return (
    <Layout>
      <div className="Page--About">
        <div className="about__section-banner">
          <div className="about-banner" />
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
              {/* TODO 클릭하여 활성화 할때마다 클래스 active 추가 */}
              <img alt="astro boy" className="first-section__character-border active" src={ImgBoy} />
              <img alt="suzu" className="first-section__character-border" src={ImgSuzu} />
              <img alt="astro kitty" className="first-section__character-border" src={ImgKitty} />
            </div>

            {/* TODO 두 영역이 연결되어 위에서 누르는 캐릭터들의 배너가 나와야함. */}

            <div className="first-section__character-intro-banner-list">
              <img alt="astro boy detail" src={ImgBannerBoy} />
             {/*  <img alt="suzu detail" src={ImgBannerSuzu} />
              <img alt="kitty detail" src={ImgBannerKitty} /> */}
            </div>
          </div>


          <div className="first_section first_section--character">
            <div className="first_section__header character--header">
              <FormattedMessage id="ID_INTRO_CHARACTER_TITLE" />
            </div>

            <div className="character_cards">

              <div className="character_card">
                <img src={AstroBoyImg} alt="astroboy_image" />
                <div className="character_card__contents">
                  <div className="character_card__name">
                    <FormattedMessage id="ID_INTRO_CHARACTER_ASTROBOY_TITLE" />
                  </div>
                  <div className="character_card__details">
                    <FormattedMessage id="ID_INTRO_CHARACTER_ASTROBOY" />
                  </div>
                </div>
              </div>

              <div className="character_card">
                <img src={AstroKittyImg} alt="astroboy_image" />
                <div className="character_card__contents">
                  <div className="character_card__name">
                    <FormattedMessage id="ID_INTRO_CHARACTER_ASTROKITTY_TITLE" />
                  </div>
                  <div className="character_card__details">
                    <FormattedMessage id="ID_INTRO_CHARACTER_ASTROKITTY" />
                  </div>
                </div>
              </div>

              <div className="character_card">
                <img src={SuzuImg} alt="astroboy_image" />
                <div className="character_card__contents">
                  <div className="character_card__name">
                    <FormattedMessage id="ID_INTRO_CHARACTER_SUZU_TITLE" />
                  </div>
                  <div className="character_card__details">
                    <FormattedMessage id="ID_INTRO_CHARACTER_SUZU" />
                  </div>
                </div>
              </div>
            </div>

            <Curriculum />

            <VerticalSlide />
          </div>
        </div>

        <div className="second_section">

          <div className="second_section--astrocoding">
            {/* video */}
            <div className="astrocoding_about__content">
              <div className="second_section__title">
                <FormattedMessage id="ID_INTRO_ASTRO_CODING_TITLE" />
              </div>
              <div className="second_section__detail">
                <FormattedMessage id="ID_INTRO_ASTRO_CODING_DETAIL" />
              </div>
            </div>
          </div>

          <div className="second_section--blockcoding">
            <div className="second_section__title">
              <FormattedMessage id="ID_INTRO_ASTRO_BLOCK_TITLE" />
            </div>
            {/* video */}
            <div className="astro_coding__contents">

              <div className="astro_coding__content">
                <div className="astro_coding__header">
                  <img src={BlockIcon} alt="blockcoding-icon" />
                  <FormattedMessage id="ID_INTRO_CODING_ELEMENTARY" />
                </div>

                <div className="astro_coding__detailWrapper">
                  <div className="astro_coding__detail">
                    <FormattedMessage id="ID_INTRO_BLOCKCODING_ELEMENTARY" />
                  </div>
                  <div className="astro_coding__detailWrapper_right">
                    <Link to="/lms/course/1" className="astro_coding__button">
                      <FormattedMessage id="ID_INTRO_CODING_LEARN" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="astro_coding__content">
                <div className="astro_coding__header">
                  <img src={BlockIcon} alt="blockcoding-icon" />
                  <FormattedMessage id="ID_INTRO_CODING_BASIC" />
                </div>

                <div className="astro_coding__detailWrapper">
                  <div className="astro_coding__detail">
                    <FormattedMessage id="ID_INTRO_BLOCKCODING_BASIC" />
                  </div>
                  <div className="astro_coding__detailWrapper_right">
                    <Link to="/lms/course/4" className="astro_coding__button">
                      <FormattedMessage id="ID_INTRO_CODING_LEARN" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="astro_coding__content">
                <div className="astro_coding__header">
                  <img src={BlockIcon} alt="blockcoding-icon" />
                  <FormattedMessage id="ID_INTRO_CODING_ADVANCED" />
                </div>

                <div className="astro_coding__detailWrapper">
                  <div className="astro_coding__detail">
                    <FormattedMessage id="ID_INTRO_BLOCKCODING_ADVANCED" />
                  </div>
                  <div className="astro_coding__detailWrapper_right">
                    <Link to="/lms/course/5" className="astro_coding__button">
                      <FormattedMessage id="ID_INTRO_CODING_LEARN" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="second_section--javascript-coding">
            <div className="second_section__title">
              <FormattedMessage id="ID_INTRO_ASTRO_JAVASCRIPT_TITLE" />
            </div>
            {/* video */}
            <div className="astro_coding__contents">

              <div className="astro_coding__content">
                <div className="astro_coding__header">
                  <img src={JavaSIcon} alt="blockcoding-icon" />
                  <FormattedMessage id="ID_INTRO_CODING_ADVANCED" />
                </div>

                <div className="astro_coding__detailWrapper">
                  <div className="astro_coding__detail">
                    <FormattedMessage id="ID_INTRO_JAVASCRIPT_ADVANCED" />
                  </div>
                  <div className="astro_coding__detailWrapper_right">
                    <Link to="/lms/course/6" className="astro_coding__button">
                      <FormattedMessage id="ID_INTRO_CODING_LEARN" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="astro_coding__content">

                <div className="astro_coding__header">
                  <img src={JavaSIcon} alt="blockcoding-icon" />
                  <FormattedMessage id="ID_INTRO_CODING_MASTERY" />
                </div>

                <div className="astro_coding__detailWrapper">
                  <div className="astro_coding__detail">
                    <FormattedMessage id="ID_INTRO_JAVASCRIPT_MASTERY" />
                  </div>
                  <div className="astro_coding__detailWrapper_right">
                    <Link to="/lms/course/7" className="astro_coding__button">
                      <FormattedMessage id="ID_INTRO_CODING_LEARN" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ContactUS />
      </div>
    </Layout>
  );
}

export default View;