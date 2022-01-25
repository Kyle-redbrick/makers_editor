import React from "react";
import Layout from "../../Common/Component/Layout";
import { FormattedMessage } from "react-intl";
import BlockIcon from "../../Image/intro-block-coding-icon.png";
import JavaSIcon from "../../Image/intro-javascript-icon.png";
import "./index.scss";

function View(props) {
    const {
        characters,
        blockCodingCourses,
        javaCodingCourses
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
                            {characters.map((character) => (
                                <div className="character_card">
                                    <img src={character.img} alt="astroboy_image" />
                                    <div className="character_card__contents">
                                        <div className="character_card__name">
                                            <FormattedMessage id={character.name} />
                                        </div>
                                        <div className="character_card__details">
                                            <FormattedMessage id={character.detail} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="second__section">

                    <div className="second__section--astrocoding">
                        {/* video */}
                        <div className="astrocoding_intro__content">
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
                        <div className="astro_coding__contents">
                            {blockCodingCourses.map((course) => (
                                <div class="astro_coding__content">

                                    <div class="astro_coding__header">
                                        <img src={BlockIcon} alt="blockcoding-icon" />
                                        <FormattedMessage id={course.title} />
                                    </div>

                                    <div class="astro_coding__detailWrapper">
                                        <div class="astro_coding__detail">
                                            <FormattedMessage id={course.detail} />
                                        </div>
                                        <div class="astro_coding__detailWrapper_right">
                                            <button className="astro_coding__button">
                                                Learn Now
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="second__section--javascript-coding">
                        <div className="second__section__title">
                            <FormattedMessage id="ID_INTRO_ASTRO_JAVASCRIPT_TITLE" />
                        </div>
                        {/* video */}
                        <div className="astro_coding__contents">
                            {javaCodingCourses.map((course) => (
                                <div class="astro_coding__content">

                                    <div class="astro_coding__header">
                                        <img src={JavaSIcon} alt="blockcoding-icon" />
                                        <FormattedMessage id={course.title} />
                                    </div>

                                    <div class="astro_coding__detailWrapper">
                                        <div class="astro_coding__detail">
                                            <FormattedMessage id={course.detail} />
                                        </div>
                                        <div class="astro_coding__detailWrapper_right">
                                            <button className="astro_coding__button">
                                                Learn Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>






        </Layout>
    );
}

export default View;