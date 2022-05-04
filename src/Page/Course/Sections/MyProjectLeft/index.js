import React from "react";
import BeforeLogin from "./BeforeLogin";
import AfterLogin from "./AfterLogin";
import "./index.scss";

function MyProjectLeft () {
  return (
    <div className="left-slide">
      { true ? <BeforeLogin /> : <AfterLogin /> } 
    </div>
  )
}

export default MyProjectLeft ;
