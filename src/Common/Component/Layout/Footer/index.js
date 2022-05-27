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
        id: "Terms",
        title: this.props.intl.formatMessage({
          id: "ID_FOOTER_TERMS"
        }),
        text: termDoc
      },
      {
        id: "Privacy",
        title: this.props.intl.formatMessage({
          id: "ID_FOOTER_PRIVACY"
        }),
        text: privacyDoc
      },
    ]
  }

  onClickShowAgreement = id => {
    const agreement = this.agreements.find(agreement => agreement.id === id);
    showPopUp(
      <PopUp.Agreement
        title={agreement.title}
        content={agreement.text}
      />
    );
  }

  render() {
    const {
      agreements,
      onClickShowAgreement
    } = this;
    return (
      <div className="Footer">
        <div className="Footer--Inner">
          <div className="Footer--Inner__term-row">
            {agreements.map((agreement, index) => (
              <div className="Agreement" key={index}
                onClick={() => onClickShowAgreement(agreement.id)}>
                <div className={agreement.id}>
                  {agreement.title}
                </div>
              </div>
            ))}
          </div>
          <div className="Footer--Inner__info-row">
            <div className="Info--Service-time">
              {this.props.intl.formatMessage({ id: "ID_DREAM_FOOTER_SERVICE_TIME" })}
            </div>
            <div className="Info--Copy">
              <FormattedMessage id="ID_HOME_COPY_INFO" />
            </div>
            <div className="Info-email">
              Email: acg@mangosteems.com
            </div>
            <img className="Logo" src={logo_gray} alt="logo" />
          </div>
        </div>
      </div>
    );
  }
}
export default injectIntl(Footer);
