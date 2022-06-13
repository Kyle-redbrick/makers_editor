import React from "react";
import { withRouter } from "react-router-dom";
import View from "./View";

const Container = (props) => {
  
  return (
    <View {...props}/>
  );
}

export default Container;
