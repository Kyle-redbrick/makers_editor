import React, { Component } from "react";
import PopUp, { showPopUp } from "../../../../../Common/Component/PopUp";
import * as request from "../../../../../Common/Util/HTTPRequest";
import "./index.scss";

class OnlineCampForm extends Component {
  constructor(props) {
    super(props);
    const { onlineCamp } = this.props;
    const round = onlineCamp.rounds[0];
    this.state = {
      name: "",
      contact: "",
      round,
      answer1: "",
      answer2: "",
      warningMessage: null
    };
  }

  onChangeInput = e => {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({ [key]: value });
    this.hideWarningMessage();
  };
  onClickRound = round => {
    this.setState({ round });
  };

  onClickApply = () => {
    this.trySubmit();
  };
  trySubmit = () => {
    if (this.checkFormValid()) {
      this.submit();
    } else {
      console.warn("invalid form");
    }
  };
  submit = () => {
    if (this.isSubmitting) return;

    const { onlineCamp } = this.props;
    const params = {
      name: this.state.name,
      phoneNumber: this.state.contact,
      onlineCampType: onlineCamp.type,
      roundNumber: onlineCamp.rounds.indexOf(this.state.round) + 1,
      answer1: this.state.answer1,
      answer2: this.state.answer2
    };
    this.isSubmitting = true;
    request
      .applyOnlineCamp(params)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.showSubmitted();
        } else {
          console.error(json);
        }
        this.isSubmitting = false;
      })
      .catch(err => {
        console.error(err);
        this.isSubmitting = false;
      });
  };
  showSubmitted = () => {
    showPopUp(
      <PopUp.OneButton
        title="신청되었습니다."
        subtitle={`선정자 발표는 11월 3일에\n개별 문자 메세지로\n확인하실 수 있습니다.`}
        buttonName="확인"
      />,
      { darkmode: true }
    );
  };

  checkFormValid() {
    if (!this.checkNameValid(this.state.name)) return false;
    if (!this.checkPhoneNumberValid(this.state.contact)) return false;
    return true;
  }
  checkNameValid(name) {
    const isValid = name !== "";
    if (!isValid) {
      this.showWarningMessage("신청자 성함을 입력해주세요.");
    }
    return isValid;
  }
  checkPhoneNumberValid(phoneNum) {
    if (phoneNum === "") {
      this.showWarningMessage("연락 가능한 전화번호를 입력해주세요.");
      return false;
    }
    const isValid =
      phoneNum.length > 9 && phoneNum.length < 12 && phoneNum.startsWith("01");
    if (!isValid) this.showWarningMessage("전화번호를 정확하게 입력해주세요.");
    return isValid;
  }

  showWarningMessage(message) {
    this.setState({ warningMessage: message });
  }
  hideWarningMessage() {
    this.setState({ warningMessage: null });
  }

  onClickClose = () => {
    showPopUp();
  };

  render() {
    const { onlineCamp } = this.props;
    const {
      name,
      contact,
      round,
      answer1,
      answer2,
      warningMessage
    } = this.state;
    return (
      <div className="onlineCampForm">
        <div className="onlineCampForm_title">
          {onlineCamp.title} - 신청하기
          <div className="onlineCampForm_closeBtn" onClick={this.onClickClose}>
            닫기
          </div>
        </div>
        <section className="onlineCampForm_section">
          <div className="onlineCampForm_field">
            <div className="onlineCampForm_field_title">신청자 성함</div>
            <input
              type="text"
              name="name"
              value={name}
              placeholder={"신청자 성함을 작성해주세요"}
              maxLength="10"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="onlineCampForm_field">
            <div className="onlineCampForm_field_title">
              연락 가능한 전화번호
            </div>
            <input
              type="text"
              name="contact"
              value={contact}
              placeholder={"연락 가능한 전화번호를 입력해주세요"}
              maxLength="20"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="onlineCampForm_field">
            <div className="onlineCampForm_field_title">신청 회차</div>
            <div className="onlineCampForm_rounds">
              {onlineCamp.rounds.map((_round, index) => (
                <div
                  key={index}
                  className={`onlineCampForm_round${
                    _round === round ? " onlineCampForm_round-current" : ""
                  }`}
                  onClick={() => {
                    this.onClickRound(_round);
                  }}
                >
                  {index + 1}회차 ({_round.dateInfo})
                </div>
              ))}
            </div>
          </div>
          <div className="onlineCampForm_field">
            <div className="onlineCampForm_field_title">
              내가 코딩 캠프에 꼭 참가해야하는 이유를 적어주세요!{` `}
              <span>(최대 300자)</span>
            </div>
            <textarea
              name="answer1"
              value={answer1}
              placeholder={"여기에 입력해주세요"}
              maxLength="300"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="onlineCampForm_field">
            <div className="onlineCampForm_field_title">
              코딩 캠프에서 만들고 싶은 것이 있으면 적어주세요!{` `}
              <span>(최대 300자)</span>
            </div>
            <textarea
              name="answer2"
              value={answer2}
              placeholder={"여기에 입력해주세요"}
              maxLength="300"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="onlineCampForm_warning">
            {warningMessage && `* ${warningMessage}`}
          </div>
          <div className="onlineCampForm_applyBtn" onClick={this.onClickApply}>
            지원하기
          </div>
        </section>
      </div>
    );
  }
}

export default OnlineCampForm;
