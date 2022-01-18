import React from "react";
import "./index.scss";

const SlideCheckbox = ({ checked, handleChange } = {}) => {
  return (
    <label className="SlideCheckbox">
      <input
        type="checkbox"
        checked={checked}
        className="SlideCheckbox__input"
        onChange={handleChange}
      />
      <span className="SlideCheckbox__slider" />
    </label>
  );
};

export default SlideCheckbox;
