import React, { Component } from "react";
import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import "./highlight-wizschool.scss";
hljs.registerLanguage("javascript", javascript);

export default class ChatbotMsgScript extends Component {
  constructor(props) {
    super(props);
    this.editorRef = null;
    this.setEditorRef = element => {
      this.editorRef = element;
    };
  }

  componentDidMount() {
    hljs.highlightBlock(this.editorRef);
  }

  render() {
    let {
      // msgId,
      script
    } = this.props;

    return (
      <div className="ChatbotScript">
        <pre ref={this.setEditorRef}>
          <code className="javascript ChatbotScript__code">{script}</code>
        </pre>
      </div>
    );
  }
}
