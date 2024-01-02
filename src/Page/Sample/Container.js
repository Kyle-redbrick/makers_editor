import React from "react";
import View from "./View";

const Container = (props) => {
  const { sampleGame, mode } = props.match.params;

  const sampleGameURL =
    `${process.env.REACT_APP_THUMBNAIL_ALI}/sampleGame/` + sampleGame;

  return <View {...props} sampleGameURL={sampleGameURL} mode={mode} />;
};

export default Container;
