import React, { Component } from "react";
import "./index.scss";

export default class CircleCheckbox extends Component {
  render() {
    const { id, name, checked, value, handleChange, isRadioBtn } = this.props;
    let type = isRadioBtn ? "radio" : "checkbox";
    return (
      <label className="CircleCheckbox">
        <input
          className="CircleCheckbox__input"
          type={type}
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
        />
        <span className="CircleCheckbox__mark" />
      </label>
    );
  }
}
