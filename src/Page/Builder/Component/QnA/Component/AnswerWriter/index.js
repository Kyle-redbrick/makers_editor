import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";
import CodeWriter from "../CodeWriter";
import PopUp, { showPopUp } from "../../../../../../Common/Component/PopUp";
import * as request from "../../../../../../Common/Util/HTTPRequest";
import checkImg from "../../../../../../Image/checkbox-on-btn.svg";
import "./index.scss";

class AnswerWriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCodeOpen: false,
      code: props.intl.formatMessage({ id: "ID_QNA_ACE_PLACEHOLDER" }),
      content: ""
    };
  }
  componentDidMount() {}

  toggleOpt = opt => {
    if (opt === "code") {
      this.setState({ isCodeOpen: !this.state.isCodeOpen });
    }
  };

  showAlert = titleId => {
    showPopUp(
      <PopUp.OneButton
        title={this.props.intl.formatMessage({ id: titleId })}
        buttonName={this.props.intl.formatMessage({
          id: "ID_SPAM_POPUP_CONFIRM"
        })}
      />,
      {
        darkmode: true,
        dismissButton: false,
        dismissOverlay: true
      }
    );
  };

  onCodeChanged = code => {
    this.setState({ code });
  };

  onContentChanged = e => {
    this.setState({ content: e.target.value });
  };

  onClickCreate = () => {
    if (!this.props.userId) return;

    const { isCodeOpen, code, content } = this.state;

    if (!content || content.length < 2) {
      this.showAlert("ID_QNA_ANSWER_WRITE_WARN");
      return;
    }

    const params = {
      userId: this.props.userId,
      content,
      code: isCodeOpen ? code : null,
      questionId: this.props.questionId
    };

    request
      .postBuilderAnswer(params)
      .then(res => res.json())
      .then(() => {
        this.showAlert("ID_QNA_ANSWER_WRITE_SUCCESS");
        this.setState(
          {
            isCodeOpen: false,
            code: this.props.intl.formatMessage({
              id: "ID_QNA_ACE_PLACEHOLDER"
            }),
            content: ""
          },
          () => this.props.onSuccessWriteAnswer(this.props.questionId)
        );
      })
      .catch(e => console.error(e));
  };

  render() {
    const { isCodeOpen, code, content } = this.state;
    const { toggleOpt, onClickCreate, onContentChanged, onCodeChanged } = this;
    const { intl } = this.props;

    return (
      <div className="AnswerWriter">
        <div className="AnswerWriterTitleLine">
          <div className="AnswerWriterTitle">
            <FormattedMessage id="ID_QNA_WRITE_ANSWER_TITLE" />
          </div>
          <div
            className={`AnswerWriterOpt ${isCodeOpen &&
              "AnswerWriterOptActive"}`}
            onClick={() => toggleOpt("code")}
          >
            <div className="AnswerWriterOptChkHolder">
              <img src={checkImg} alt="checkbx" />
            </div>
            <FormattedMessage id="ID_QNA_WRITE_QUESTION_OPT1" />
          </div>
        </div>
        <div className="AnswerWriterWriters">
          <textarea
            onChange={onContentChanged}
            className="AnswerWriterInput"
            placeholder={intl.formatMessage({
              id: "ID_QNA_TEXTAREA_PLACEHOLDER"
            })}
            value={content}
          />

          {isCodeOpen && (
            <div className="AnswerWriterCodeWriter">
              <CodeWriter code={code} onChange={onCodeChanged} />
            </div>
          )}
        </div>
        <div className="AnswerWriterCreate" onClick={onClickCreate}>
          <FormattedMessage id="ID_QNA_WRITE_QUESTION_ADD" />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ userId: state.userinfo.id }),
  {}
)(injectIntl(AnswerWriter));
