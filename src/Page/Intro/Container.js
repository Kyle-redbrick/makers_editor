import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import View from "./View";

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blockCodingCourses: [
        {
          "id":1,
          "title": "Elementary",
          "detail": "ID_INTRO_BLOCKCODING_ELEMENTARY",
          "route": ""
        },
        {
          "id": 2,
          "title": "Basic",
          "detail": "ID_INTRO_BLOCKCODING_BASIC",
          "route": ""
        },
        {
          "id": 3,
          "title": "Advanced",
          "detail": "ID_INTRO_BLOCKCODING_ADVANCED",
          "route": ""
        },

      ],
      javaCodingCourses: [
        {
          "id":1,
          "title": "Basic",
          "detail": "ID_INTRO_JAVASCRIPT_BASIC",
          "route": ""
        },
        {
          "id":2,
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
