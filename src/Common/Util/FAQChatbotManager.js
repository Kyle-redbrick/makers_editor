import React from "react";
import { withRouter } from "react-router-dom";
import FAQChatbot from "./FAQChatbot";

class FAQChatbotManager extends React.Component {

  componentDidMount() {
    if(this.isAvailable) {
      FAQChatbot.boot();
    }
  }
  get isAvailable() {
    const matches = this.props.location.pathname.match(/[^/]+/g)
    const currentPath = matches ? matches[0] : "";

    const disabledPaths = [
      "builder",
      "builder_edit",
      "builder_readonly",
      "qna_readonly",
      "wizlive",
      "wizlive_1v4",
      "monitor",
      "monitor_1v4",
      "videoclass",
      "dreamclass",
      "ocp",
      "ocp2",
      "ocp2js",
      "sef",
      "tutorial",
      "recordPlayer",
      "dreamEditor",
      "dreameditor",
      "pythonPage",
    ]

    return !disabledPaths.includes(currentPath);
  }

  render() {
    return null;
  }
}

export default withRouter(FAQChatbotManager);
