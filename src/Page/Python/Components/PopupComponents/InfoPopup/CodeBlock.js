import React, { Component, PureComponent } from "react";
import IconOn from "../../../../../Image/newPython/ic-on.png"
import IconOff from "../../../../../Image/newPython/ic-off.png"
class CodeBlock extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isFolded: true };
  }

  get id() {
    return this.folderId + "_" + this.props.node.position.start.line;
  }

  get folderId() {
    return this.props.node.meta;
  }
  get code() {
    return this.props.value || "";
  }

  onClickDrop = () => {
    const isFolded = !this.state.isFolded;
    this.setState({ isFolded });
  };

  render() {
    return (
      <div className="codeblock">
        <div className="codeblock__header">
          <div className="codeblock__header__text">{this.folderId}</div>
          <img
            className="codeblock__header_dropdown"
            src={this.state.isFolded ? IconOn : IconOff}
            alt="dropdown"
            onClick={this.onClickDrop}
          />
        </div>
        {this.state.isFolded || (
          <div className="codeblock__body">
            <Code id={this.id} code={this.code}/>
          </div>
        )}
      </div>
    );
  }
}

class Code extends Component {
  componentDidMount() {
    this.initEditor();
  }
  
  initEditor() {
    this.editor = window.ace.edit(this.editorId);
    this.editor.session.setMode(`ace/mode/python`);
    this.editor.getSession().setUseWorker(false);
    this.editor.setTheme("ace/theme/wizschool-python");
    this.editor.renderer.setShowGutter(false);
    this.editor.setOptions({ maxLines: Infinity });
    this.editor.setFontSize(15);
    this.editor.setValue(this.props.code, 1);
    this.editor.setReadOnly(true);
  }

  get editorId() {
    return "codeblock_code-" + this.props.id;
  }

  render() {
    return (
    <div id={this.editorId} className="codeblock_code" />
    );
  }
}

export default CodeBlock;