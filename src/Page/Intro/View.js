import React from "react";
import Layout from "../../Common/Component/Layout";
import { FormattedMessage } from "react-intl";
import SuzuImg from "../../Image/img_Suzu.png";
import AstroBoyImg from "../../Image/img_AstroBoy.png";
import AstroKittyImg from "../../Image/img_AstroKitty.png";
import BlockIcon from "../../Image/intro-block-coding-icon.png";
import "./index.scss";

function View(props) {
    const {
        blockCodingCourses,
        javaCodingCourses,
    } = props;

    return (
        <Layout>
            <div className="Page--Intro">
                <div className="intro__section-banner">
                    <div className="intro-banner" />
                </div>

                <div className="first__section">
                    <div className="intro__section intro__section--intro">
                        <div className="intro__section__header">
                            <FormattedMessage id="ID_INTRO_ABOUT_ASTROBOY_GO_TITLE" />
                        </div>
                        <div className="intro__section__body">
                            <FormattedMessage id="ID_INTRO_ABOUT_ASTROBOY_GO" />
                        </div>
                    </div>


                    <div className="intro__section intro__section--character">
                        <div className="intro__section__header character--header">
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

                <div className="second__section">
                    <div className="second__section--astrocoding">
                        {/* video */}
                        <div className="astrocoding__content">
                            <div className="second__section__title">
                                <FormattedMessage id="ID_INTRO_ASTRO_CODING_TITLE" />
                            </div>
                            <div className="second__section__detail">
                                <FormattedMessage id="ID_INTRO_ASTRO_CODING_DETAIL" />
                            </div>
                        </div>
                    </div>

                    <div className="second__section--blockcoding">
                        <div className="second__section__title">
                            <FormattedMessage id="ID_INTRO_ASTRO_BLOCK_TITLE" />
                        </div>
                        {/* video */}
                        <div className="astro_blockcoding__contents">
                            {blockCodingCourses.map((course) => (
                                <div class="astro_blockcoding__content">
                                    <div class="astro_blockcoding__header">
                                        <img src={BlockIcon} alt="blockcoding-icon" />
                                        <FormattedMessage id={course.title} />
                                    </div>
                                    <div class="astro_blockcoding__detail">
                                        <FormattedMessage id={course.detail} />
                                    </div>
                                    {/* <button className="astro_blockcoding_button">
                                Learn Now
                            </button> */}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="second__section--javacoding">


                    </div>

                </div>





            </div>






        </Layout>
    );
}

export default View;