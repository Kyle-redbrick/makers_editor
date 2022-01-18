import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import htmlParser from "./htmlParser.js"
import "./index.scss"

class Markdown extends Component {

  render() {
    return (
      <ReactMarkdown
        skipHtml={false}
        allowDangerousHtml
        astPlugins={[ htmlParser ]}
      >
        {this.props.children}
      </ReactMarkdown>
    );
  }
}

export default Markdown;
