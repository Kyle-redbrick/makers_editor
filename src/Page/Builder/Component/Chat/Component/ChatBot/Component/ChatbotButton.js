import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as ChatbotUtil from "../../../../../utils/ChatbotUtil";
import { getGuestId } from "../../../../../../../Common/Util/GuestIdUtil";
import * as chatbotActions from "../../../../../Store/Reducer/chatbot";

class ChatbotButton extends Component {
  createMessage = () => {
    const { formatMessage } = this.props.intl;
    const { questionType, keyword } = this.props;
    switch (questionType) {
      case "api":
        return formatMessage({ id: "ID_CHATBOT_API_QUESTION" }, { api: keyword });
      case "class":
        return formatMessage({ id: "ID_CHATBOT_CLASS_QUESTION" }, { class: keyword });
      default:
        return null;
    }
  }

  handleOnClick = () => {
    const sender = this.props.name || null;
    const email = this.props.email || getGuestId();
    const { keyword } = this.props;

    //create msg
    const msg = this.createMessage(keyword);
    if (!msg) return;

    this.props.addNewMsg([{ text: msg, sender, email, type: "USER_QUESTION" }]);

    ChatbotUtil.sendMsg(
      { userId: email, description: msg },
      messages => {
        //add messages
        if (messages && messages.length > 0){
          this.props.addNewMsg(messages);
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  render() {
    const { handleOnClick, createMessage } = this;
    const message = createMessage();
    return (
      <div className="ChatbotButtonsWrapper">
        <div className="ChatbotButtons">
          <div className="ChatbotButton" onClick={handleOnClick}>
            <span>{message}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({}),
  {
    addNewMsg: chatbotActions.addNewMsg
  }
)(injectIntl(ChatbotButton));
