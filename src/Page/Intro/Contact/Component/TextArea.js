import React from "react";
import TitleArea from "./TitleArea";

const TextArea = ({num, name, title, register}) => {
  return (
    <div>
      <TitleArea num={num} title={title} />
      <textarea className="contact_textarea" {...register(name)} />
    </div>
  );
};

export default TextArea;
