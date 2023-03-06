import React from "react";
import TitleArea from "./TitleArea";

const InputText = ({num, name, title, type, register}) => {
  return (
    <div>
      <TitleArea num={num} title={title} />
      <input
        className="contact_input"
        type={type}
        {...register(name)}
        autoComplete="off"
      />
    </div>
  );
};
export default InputText;
