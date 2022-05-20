import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import View from "./View";
import {accountActivateCheckout} from "../../Common/Util/HTTPRequest"


import SignUp from "../../Common/Component/SignUp";
import { showPopUp } from "../../Common/Component/PopUp";

class Container extends Component {
  constructor(props) {
    super(props);

    const urlParams = new URLSearchParams(window.location.search);
    const activateToken = urlParams.get('activateToken');
    console.log("activateToken",activateToken)

    if(activateToken){
      accountActivateCheckout(activateToken).then(res => res.json()).then(data => {
        if (data.success) {
          showPopUp(<SignUp activateToken ={activateToken} />, {
            darkmode: true,
            scrollable: true,
            mobileFullscreen: true
          });
        }else {

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
