import React, { Component } from "react";
import { connect } from "react-redux";
import { URL } from "../../Common/Util/Constant";
import * as request from "../../Common/Util/HTTPRequest";
import { showPopUp } from "../../Common/Component/PopUp";
import View from "./View";

import myCodingStyle from "./myCodingStyle";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      currentQuestion: null,
      result: null
    };
  }
  componentDidMount() {
    this.loadMyCodingStyle(() => {
      this.init();
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.email !== this.props.email) {
      this.init();
    }
  }
  loadMyCodingStyle(onload) {
    this.myCodingStyle = myCodingStyle;
    onload();
  }
  init() {
    this.participantId = null;
    this.questionsLength = this.myCodingStyle.questions.length;
    this.setState({
      title: this.myCodingStyle.title,
      result: null,
      currentQuestion: null
    });
  }

  createParticipantAndSetId() {
    const { email } = this.props;
    const params = { email };
    request
      .createMyCodingStyleParticipant(params)
      .then(res => res.json())
      .then(json => {
        this.participantId = json.participantId;
      });
  }
  completeParticipantWith(resultId) {
    if (this.participantId && resultId) {
      const params = { id: this.participantId, resultId };
      request.completeMyCodingStyleParticipant(params);
    }
  }
  updateParticipant({
    didClickFreeTrial,
    didClickKakaoShare,
    didShareKakao,
    didClickFacebookShare,
    didShareFacebook
  }) {
    if (this.participantId) {
      const params = {
        id: this.participantId,
        didClickFreeTrial,
        didClickKakaoShare,
        didShareKakao,
        didClickFacebookShare,
        didShareFacebook
      };
      request.updateMyCodingStyleParticipant(params);
    }
  }

  onClickStart = () => {
    this.start();
  };
  start() {
    this.initChoice();
    this.setFirstQuestion();
    this.createParticipantAndSetId();
  }
  initChoice() {
    this.choiceIds = "";
  }
  setFirstQuestion() {
    this.setQuestionFor(0);
  }
  setQuestionFor(index) {
    const firstQuestion = this.myCodingStyle.questions[index];
    this.setState({ currentQuestion: firstQuestion });
  }

  onClickChoice = choiceNum => {
    this.updateChoiceFor(choiceNum);
    this.setNext();
  };
  updateChoiceFor(choiceNum) {
    this.choiceIds += `${choiceNum}`;
  }
  setNext() {
    const nextQuestionId = this.choiceIds.length;
    if (nextQuestionId < this.questionsLength) {
      this.setQuestionFor(nextQuestionId);
    } else {
      this.setResult();
    }
  }
  setResult() {
    const resultId = this.getResultIdFor(this.choiceIds);
    const result = this.getResultFor(resultId);
    this.setState({ result });
    this.completeParticipantWith(resultId);
  }
  getResultIdFor(choiceIds) {
    return this.myCodingStyle.resultMap[choiceIds];
  }
  getResultFor(resultId) {
    return this.myCodingStyle.results[resultId];
  }

  onClickBack = () => {
    if (this.choiceIds.length > 0) {
      this.choiceIds = this.choiceIds.slice(0, -1);
      const questionId = this.choiceIds.length;
      this.setQuestionFor(questionId);
    } else {
      this.setState({ currentQuestion: null });
    }
  };
  onClickRetry = () => {
    this.setState({ currentQuestion: null, result: null });
  };
  onClickFreeTrial = () => {
    this.showWizLiveFreeTrialForm();
    this.updateParticipant({ didClickFreeTrial: true });
  };
  showWizLiveFreeTrialForm = () => {
    const WizliveFreeTrialForm = this.createWizliveFreeTrialForm;
    const resultId = this.getResultIdFor(this.choiceIds);
    const popupOptions = {
      darkmode: true,
      mobileFullscreen: true,
      defaultPadding: false
    };
    showPopUp(<WizliveFreeTrialForm resultId={resultId} />, popupOptions);
  };
  createWizliveFreeTrialForm = props => {
    const { resultId } = props;
    const wizliveURL = this.getWizliveFreeTrialURL(resultId);
    return (
      <div className="WizliveFreeTrialForm">
        <iframe src={wizliveURL} title="WizliveFreeTrialForm" />
      </div>
    );
  };
  getWizliveFreeTrialURL = resultId => {
    return `${URL.WIZLIVE}/myCodingStyleEvent?myCodingStyleId=${resultId}`;
  };

  onClickShareKakao = () => {
    this.shareForKakao();
    this.updateParticipant({ didClickKakaoShare: true });
  };
  shareForKakao = () => {
    const resultId = this.getResultIdFor(this.choiceIds);
    const templateId = { 0: 38909, 1: 38910, 2: 38911 }[resultId];
    window.Kakao.Link.sendCustom({
      templateId,
      callback: () => {
        this.updateParticipant({ didShareKakao: true });
      },
      fail: error => {
        console.error(error);
      }
    });
  };
  onClickShareFacebook = () => {
    this.shareForFacebook();
    this.updateParticipant({ didClickFacebookShare: true });
  };
  shareForFacebook = () => {
    const resultId = this.getResultIdFor(this.choiceIds);
    const result = this.getResultFor(resultId);
    const href =
      "https://dream.wizlab.net/codingparty" +
      (resultId ? `?myCodingStyleId=${resultId}` : "");
    const quote = `[심리테스트 결과] 
    나는 ${result.title}타입!

    [심리테스트] 나에게 맞는 코딩 스타일은?
    위즈랩X온라인코딩파티에서 준비한 특별한 이벤트
    A or B 심리테스트로 내 코딩 스타일 찾고! 무료로 게임 코딩 배우고! 아이패드도 받아가세요!`;
    window.FB.ui(
      { method: "share", href, quote, description: "hethet" },
      res => {
        if (this.checkSuccessFacebookShare(res)) {
          this.updateParticipant({ didShareFacebook: true });
        } else {
          if (res) {
            console.error(res.error_message);
          } else {
            console.error("Error shareForFacebook::undefined response");
          }
        }
      }
    );
  };
  checkSuccessFacebookShare(res) {
    return res && !res.error_message;
  }

  render() {
    const { title, currentQuestion, result } = this.state;
    const isBackButtonHidden = !this.choiceIds || this.choiceIds.length < 1;
    return (
      <View
        title={title}
        currentQuestion={currentQuestion}
        result={result}
        isBackButtonHidden={isBackButtonHidden}
        onClickStart={this.onClickStart}
        onClickChoice={this.onClickChoice}
        onClickBack={this.onClickBack}
        onClickRetry={this.onClickRetry}
        onClickFreeTrial={this.onClickFreeTrial}
        onClickShareKakao={this.onClickShareKakao}
        onClickShareFacebook={this.onClickShareFacebook}
      />
    );
  }
}

export default connect(state => ({
  email: state.userinfo.email
}))(Container);
