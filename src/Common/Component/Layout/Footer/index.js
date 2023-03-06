import React, {Component} from "react";
import {injectIntl, FormattedMessage} from "react-intl";
import PopUp, {showPopUp} from "../../PopUp";
import logo_gray from "../../../../Image/dreamclass/logo_gray.png";
import "./index.scss";

class Footer extends Component {
  constructor() {
    super();
    this.agreements = ["ID_FOOTER_TERMS", "ID_FOOTER_PRIVACY"];
  }

  onClickShowAgreement = type => {
    showPopUp(<PopUp.Agreement type={type} />);
  };

  render() {
    const {agreements, onClickShowAgreement} = this;
    return (
      <div className="Footer">
        <div className="Footer--Inner">
          <div className="Footer--Inner__term-row">
            {agreements.map(agreement => (
              <div
                className="Agreement"
                key={agreement}
                onClick={() => onClickShowAgreement(agreement)}
              >
                <div className="Footer--Inner__term-item">
                  <FormattedMessage id={agreement} />
                </div>
              </div>
            ))}
          </div>
          <div className="Footer--Inner__info-row">
            <div className="Footer--Inner__copyRight_inner">
              <div className="Agreement Info--Copy">
                <FormattedMessage id="ID_HOME_COPY_INFO" />
              </div>

              <div className="Info-email">Email: acg@mangosteems.com</div>
              <img className="Logo" src={logo_gray} alt="logo" />
            </div>

            <div className="Agreement Info-email">©Tezuka Productions</div>
          </div>
        </div>
      </div>
    );
  }
}
export default injectIntl(Footer);
