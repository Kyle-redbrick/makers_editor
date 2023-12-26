import React from "react";
import View from "./View";

const Container = (props) => {
  const { sampleGame, mode } = props.match.params;

  const sampleGameURL =
    "https://storage-dev.redbrickmakers.com/sampleGame/" + sampleGame;

  return <View {...props} sampleGameURL={sampleGameURL} mode={mode} />;
};

export default Container;
