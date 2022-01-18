import React, { Component } from "react";
import { injectIntl } from "react-intl";
import Markdown from "./Markdown"
import "./index.scss";

import ego from "../../../Image/ego.svg"

const MESSAGE = {
  NORMAL: "normal",
  WARN: "warn",
  ERROR: "error"
}
class WizMate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      messageType: MESSAGE.NORMAL,
      isSpeaking: false,
    };
  }

  onClickCharacter = () => {
    this.speak(this.props.intl.formatMessage({ id: "ID_WIZMATE_EGO_MSG" }));
  }
  onClickMessage = () => {
    this.stop();
  }

  speak(message, duration = 5000, messageType = MESSAGE.NORMAL) {
    if(this.state.isSpeaking) {
      this.stop(() => {
        this.speak(message, duration, messageType);
      })
    } else {
      this.setState({ message, messageType, isSpeaking: true }, () => {
        if(duration > 0) {
          this.setStopTimer(duration);
        }
      });
    }
  }
  warn(message, duration) {
    this.speak(message, duration, MESSAGE.WARN);
  }
  error(message, duration) {
    this.speak(message, duration, MESSAGE.ERROR);
  }
  stop(callback) {
    this.clearStopTimer();
    this.setState({ isSpeaking: false }, () => {
      if(callback) {
        callback();
      }
    });
  }

  setStopTimer(timeout) {
    this.clearStopTimer();
    this.stopTimer = setTimeout(() => {
      this.setState({ isSpeaking: false });
    }, timeout);
  }
  clearStopTimer() {
    if(this.stopTimer) {
      clearTimeout(this.stopTimer);
      this.stopTimer = undefined;
    }
  }

  render() {
    return (
      <div className={`wizmate wizmate-${this.state.isSpeaking ? "speaking" : "idle"}`}>
        <div className="wizmate_character" onClick={this.onClickCharacter}>
          <img src={ego} alt="character" />
        </div>
        <div
          className={`wizmate_message wizmate_message-${this.state.messageType}`}
          onClick={this.onClickMessage}
        >
          <Markdown>
            {this.state.message}
          </Markdown>
        </div>
      </div>
    );
  }
}

export default injectIntl(WizMate);
