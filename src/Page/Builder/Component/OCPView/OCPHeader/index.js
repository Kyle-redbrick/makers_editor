import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as TrackingUtil from "../../../../../Common/Util/TrackingUtil";
import { getColorTheme, toggleColorTheme } from "../../../utils/colorThemeUtil";
import "./index.scss";

import logoImg from "../../../../../Image/wizlab_logo.svg";
import darkSwitchImg from "../../../../../Image/builder/dark-mode.svg";
import lightSwitchImg from "../../../../../Image/builder/light-mode.svg";

class OCPHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { currentColorTheme: getColorTheme() };
  }

  onClickThemeSwitch = () => {
    toggleColorTheme();
    const currentColorTheme = getColorTheme();
    this.setState({ currentColorTheme });
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: "ChangeColorMode",
      label: currentColorTheme
    });
  };

  onClickLevel = level => {
    this.props.history.replace(`./${level}`);
    window.location.reload();
  };

  render() {
    const { currentColorTheme } = this.state;
    const { videoclassRef } = this.props;
    const title = videoclassRef ? videoclassRef.videoclass.title : "";
    const maxOCPLevel = videoclassRef ? videoclassRef.props.maxOcpLevel : 0;
    const currentOCPLevel = videoclassRef ? videoclassRef.videoclass.level : 0;
    return (
      <div className="ocpView_header">
        <img className="ocpView_header_logo" src={logoImg} alt="logo" />
        <div className="ocpView_header_title">{title}</div>
        <div className="ocpView_header_levels">
          {true &&
            [...Array(10)].map((element, index) => {
              return (
                <div
                  key={index}
                  className={`ocpView_header_level ocpView_header_level-${
                    index < maxOCPLevel ? "active" : "inactive"
                  }${
                    index === currentOCPLevel - 1
                      ? " ocpView_header_level-current"
                      : ""
                  }`}
                  onClick={() => {
                    this.onClickLevel(index + 1);
                  }}
                >
                  {index + 1}
                </div>
              );
            })}
        </div>
        <img
          className="ocpView_header_themeSwitch"
          src={
            currentColorTheme === "lightMode" ? lightSwitchImg : darkSwitchImg
          }
          alt="themeSwitch"
          onClick={this.onClickThemeSwitch}
        />
      </div>
    );
  }
}

export default withRouter(OCPHeader);
