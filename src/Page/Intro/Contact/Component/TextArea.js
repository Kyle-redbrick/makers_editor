import React from "react";
import TitleArea from "./TitleArea";

const TextArea = ({num, name, title, register}) => {
  return (
    <div>
      <TitleArea num={num} title={title} />
      <textarea className={`contact_textarea ${name === "findType" ? "small" : ""}`}  {...register(name)} />
    </div>
  );
};

export default TextArea;
