import React from "react";

const TitleArea = ({num, title}) => {
  return (
    <p className="contact_title">
      {num}. {title}
    </p>
  );
};

export default TitleArea;
