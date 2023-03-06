import React, {Component} from "react";
import {FormattedMessage} from "react-intl";
import Markdown from "react-markdown";
import terms from "../../SignUp/Agreements/terms";
import terms_jp from "../../SignUp/Agreements/terms-jp";
import terms_en from "../../SignUp/Agreements/terms-en";
import privacy from "../../SignUp/Agreements/privacy";
import privacy_jp from "../../SignUp/Agreements/privacy-jp";
import privacy_en from "../../SignUp/Agreements/privacy-en";
import "./index.scss";

class AgreementPopUp extends Component {
  constructor(props) {
    super(props);
    this.locale = localStorage.getItem("lang");
    this.termDoc = terms;
    this.privacyDoc = privacy;

    if (this.locale === "ja") {
      this.privacyDoc = privacy_jp;
      this.termDoc = terms_jp;
    } else if (this.locale === "en") {
      this.privacyDoc = privacy_en;
      this.termDoc = terms_en;
    }

    this.agreements = {
      ID_FOOTER_TERMS: this.termDoc,
      ID_FOOTER_PRIVACY: this.privacyDoc,
    };
  }

  render() {
    const {type} = this.props;
    return (
      <div className="agreement">
        <div className="popup_title">
          <FormattedMessage id={type} />
        </div>
        <div className="agreement_text">
          <Markdown source={this.agreements[type]} />
        </div>
      </div>
    );
  }
}
export default AgreementPopUp;
