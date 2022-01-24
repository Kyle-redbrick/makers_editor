import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import View from "./View";

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            characters: [
                {
                    "img": "",
                    "name": "",
                    "detail": ""
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
