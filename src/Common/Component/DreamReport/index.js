import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as request from "../../Util/HTTPRequest";
import warningIcon from "../../../Image/dreamclass/image-warning-alert.svg";
import successIcon from "../../../Image/dreamclass/image-confirmation-check.svg";
import "./index.scss";

const STAGE = {
  FORM: "form",
  SUCCESS: "success"
}

class DreamReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: STAGE.FORM,
      description: ""
    };
  }

  onChange = e => {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  }
  onClickReport = () => {
    if(this.isReportable) {
      this.report().then(() => {
        this.setState({ stage: STAGE.SUCCESS });
      });
    }
  }
  onClickCancel = () => {
    if(this.props.dismiss) {
      this.props.dismiss();
    }
  }
  onClickConfirm = () => {
    if(this.props.dismiss) {
      this.props.dismiss();
    }
  }

  get isReportable() {
    return !!this.state.description;
  }

  async report() {
    const params = {
      userId: this.props.userinfo.id,
      targetType: this.props.targetType,
      targetContentId: this.props.targetContentId,
      targetUserId: this.props.targetUserId,
      description: this.state.description
    }
    request
      .createDreamReport(params)
      .then(res => res.json())
      .then(result => {
        if(!result.success) {
          throw result
        }
      })
      .catch(console.error);
  }

  render() {
    switch(this.state.stage) {
      case STAGE.FORM:
      default:
        return (
          <Form
            description={this.state.description}
            isReportable={this.isReportable}
            onChange={this.onChange}
            onClickReport={this.onClickReport}
            onClickCancel={this.onClickCancel}
            intl={this.props.intl}
          />
        );
      case STAGE.SUCCESS:
        return (
          <Success
            onClickConfirm={this.onClickConfirm}
            intl={this.props.intl}
          />
        );
    }
  }
}

function Form(props) {
  return (
    <div className="report report-form">
    <img className="report_icon" src={warningIcon} alt="warning"/>
      <div className="popup_title">
        {props.intl.formatMessage({ id: "ID_DREAM_REPORT_TITLE"})}
      </div>
      <textarea
        id="description"
        value={props.description}
        onChange={props.onChange}
        placeholder={props.intl.formatMessage({ id: "ID_DREAM_REPORT_PLACEHOLDER"})}
      />
      <div className="popup_buttons">
        <button
          className="popup_button"
          onClick={props.onClickReport}
          disabled={!props.isReportable}
        >
          {props.intl.formatMessage({ id: "ID_DREAM_REPORT_REPORT_BUTTON"})}
        </button>
        <button
          className="popup_button-cancel"
          onClick={props.onClickCancel}
        >
          {props.intl.formatMessage({ id: "ID_DREAM_REPORT_CANCLE_BUTTON"})}
        </button>
      </div>
    </div>
  )
}
function Success(props) {
  return (
    <div className="report report-success">
      <img className="report_icon" src={successIcon} alt="success"/>
      <div className="popup_title">
        {props.intl.formatMessage({ id: "ID_DREAM_REPORT_CONFIRM_MSG"})}
      </div>
      <div className="popup_buttons">
        <button
          className="popup_button"
          onClick={props.onClickConfirm}
        >
          {props.intl.formatMessage({ id: "ID_DREAM_REPORT_CONFIRM_BUTTON"})}
        </button>
      </div>
    </div>
  )
}

export default connect(
  state => ({ userinfo: state.userinfo }) 
)(injectIntl(DreamReport));
