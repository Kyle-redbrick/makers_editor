import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import View from "./View";
import {accountActivateCheckout} from "../../Common/Util/HTTPRequest"


import SignUp from "../../Common/Component/SignUp";
import PopUp, { showPopUp } from "../../Common/Component/PopUp";


class Container extends Component {
  constructor(props) {
    super(props);

    const urlParams = new URLSearchParams(window.location.search);
    const activateToken = urlParams.get('activateToken');
    console.log("activateToken",activateToken)

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
          showPopUp(
            <PopUp.OneButton
              title={ "err"
                //formatMessage({ id: title })
              }
                buttonName={ data.reason
                // formatMessage({
                // id: "ID_SPAM_POPUP_CONFIRM",
                // })
            }
            />,
            {
              darkmode: true,
              dismissButton: false,
              dismissOverlay: true,
            }
          );
        }
      })
      .catch((err) => {
        console.log(err)
      });
      
    }


    try {
      if (props.history.location.pathname === "/codingparty") {
        props.history.replace("/");
      }
    } catch (e) {}
  }

  render() {
    return <View />;
  }
}

export default connect(
  (state) => ({
    userId: state.userinfo.id,
  }),
  {}
)(withRouter(Container));
