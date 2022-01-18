import React from "react";

export default function ChatbotSelect(props) {
  const { options, handleOption } = props;
  return (
    <ul className="ChatbotSelect">
      {options.map((option, index) => {
        return (
          <button
            key={index}
            className="ChatbotOption"
            onClick={() => {
              handleOption(option);
            }}
          >
            {option.text}
          </button>
        );
      })}
    </ul>
  );
}
