import React, { Component } from "react";
import DreamSlide from "../../../../../Common/Component/DreamSlide";
import Field from "../../Field";
import "./index.scss";

class SlideField extends Component {
  constructor(props) {
    super(props);
    this.editorId = "slide_editor";
    this.state = { shouldRerender: false };
  }
  componentDidMount() {
    this.setupEditor();
    this.setCode(this.props.value);
    setTimeout(this.forceRerenderSlide, 1000);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setCode(this.props.value);
    }
  }

  setupEditor() {
    this.editor = window.ace.edit(this.editorId, { wrap: true });
    this.editor.setFontSize(18);
    this.editor.on("change", this.onChange);
  }
  setCode(code) {
    if (!this.editor) return;

    if (code !== this.editor.getValue()) {
      this.editor.setValue(code || "", 1);
    }
  }
  onChange = (_, editor) => {
    const code = editor.getValue();
    if (this.props.onChange) {
      this.props.onChange(code, this.props.id);
    }
  };

  forceRerenderSlide = () => {
    this.setState({ shouldRerender: true }, () => {
      this.setState({ shouldRerender: false });
    });
  };

  render() {
    return (
      <Field.Base {...this.props} type="slide">
        <div className="slide_viewer">
          <DreamSlide
            markdown={this.props.value}
            shouldRerender={this.state.shouldRerender}
          />
        </div>
        <div id={this.editorId} className="slide_editor" />
      </Field.Base>
    );
  }
}

export default SlideField;
