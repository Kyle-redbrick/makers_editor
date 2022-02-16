import React, { Component } from "react";
import "./index.scss";
import { injectIntl, FormattedMessage } from "react-intl";
import logo_gray from "../../../../Image/dreamclass/logo_gray.png";
import Markdown from "react-markdown";

import terms from "../../SignUp/Agreements/terms";
import terms_jp from "../../SignUp/Agreements/terms-jp";
import terms_en from "../../SignUp/Agreements/terms-en";
import privacy from "../../SignUp/Agreements/privacy";
import privacy_jp from "../../SignUp/Agreements/privacy-jp";
import privacy_en from "../../SignUp/Agreements/privacy-en";
import PopUp, { showPopUp } from "../../PopUp";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.locale = localStorage.getItem("lang");
    let termDoc = terms;
    let privacyDoc = privacy;

    if (this.locale === "ja") {
      privacyDoc = privacy_jp;
      termDoc = terms_jp;
    } else if (this.locale === "en") {
      privacyDoc = privacy_en;
      termDoc = terms_en;
    }

    this.agreements = [
      {
        id: "agreed_terms",
        title: this.props.intl.formatMessage({
          id: "ID_FOOTER_TERMS"
        }),
        text: termDoc
      },
      {
        id: "agreed_privacy",
        title: this.props.intl.formatMessage({
          id: "ID_FOOTER_PRIVACY"
        }),
        text: privacyDoc
      },
    ]

    this.state = {
      agreement: null
    }
  }

  onClickShowAgreement = id => {
    const agreement = this.agreements.find(agreement => agreement.id === id);
    console.log(111, agreement);
    const contents = document.getElementById("popup_contents");
    const scrollable = document.getElementById("popup_scrollable");
    const dismissButton = document.getElementById("popup_dismissbtn");
    if (contents) contents.scrollTo(0, 0);
    if (scrollable) scrollable.scrollTo(0, 0);
    showPopUp(
      <PopUp.Agreement
        title={agreement.title}
        content={agreement.text}
      />
      // <div className="agreememt">
      //   <div className="agreement_title">
      //     {agreement.title}
      //   </div>
      //   <div className="agreement_text">
      //     <Markdown source={agreement.text} />
      //   </div>
      // </div>
    );
    // const contents = document.getElementById("popup_contents");
    // const scrollable = document.getElementById("popup_scrollable");
    // const dismissButton = document.getElementById("popup_dismissbtn");
    // if (contents) contents.scrollTo(0, 0);
    // if (scrollable) scrollable.scrollTo(0, 0);
    // // if (dismissButton) dismissButton.hidden = true;
    // this.setState({ agreement });
  }

  render() {
    const { agreement } = this.state;
    const {
      agreements,
      onClickShowAgreement
    } = this;
    return (
      // return agreement ? (
      //   showPopUp(
      //     <div className="agreememt">
      //       <div className="agreement_title">
      //         {agreement.title}
      //       </div>
      //       <div className="agreement_text">
      //         <Markdown source={agreement.text} />
      //       </div>
      //     </div>
      //   )
      // ) : (
      <div className="Footer">
        <div className="Footer--Inner">
          <div className="Agreement"
            onClick={() => onClickShowAgreement("agreed_terms")}>
            <div className='Terms'>
              <FormattedMessage id="ID_FOOTER_TERMS" />
            </div>
          </div>
          {/* <p className="Terms">
            <a
              href="https://enabling.dreamclass.org/static/pc/accessTerms.html?langCd=ko&tenantPath"
              className="Link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage id="ID_FOOTER_TERMS" />
            </a>
          </p> */}
          <div className="Agreement">
            <p className="Privacy">
              <a
                href="https://enabling.dreamclass.org/static/pc/privacyPolicy.html?langCd=ko&tenantPath"
                className="Link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FormattedMessage id="ID_FOOTER_PRIVACY" />
              </a>
            </p>
          </div>
          <div className="Info--Service-time">
            {this.props.intl.formatMessage({ id: "ID_DREAM_FOOTER_SERVICE_TIME" })}
          </div>
          <div className="Info--Copy">
            <FormattedMessage id="ID_HOME_COPY_INFO" />
          </div>
          <img className="Logo" src={logo_gray} alt="logo" />
        </div>
      </div>
    );
  }
}
export default injectIntl(Footer);
