import React from "react";
import "./index.scss";

export default function(props) {
  const { fixed, previewStyle } = props;
  return (
    <div className="previewCanvas" style={fixed ? undefined : previewStyle}>
      <canvas id="previewCanvas" />
    </div>
  );
}
