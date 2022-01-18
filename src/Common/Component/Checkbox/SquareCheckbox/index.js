import React, { Component } from "react";
import "./index.scss";

export default class SquareCheckbox extends Component {
  render() {
    const {
      id,
      name,
      checked,
      value,
      handleChange,
      isRadioBtn,
      width = 18
    } = this.props;
    let boxStyle = {};
    let markStyle = {};
    if (width) {
      boxStyle.paddingLeft = width;
      boxStyle.marginBottom = width;
      markStyle.width = width;
      markStyle.height = width;
    }
    let type = isRadioBtn ? "radio" : "checkbox";
    return (
      <label className="SquareCheckbox" style={boxStyle}>
        <input
          className="SquareCheckbox__input"
          type={type}
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
        />
        <span className="SquareCheckbox__mark" style={markStyle} />
      </label>
    );
  }
}
