import React from "react";
import "./index.scss";
import FullScreenButton from "../../FullScreenButton";
import FullBtnImg from "../../../../../Image/newPython/question-btn.png"
import { playButtonEffect } from "../../../Util/PlaySound";

const Footer = props => {
  return (
    <footer className="pythonFooter">
      <div className="pythonFooterRightButton">
        <div className="pythonFullScreenBtn">
          <FullScreenButton />
        </div>
        <div className="pythonQuestionBtn" onClick={()=>{playButtonEffect(); window.open("/lms/questions", "_blank");}}>
          <img src={FullBtnImg} alt="full" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
