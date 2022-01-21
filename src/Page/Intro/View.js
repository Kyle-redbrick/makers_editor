import React from "react";
import Layout from "../../Common/Component/Layout";
import { FormattedMessage } from "react-intl";
import "./index.scss";

function View(props) {

    return (

        <Layout>
            <div className="Page--Intro">
                {/* 배너 */}
                <div className="intro__section-banner">
                    <div className="intro-banner" />
                </div>

                {/* 간단 소개 */}
                <div className="intro__section intro__section--intro">
                    <div className="intro__section__header">
                        <FormattedMessage id="ID_INTRO_ABOUT_ASTROBOY" />
                    </div>
                    <div className="intro__section__body">
                        {/* <FormattedMessage /> */}
                    </div>
                </div>


                {/* 캐릭터 */}
                <div className="intro__section intro__section--character">
                    <div className="intro__section__header">
                        {/* <FormattedMessage id="ID_INTRO_CHARACTER" /> */}
                    </div>
                    <div className="intro__section__body">

                    </div>
                </div>

                { /* 설명 */}
            </div>
        </Layout>
    );
}

export default View;