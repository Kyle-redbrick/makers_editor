import React, { Component } from "react";
import { connect } from "react-redux";
import RndWrapper from "../../utils/RndWrapper";
import View from "./View";
import Snippets from "../../utils/snippetLibrary";
import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

class Container extends Component {
  constructor(props) {
    super(props);

    this.lists = Snippets;
    this.lang = localStorage.getItem("wizLang")
      ? localStorage.getItem("wizLang")
      : "default";

    this.state = {
      selectedInx: 0
    };
  }

  handleSelectItem = index => {
    this.setState({ selectedInx: index });
    let content = document.querySelector(".SnippetContent__right");
    if (content) {
      content.scrollTop = 0;
    }
  };

  componentDidMount() {
    this.updateCodeSyntaxHighlighting();
  }

  componentDidUpdate() {
    this.updateCodeSyntaxHighlighting();
  }

  updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll(".javascript__code").forEach(block => {
      hljs.highlightBlock(block);
    });
  };

  copyToClipboard = str => {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999); // 추가
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  render() {
    const { handleSelectTab, handleChangeZIndex, zIndex, isOn } = this.props;
    const { lists, lang, handleSelectItem, copyToClipboard } = this;
    const { selectedInx } = this.state;
    if (!isOn) {
      return <div />;
    }

    return (
      <RndWrapper
        id="snippet"
        style={{ zIndex }}
        defaultWidth={500}
        defaultHeight={300}
        defaultX={document.body.clientWidth - 570}
        defaultY={16}
        minWidth={500}
        minHeight={300}
      >
        <View
          handleSelectTab={handleSelectTab}
          handleChangeZIndex={handleChangeZIndex}
          lists={lists}
          selectedInx={selectedInx}
          lang={lang}
          handleSelectItem={handleSelectItem}
          copyToClipboard={copyToClipboard}
        />
      </RndWrapper>
    );
  }
}

export default connect(
  state => ({}),
  {}
)(Container);
