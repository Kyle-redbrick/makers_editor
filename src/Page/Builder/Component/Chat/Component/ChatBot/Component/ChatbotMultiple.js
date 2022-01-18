import React from "react";

export default function ChatbotMultiple(props) {
  const { item, handleSelect } = props;
  const answer = item.answer;
  const distractor = item.distractor;

  return (
    <div className="ChatbotMultiple">
      {[...answer, ...distractor].map((choice, index) => {
        return (
          <button
            style={{ display: "block", fontSize: "16px" }}
            className="ChatbotMultiple__btn ChatbotMultiple__btn--okay"
            onClick={() => handleSelect(choice)}
            key={index}
          >
            {choice.text}
          </button>
        );
      })}
    </div>
  );
}
