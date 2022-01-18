import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Layout from "../../Common/Component/Layout";
import { connect } from "react-redux";
import terms from "./terms";
import privacy from "./privacy";
import pay from "./pay";
// import * as TrackingUtil from "../../Common/Util/TrackingUtil";
import { withRouter } from "react-router-dom";
import "./index.scss";

class Container extends Component {
  // componentDidMount() {
  //   TrackingUtil.sendPageEvent(this.props.location.pathname, this.props.email);
  // }

  render() {
    let titleId;
    let content;
    const page = this.props.match.params.page;
    switch (page) {
      case "privacy":
        titleId = "ID_TERMS_PRIVACY_POLICY_TITLE";
        content = privacy;
        break;
      case "terms":
        titleId = "ID_TERMS_TERMS_TITLE";
        content = terms;
        break;
      case "pay":
        titleId = "ID_TERMS_PAY_TITLE";
        content = pay;
        break;
      default:
        titleId = undefined;
        content = undefined;
    }
    if (!content || !titleId) {
      return (
        <div className="Page--Support">
          <Layout />
        </div>
      );
    }
    return (
      <div className="Page--Support">
        <Layout>
          {(page === "terms" || page === "pay") && (
            <div className="SupportView__header">
              <div className="SupportView__header__wrapper">
                <Link
                  to="/support/terms"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <p
                    className={`SupportView__header__btn ${
                      page === "terms"
                        ? "SupportView__header__btn_selected"
                        : ""
                    }`}
                  >
                    <FormattedMessage id="ID_TERMS_TERMS_TITLE" />
                  </p>
                </Link>
                <Link
                  to="/support/pay"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <p
                    className={`SupportView__header__btn ${
                      page === "pay" ? "SupportView__header__btn_selected" : ""
                    }`}
                  >
                    <FormattedMessage id="ID_TERMS_PAY_TITLE" />
                  </p>
                </Link>
              </div>
            </div>
          )}
          <div className="SupportView">
            <div className="SupportView__body">
              <h1 className="SupportView__title">
                <FormattedMessage id={titleId} />
              </h1>
              <pre className="SupportView__body__pre">{content}</pre>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}
export default connect(state => ({ email: state.userinfo.email }))(
  withRouter(Container)
);
