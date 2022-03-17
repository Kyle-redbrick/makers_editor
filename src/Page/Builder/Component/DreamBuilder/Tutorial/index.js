import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { jsScript, oobcScript, oobcScript_en, oobcScript_ja } from "./script";
import "./index.scss";

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptIndex: 0
    };

  }

  get script() {
    const lang = localStorage.getItem("lang");
    if (this.props.editorMode === "block") {
      if (lang == "ja") {
        return oobcScript_ja;
      } else if (lang === "en") {
        return oobcScript_en;
      } else {
        return oobcScript;
      }
    } else {
      return jsScript;
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
          <img className="guideImg" src={this.script[this.state.scriptIndex].imageURL} alt="guide" />
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