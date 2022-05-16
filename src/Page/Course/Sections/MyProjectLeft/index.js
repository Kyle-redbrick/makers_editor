import React from "react";
import BeforeLogin from "./BeforeLogin";
import AfterLogin from "./AfterLogin";
import "./index.scss";

function MyProjectLeft (props) {
  return (
    <div className="left-slide">
      { props.session.isLogin ? <AfterLogin {...props}/> : <BeforeLogin {...props}/> } 
    </div>
  )
}

export default MyProjectLeft ;
