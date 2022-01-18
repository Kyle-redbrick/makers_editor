import React from "react";
import ChatbotMsgBot from "./ChatbotMsgBot";
import ChatbotButton from "./ChatbotButton";

export default function ChatbotError(props) {
  const { errors } = props;
  const { formatMessage } = this.props.intl;

  return (
    <ChatbotMsgBot item={{ text: formatMessage({ id: "ID_BUILDER_CHATBOT_ERROR" }) }}>
      {errors.map((item, index) => {
        const startLine = item.loc ? item.loc.start.line : item.row + 1;
        return (
          <React.Fragment key={index}>
            <div className="ChatbotErrorItem" onClick={item.onClick}>
              <p className={"ChatbotErrorItem__text"}>
                <span className="ChatbotErrorItem__line">{`${formatMessage({ id: "ID_BUILDER_CHATBOT_LINK" })} ${startLine}`}</span>
                <span>{item.text}</span>
              </p>
            </div>
            {item.keywords && item.keywords.map((keyword, i) => {
              return (
                <React.Fragment key={i}>
                  <ChatbotButton questionType={"api"} keyword={keyword} />
                  <ChatbotButton questionType={"class"} keyword={keyword} />
                </React.Fragment>)
            })}
          </React.Fragment>
        );
      })}
    </ChatbotMsgBot>
  );
}