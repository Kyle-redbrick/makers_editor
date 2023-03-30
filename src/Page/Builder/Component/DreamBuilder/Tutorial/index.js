import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import {
  BCScript_ja,
  BCScript_en,
  JSScript_en,
  JSScript_ja,
  bc_elem_img,
  bc_basic_img,
  bc_advanced_img,
  js_advanced_img,
  js_mastery_img,
} from "./script";
import "./index.scss";

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptIndex: 0
    };
  }

  get imageUrl() {
    const {lecture} = this.props.project;
    const lang = localStorage.getItem("lang");
    switch(lecture.title) {
      case "OOBC-ELEMENTARY":
        return bc_elem_img[lang];
      case "OOBC-BASIC":
        return bc_basic_img[lang];
      case "OOBC-ADVANCED":
        return bc_advanced_img[lang];
      case "JAVASCRIPT-ADVANCED":
        return js_advanced_img[lang];
      case "JAVASCRIPT-MASTERY":
        return js_mastery_img[lang];
      default:
        return;
    }
  }

  get script() {
    const lang = localStorage.getItem("lang");
    if (this.props.editorMode === "block") {
      switch (lang) {
        case "ja":
          return BCScript_ja;
        case "en":
          return BCScript_en;
        default :
          return BCScript_en;
      }
    } else {
      switch (lang) {
        case "ja":
          return JSScript_ja;
        case "en":
          return JSScript_en;
        default :
          return JSScript_en;
      }
    }
  }

  onClickReset = () => {
    this.setState({ scriptIndex: 0 })
  }

  onClickNext = () => {
    this.setState({ scriptIndex: this.state.scriptIndex + 1 })
  }

  onClickEnd = () => {
    localStorage.setItem(`didShowTutorial_${this.props.editorMode}`, true);
    this.props.hiddenTutorial();
  }

  render() {
    return (
      <div className="tutorial">
        <div className="tutorial_popup">
          <p className="guideLabel"><span className="num">{this.state.scriptIndex + 1}</span>{this.script[this.state.scriptIndex].subTitle}</p>
          <p className="guideTitle">{this.script[this.state.scriptIndex].title}</p>
          <img className="guideImg" src={this.imageUrl[this.state.scriptIndex]} alt="guide" />
          <div className="buttonWrapper">
            {this.state.scriptIndex === this.script.length - 1 ? (
              <>
                <button className="reset" onClick={this.onClickReset} >{this.props.intl.formatMessage({ id: "ID_DREAM_BUILDER_TUTORIAL_RESET" })}</button>
                <button onClick={this.onClickEnd}>{this.props.intl.formatMessage({ id: "ID_DREAM_BUILDER_TUTORIAL_START" })}</button>
              </>
            ) : (
              <button onClick={this.onClickNext}>{this.props.intl.formatMessage({ id: "ID_DREAM_BUILDER_TUTORIAL_NEXT" })}</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ editorMode: state.scene.editorMode })
)(injectIntl(Tutorial));