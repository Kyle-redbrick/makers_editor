import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AstroBoyImg from "../../Image/img_AstroBoy.png";
import AstroKittyImg from "../../Image/img_AstroKitty.png";
import SuzuImg from "../../Image/img_Suzu.png";
import View from "./View";

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            characters: [
                {
                    "img": AstroBoyImg,
                    "name": "ID_INTRO_CHARACTER_ASTROBOY_TITLE",
                    "detail": "ID_INTRO_CHARACTER_ASTROBOY"
                },
                {
                    "img": AstroKittyImg,
                    "name": "ID_INTRO_CHARACTER_ASTROKITTY_TITLE",
                    "detail": "ID_INTRO_CHARACTER_ASTROKITTY"
                },
                {
                    "img": SuzuImg,
                    "name": "ID_INTRO_CHARACTER_SUZU_TITLE",
                    "detail": "ID_INTRO_CHARACTER_SUZU"
                }
            ],
            blockCodingCourses: [
                {
                    "title": "Elementary",
                    "detail": "ID_INTRO_BLOCKCODING_ELEMENTARY",
                    "route": ""
                },
                {
                    "title": "Basic",
                    "detail": "ID_INTRO_BLOCKCODING_BASIC",
                    "route": ""
                },
                {
                    "title": "Advanced",
                    "detail": "ID_INTRO_BLOCKCODING_ADVANCED",
                    "route": ""
                },

            ],
            javaCodingCourses: [
                {
                    "title": "Basic",
                    "detail": "ID_INTRO_JAVASCRIPT_BASIC",
                    "route": ""
                },
                {
                    "title": "Advanced",
                    "detail": "ID_INTRO_JAVASCRIPT_ADVANCED",
                    "route": ""
                },

            ]
        };
    }

    render() {
        const {
            characters,
            blockCodingCourses,
            javaCodingCourses
        } = this.state;

        return (
            <View
                characters={characters}
                blockCodingCourses={blockCodingCourses}
                javaCodingCourses={javaCodingCourses}
            />
        );
    }
}

export default withRouter(Container);
