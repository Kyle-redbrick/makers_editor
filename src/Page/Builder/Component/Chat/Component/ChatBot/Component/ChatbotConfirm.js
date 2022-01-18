import React from "react";

export default function ChatbotConfirm(props) {
  const { confirmText, cancelText, handleConfirm, handleCancel } = props;
  return (
    <div className="ChatbotConfirm">
      <button
        className="ChatbotConfirm__btn ChatbotConfirm__btn--okay"
        onClick={() => handleConfirm(confirmText)}
      >
        {confirmText}
      </button>
      {handleCancel ? (
        <button
          className="ChatbotConfirm__btn ChatbotConfirm__btn--cancel"
          onClick={() => handleCancel(cancelText)}
        >
          {cancelText}
        </button>
      ) : null}
    </div>
  );
}
