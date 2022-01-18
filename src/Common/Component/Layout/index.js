import React from "react";
import { detectIE } from "../../Util/detectBrowser";
import Header from "./Header";
import Footer from "./Footer";
import IEPopup from "../IEPopup";
import Notification from "../Notification";
import TutorialPopup from "./TutorialPopup";
import "./index.scss";

const Layout = props => {
  return (
    <div className="layout">
      {/* <TutorialPopup/> */}
      <Header hideHeader={props.hideHeader}/>
      <Notification />
      {detectIE() && <IEPopup />}
      <div className="layout_background" />
      <div className="layout_contents">{props.children}</div>
      {props.isGame && (
        <div className="layout_background layout_top_bg" alt="layout_top_bg" />
      )}
      <Footer />
    </div>
  );
};

export default Layout;
