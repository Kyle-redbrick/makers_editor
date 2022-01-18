import React, { Component } from "react";
import "./index.scss";

export default class CodeViewer extends Component {
  viewId = "CodeViewerAceEditor" + Math.floor(Math.random() * 100000);

  componentDidMount() {
    const ace = window.ace;
    const aceEditor = ace.edit(this.viewId);
    aceEditor.session.setMode(`ace/mode/javascript-wiz`);
    aceEditor.setTheme("ace/theme/wizschool");
    aceEditor.setValue(this.props.code, 1);
    aceEditor.setReadOnly(true);
  }

  render() {
    return (
      <div className="CodeViewer">
        <div id={this.viewId} className="CodeViewerAceEditor" />
      </div>
    );
  }
}
