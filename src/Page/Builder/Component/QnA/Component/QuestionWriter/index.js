import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";
import CodeWriter from "../CodeWriter";
import PopUp, { showPopUp } from "../../../../../../Common/Component/PopUp";
import * as request from "../../../../../../Common/Util/HTTPRequest";
import checkImg from "../../../../../../Image/checkbox-on-btn.svg";
import "./index.scss";

class QuestionWriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCodeOpen: false,
      isProjectOpen: false,
      code: props.intl.formatMessage({ id: "ID_QNA_ACE_PLACEHOLDER" }),
      content: "",
      title: ""
    };
  }
  componentDidMount() {}

  toggleOpt = opt => {
    if (opt === "code") {
      this.setState({ isCodeOpen: !this.state.isCodeOpen });
    } else if (opt === "project") {
      this.setState({ isProjectOpen: !this.state.isProjectOpen });
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

  onTitleChanged = e => {
    this.setState({ title: e.target.value });
  };

  onClickCreate = () => {
    if (!this.props.userId) return;

    const { isCodeOpen, isProjectOpen, code, content, title } = this.state;

    if (!title || title.length < 2 || !content || content.length < 2) {
      this.showAlert("ID_QNA_WRITE_ALERT");
      return;
    }

    const pId = isProjectOpen ? this.props.pId : null;

    const params = {
      userId: this.props.userId,
      title,
      content,
      code: isCodeOpen ? code : null,
      pId
    };

    request
      .postBuilderQuestion(params)
      .then(res => res.json())
      .then(() => {
        this.showAlert("ID_QNA_WRITE_SUCCESS");
        this.props.onSuccessWrite();
      })
      .catch(e => console.error(e));
  };

  render() {
    const { isCodeOpen, isProjectOpen, code, content, title } = this.state;
    const {
      toggleOpt,
      onClickCreate,
      onContentChanged,
      onCodeChanged,
      onTitleChanged
    } = this;
    const { intl, onClickWriterBack } = this.props;
    return (
      <div className="QuestionWriter">
        <div className="QuestionWriterBack" onClick={onClickWriterBack}>
          <FormattedMessage id="ID_QNA_MODE_PREV" />
        </div>
        {/* <div className="QuestionWriterTitle">
          <FormattedMessage id="ID_QNA_WRITE_QUESTION_TITLE" />
        </div> */}
        <div className="QuestionWriterDesc">
          <FormattedMessage id="ID_QNA_WRITE_QUESTION_DESC" />
          <br />
          <FormattedMessage id="ID_QNA_WRITE_QUESTION_OPT2_DESC" />
        </div>
        <div className="QuestionWriterTitle">
          <input
            onChange={onTitleChanged}
            className="QuestionWriterTitleInput"
            placeholder={intl.formatMessage({
              id: "ID_QNA_TITLE_PLACEHOLDER"
            })}
            value={title}
          />
        </div>
        <div className="QuestionWriterOpts">
          <div
            className={`QuestionWriterOpt ${isCodeOpen &&
              "QuestionWriterOptActive"}`}
            onClick={() => toggleOpt("code")}
          >
            <div className="QuestionWriterOptChkHolder">
              <img src={checkImg} alt="checkbx" />
            </div>
            <FormattedMessage id="ID_QNA_WRITE_QUESTION_OPT1" />
          </div>
          <div
            className={`QuestionWriterOpt ${isProjectOpen &&
              "QuestionWriterOptActive"}`}
            onClick={() => toggleOpt("project")}
          >
            <div className="QuestionWriterOptChkHolder">
              <img src={checkImg} alt="checkbx" />
            </div>
            <FormattedMessage id="ID_QNA_WRITE_QUESTION_OPT2" />
          </div>
        </div>
        <div className="QuestionWriterWriters">
          <textarea
            onChange={onContentChanged}
            className="QuestionWriterInput"
            placeholder={intl.formatMessage({
              id: "ID_QNA_TEXTAREA_PLACEHOLDER"
            })}
            value={content}
          />

          {isCodeOpen && (
            <div className="QuestionWriterCodeWriter">
              <CodeWriter code={code} onChange={onCodeChanged} />
            </div>
          )}
        </div>
        <div className="QuestionWriterCreate" onClick={onClickCreate}>
          <FormattedMessage id="ID_QNA_WRITE_QUESTION_ADD" />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ userId: state.userinfo.id, pId: state.project.pId }),
  {}
)(injectIntl(QuestionWriter));
