import React, { Component } from "react";
import "./index.scss";
import SquareCheckbox from "../../../../Common/Component/Checkbox/SquareCheckbox/index";
import { showPopUp } from "../../../../Common/Component/PopUp";
import challengeHelpImg from "../../../../Image/challengeHelpImg.png";
class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  handleChange = e => {
    this.setState({ checked: e.target.checked }, () => {
      if (this.state.checked) {
        localStorage.setItem("OCPCheck", true);
      } else {
        localStorage.removeItem("OCPCheck");
      }
    });
  };

  handleConfirm = () => {
    showPopUp(null);
  };
  render() {
    return (
      <div className="OcpPopup">
        <div className="popup_subtitle">
          {/* 참여방법은 앱을 퍼블리싱할때 가능합니다. */}
          <img src={challengeHelpImg} alt="challengeHelpImg" />
        </div>

        <div className="OcpPopup__checkbox">
          <SquareCheckbox
            name="check"
            handleChange={this.handleChange}
            checked={this.state.checked}
          />
          <div>다시보지 않기 </div>
        </div>
        <button className="popup_button" onClick={this.handleConfirm}>
          확인
        </button>
      </div>
    );
  }
}

export default Popup;
