import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { getColorTheme } from "../../utils/colorThemeUtil";
import steps from "./steps";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.steps = steps;
    this.state = {
      currentStepNum: 0,
      animOn: false
    };
  }

  componentDidMount = () => {
    const vc = document.getElementById("vc");
    if (vc) {
      vc.hidden = true;
    }
  };

  componentWillUnmount = () => {
    const vc = document.getElementById("vc");
    if (vc) {
      vc.hidden = false;
    }
  };

  onClickNext = () => {
    const currentStepNum = this.state.currentStepNum + 1;
    if (currentStepNum >= this.steps.length) {
      localStorage.setItem("didReadHelp", true);
      this.props.handleHelp(false);
    } else {
      this.setState({ currentStepNum, animOn: true }, () => {
        setTimeout(() => {
          this.setState({ animOn: false });
        }, 50);
      });
    }
  };
  onClickSkip = () => {
    localStorage.setItem("didReadHelp", true);
    this.props.handleHelp(false);
  };

  render() {
    const { currentStepNum, animOn } = this.state;
    const totalStepNum = this.steps.length;
    const currentStep = this.steps[currentStepNum];
    const darkmode = getColorTheme() === "darkMode";
    return (
      <View
        animOn={animOn}
        currentStepNum={currentStepNum}
        totalStepNum={totalStepNum}
        currentStep={currentStep}
        darkmode={darkmode}
        onClickNext={this.onClickNext}
        onClickSkip={this.onClickSkip}
      />
    );
  }
}

export default injectIntl(Container);
