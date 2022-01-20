import React, { Component } from "react";
import "./index.scss";
import { injectIntl, FormattedMessage } from "react-intl";
import logo_gray from "../../../../Image/dreamclass/logo_gray.png";

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="Footer--Inner">
          <p className="Terms">
            <a
              href="https://enabling.dreamclass.org/static/pc/accessTerms.html?langCd=ko&tenantPath"
              className="Link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage id="ID_FOOTER_TERMS" />
            </a>
          </p>
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
