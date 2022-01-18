import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import QRCode from "qrcode.react";
import { URL } from "../../Util/Constant";
import { smsPlayLink /*, checkShareBingo*/ } from "../../Util/HTTPRequest";
import PopUp, { showPopUp } from "../PopUp";
import PhoneDropDown from "./PhoneDropDown";
import closeImg from "../../../Image/builder/x-copy-3.svg";
import closeImg_darkmode from "../../../Image/builder/x-copy-3_darkmode.svg";
import * as TrackingUtil from "../../Util/TrackingUtil";
// import { showBingoPopup } from "../PopUp/BingoPopup";
import shareCopyImg from "../../../Image/share_icon_copy.png";
import shareFbImg from "../../../Image/share_icon_fb.png";
import shareKakaoImg from "../../../Image/share_icon_kakao.png";
import { getColorTheme } from "../../../Page/Builder/utils/colorThemeUtil";
import "./index.scss";

class QRPopup extends Component {
  constructor(props) {
    super(props);
    if (this.props.isBuilder) {
      require("./index_builder.scss");
    }
    this.state = {
      phoneNum: "",
      countryCode: "+82",
      copied: false
    };
  }

  componentDidMount = () => {
    /*for css */
    const popup = document.querySelector(".QRPopup").closest(".popup_contents");
    popup.style.borderRadius = "20px";
    const dismissBtn = popup.querySelector("#popup_dismissbtn");
    dismissBtn.style.display = "none";
  };

  handleInputChange = e => {
    const target = e.target;
    this.setState(
      state => ({
        [target.name]: target.value
      }),
      () => {}
    );
  };
  handleCountryChange = countryCode => {
    this.setState({
      countryCode
    });
  };

  getIsPhoneNumValid = () => {
    // TODO : check whether or not typeof phoneNum is number
    let { phoneNum } = this.state;
    return phoneNum && phoneNum.length >= 11;
  };

  handleSubmit = e => {
    e.preventDefault();
    // TODO: phoneNum validation check

    if (!this.getIsPhoneNumValid()) {
      showPopUp(
        <PopUp.OneButton
          title={<FormattedMessage id="ID_BUILDER_ALERT_MSG_QRWARN" />}
          buttonName={<FormattedMessage id="ID_BUILDER_ALERT_CLOSEBTN" />}
        />
      );
      return;
    }

    let { pId, name } = this.props.project;
    let url = URL.WIZ_APP + pId;

    const countryCode = this.state.countryCode;
    const localNumber = this.state.phoneNum;
    const params = { countryCode, localNumber, url, name };

    smsPlayLink(params)
      .then(response => {
        if (response.status === 200) {
          TrackingUtil.sendGAEvent({
            category: "Builder",
            action: `Share`,
            label: "SMS"
          });
          showPopUp(
            <PopUp.OneButton
              title={<FormattedMessage id="ID_BUILDER_ALERT_MSG_QRSUCC" />}
              buttonName={<FormattedMessage id="ID_BUILDER_ALERT_CLOSEBTN" />}
            />
          );
        } else {
          showPopUp(
            <PopUp.OneButton
              title={<FormattedMessage id="ID_BUILDER_ALERT_MSG_QRFAIL" />}
              buttonName={<FormattedMessage id="ID_BUILDER_ALERT_CLOSEBTN" />}
            />
          );
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  // checkBingo = () => {
  //   const email = this.props.email;
  //   if (email) {
  //     checkShareBingo({ email })
  //       .then(res => res.json())
  //       .then(json => {
  //         if (json.bingoType) {
  //           showBingoPopup(email, json.bingoType);
  //         }
  //       })
  //       .catch(e => {
  //         console.error(e);
  //       });
  //   }
  // };

  shareKakao = () => {
    const { pId } = this.props.project;
    window.Kakao.Link.sendCustom({
      templateId: 30669,
      templateArgs: { path: `detail/${pId}` },
      fail: function(error) {
        console.log(error);
        alert("Error while sharing.");
      },
      callback: () => {
        // this.checkBingo();
      }
    });
    // setTimeout(this.checkBingo, 5000);
  };

  shareFB = () => {
    const { pId } = this.props.project;
    const url = URL.WIZ_APP + pId;
    window.FB.ui(
      {
        method: "share",
        href: url,
        quote: url
      },
      function(response) {
        if (response && !response.error_message) {
          // this.checkBingo();
        } else {
          alert("Error while posting.");
        }
      }
    );
    // setTimeout(this.checkBingo, 5000);
  };

  copyUrl = () => {
    const { pId } = this.props.project;
    const url = URL.WIZ_APP + pId;
    navigator.clipboard.writeText(url);
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  };

  render() {
    const { phoneNum, countryCode, copied } = this.state;
    let { pId } = this.props.project;
    let url = URL.WIZ_APP + pId;
    const colorTheme = getColorTheme();

    return (
      <div className="QRPopup">
        <div className="QRPopup__header">
          <div className="header__title">
            <FormattedMessage id="ID_POPUP_SHARE_TITLE" />
          </div>
          <img
            className="popup__closebtn"
            src={colorTheme === "darkMode" ? closeImg_darkmode : closeImg}
            alt="img"
            onClick={this.props.dismiss}
          />
        </div>
        <div className="QR__wrapper">
          <QRCode
            className="QRPopup__qrcode"
            value={url}
            style={{ width: "125px", height: "125px" }}
          />
        </div>
        <div className="QRPopupBottom">
          <div className="QR__desc">
            <FormattedMessage id="ID_QRTITLE" />
          </div>
          <form className="QRPopupForm">
            <PhoneDropDown
              phoneNum={phoneNum}
              countryCode={countryCode}
              handleSelectItem={this.handleCountryChange}
              handleInputChange={this.handleInputChange}
            />
            <input
              className="QRPopupForm__submitBtn"
              type="submit"
              onClick={this.handleSubmit}
              value=""
            />
          </form>
          <div className="QRPopupSNS">
            <div onClick={this.shareKakao} className="QRPopupSNSItem">
              <img src={shareKakaoImg} alt="share kakao" />
            </div>
            <div onClick={this.shareFB} className="QRPopupSNSItem">
              <img src={shareFbImg} alt="share fb" />
            </div>
            <div onClick={this.copyUrl} className="QRPopupSNSItem">
              <img src={shareCopyImg} alt="share fb" />
            </div>
          </div>
        </div>
        <div className={`QRPopupCopied ${copied && "QRPopupCopiedShow"}`}>
          <FormattedMessage id="ID_SHARE_COPIED" />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    email: state.userinfo.email
  }),
  {}
)(injectIntl(QRPopup));
