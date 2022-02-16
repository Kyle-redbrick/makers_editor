import React, { Component } from "react";
import "./index.scss";
import Markdown from "react-markdown";


class AgreementPopUp extends Component {
  render() {
    const {
      title,
      content
    } = this.props;

    return (
      <div className="agreement">
        <div className="popup_title">
          {title}
        </div>
        <div className="agreement_text">
          <Markdown source={content} />
        </div>
      </div>
    );
  }

}
export default AgreementPopUp;