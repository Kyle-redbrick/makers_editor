import React from "react";
import Layout from "../../Common/Component/Layout";
import { FormattedMessage } from "react-intl";
import BlockIcon from "../../Image/intro-block-coding-icon.png";
import JavaSIcon from "../../Image/intro-javascript-icon.png";
import AstroBoyImg from "../../Image/img_AstroBoy.png";
import AstroKittyImg from "../../Image/img_AstroKitty.png";
import SuzuImg from "../../Image/img_Suzu.png";
import "./index.scss";

function View(props) {

  return (
    <Layout>
      <div className="Page--Intro">
        <div className="intro__section-banner">
          <div className="intro-banner" />
        </div>

        <div className="first_section">
          <div className="first_section first_section--intro">
            <div className="first_section__header">
              <FormattedMessage id="ID_INTRO_ABOUT_ASTROBOY_GO_TITLE" />
            </div>
            <div className="first_section__body">
              <FormattedMessage id="ID_INTRO_ABOUT_ASTROBOY_GO" />
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
          </div>
        </div>

        <div className="second_section">

          <div className="second_section--astrocoding">
            {/* video */}
            <div className="astrocoding_intro__content">
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
                    <button className="astro_coding__button">
                      <FormattedMessage id="ID_INTRO_CODING_LEARN" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="astro_coding__content">
                <div className="astro_coding__header">
                  <img src={BlockIcon} alt="blockcoding-icon" />
                  Basic
                </div>

                <div className="astro_coding__detailWrapper">
                  <div className="astro_coding__detail">
                    <FormattedMessage id="ID_INTRO_BLOCKCODING_BASIC" />
                  </div>
                  <div className="astro_coding__detailWrapper_right">
                    <button className="astro_coding__button">
                      <FormattedMessage id="ID_INTRO_CODING_LEARN" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="astro_coding__content">
                <div className="astro_coding__header">
                  <img src={BlockIcon} alt="blockcoding-icon" />
                  Advanced
                </div>

                <div className="astro_coding__detailWrapper">
                  <div className="astro_coding__detail">
                    <FormattedMessage id="ID_INTRO_BLOCKCODING_ADVANCED" />
                  </div>
                  <div className="astro_coding__detailWrapper_right">
                    <button className="astro_coding__button">
                      <FormattedMessage id="ID_INTRO_CODING_LEARN" />
                    </button>
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
                  Basic
                </div>

                <div className="astro_coding__detailWrapper">
                  <div className="astro_coding__detail">
                    <FormattedMessage id="ID_INTRO_JAVASCRIPT_BASIC" />
                  </div>
                  <div className="astro_coding__detailWrapper_right">
                    <button className="astro_coding__button">
                      <FormattedMessage id="ID_INTRO_CODING_LEARN" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="astro_coding__content">

                <div className="astro_coding__header">
                  <img src={JavaSIcon} alt="blockcoding-icon" />
                  Advanced
                </div>

                <div className="astro_coding__detailWrapper">
                  <div className="astro_coding__detail">
                    <FormattedMessage id="ID_INTRO_JAVASCRIPT_ADVANCED" />
                  </div>
                  <div className="astro_coding__detailWrapper_right">
                    <button className="astro_coding__button">
                      <FormattedMessage id="ID_INTRO_CODING_LEARN" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default View;