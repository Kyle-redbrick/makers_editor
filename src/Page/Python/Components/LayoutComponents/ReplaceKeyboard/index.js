import React, { Component } from "react";
import "./index.scss";

import backspaceIcon from "../../../../../Image/newPython/workspace-37-backspace.svg";
import keyboardIcon from "../../../../../Image/newPython/workspace-37-keyboard.svg";
import returnIcon from "../../../../../Image/newPython/workspace-37-return.svg";

class ReplaceKeyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      layout: "default",
      isKeyboardOn: true
    };
  }

  render() {
    const {
      isCodeEditorOpen,
      isReadOnly,
      setIsReadOnly,
      // codeEditor
    } = this.props;
    return (
      <div
        className={`replaceKeyboard  ${
          !isCodeEditorOpen ? "keyboardHide" : ""
        }`}
      >
        <div className="replaceKeyboardHeader">
          <div className="replaceKeyWrapper">
            <p>
              <span>print()</span>
            </p>
            <p>
              <span>int()</span>
            </p>
            <p>
              <span>replace()</span>
            </p>
            <p>
              <span>sort()</span>
            </p>
            <p>isReadOnly: {isReadOnly ? "true" : "false"}</p>
          </div>
          <div className="btnWrapper">
            <img src={backspaceIcon} alt="" />
            <img
              src={keyboardIcon}
              alt=""
              onClick={() => {
                setIsReadOnly(!isReadOnly);
              }}
            />
            <img src={returnIcon} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default ReplaceKeyboard;
