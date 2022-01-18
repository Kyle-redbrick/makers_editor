import React from "react";
import { connect } from "react-redux";

function ChatbotMsgBot(props) {
  let { item, tutor, defaultTutor, type, intl } = props;
  tutor = tutor || defaultTutor;
  // temp
  let tutorName = tutor.name.ko;
  if (type === "hint") tutorName += intl.formatMessage({ id: "ID_BUILDER_CHATBOT_HINT" });
  else if (type === "noti") tutorName += intl.formatMessage({ id: "ID_BUILDER_CHATBOT_NOTI" });

  return (
    <div className="ChatContentMainMessage">
      <div className="ChatContentMainMessageUserLine">
        <div className="ChatContentMainMessageIcon">
          <img src={tutor.icon} alt="chatbot-icon" />
        </div>
        <div className="ChatContentMainMessageName">{tutorName}</div>
      </div>
      <div className="ChatContentMainMessageContentLine">
        <div className="ChatContentMainMessageContent">{item.text}</div>
      </div>
      <div className="ChatbotMsg__subRow">{props.children}</div>
    </div>
  );
}

export default connect(
  state => ({
    defaultTutor: state.chatbot.tutor
  }),
  {}
)(ChatbotMsgBot);
