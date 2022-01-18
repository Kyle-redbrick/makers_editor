import React, { Component } from "react";
import { injectIntl } from "react-intl";
import "./index.scss";

class CodeWriter extends Component {
  componentDidMount() {
    const ace = window.ace;
    const aceEditor = ace.edit("CodeWriterAceEditor");
    aceEditor.session.setMode(`ace/mode/javascript-wiz`);
    aceEditor.setTheme("ace/theme/wizschool");
    aceEditor.setValue(this.props.code, 1);
    aceEditor.on("change", this.handleOnChange);
  }

  handleOnChange = (e, editor) => {
    this.props.onChange && this.props.onChange(editor.getValue());
  };

  render() {
    return (
      <div className="CodeWriter">
        <div id="CodeWriterAceEditor" />
      </div>
    );
  }
}
export default injectIntl(CodeWriter);
