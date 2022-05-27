import React from "react";
import { detectIE } from "../../Util/detectBrowser";
import Header from "./Header";
import Footer from "./Footer";
import IEPopup from "../IEPopup";
import Notification from "../Notification";
import TutorialPopup from "./TutorialPopup";
import "./index.scss";

import {accountActivateCheckout} from "../../../Common/Util/HTTPRequest"
import SignUp from "../../../Common/Component/SignUp";
import PopUp, { showPopUp } from "../../../Common/Component/PopUp";

const Layout = props => {

  const urlParams = new URLSearchParams(window.location.search);
  const activateToken = urlParams.get('activateToken');

  if(activateToken){
    accountActivateCheckout(activateToken).then(res => res.json()).then(data => {
      console.log(data)
      if (data.success) {
        showPopUp(<SignUp activateToken={activateToken}  userEmail={data.body.payload.userEmail} dismiss={()=> showPopUp.dismiss}/>, {
          darkmode: true,
          scrollable: true,
          mobileFullscreen: true
        });
      }else {
        // showPopUp(
        //   <PopUp.OneButton
        //     title={ "err"
        //       //formatMessage({ id: title })
        //     }
        //       buttonName={ data.reason
        //       // formatMessage({
        //       // id: "ID_SPAM_POPUP_CONFIRM",
        //       // })
        //   }
        //   />,
        //   {
        //     darkmode: true,
        //     dismissButton: false,
        //     dismissOverlay: true,
        //   }
        // );
      }
    })
    .catch((err) => {
      console.log(err)
    });
    
  }


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
