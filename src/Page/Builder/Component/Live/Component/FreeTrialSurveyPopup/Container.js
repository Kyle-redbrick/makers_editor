import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as request from "../../../../../../Common/Util/HTTPRequest";
import { showFreeTrialSubmitPopup } from "../../../../../../Common/Util/AlertManager";

import View from "./View";
import PopUp, { showPopUp } from "../../../../../../Common/Component/PopUp";

class Container extends Component {
  constructor(props) {
    super(props);
    const { isFreeTrial } = this.props;
    this.state = {
      step: isFreeTrial ? 1 : 2,
      lectureLevel: 0,
      lectureInterest: 0,
      lectureSpeed: 0,
      surveyAdminMessage1: "",
      surveyAdminMessage2: "",
      score: 0,
      feedbackTutorMessage: "",
      feedbackAdminMessage: ""
    };
  }

  isSurveyEnabled = () => {
    const { lectureLevel, lectureInterest, lectureSpeed } = this.state;
    return lectureLevel > 0 && lectureInterest > 0 && lectureSpeed > 0;
  };

  handleChange = event => {
    const name = event.target.name;
    const value = parseInt(event.target.value);
    switch (name) {
      case "level":
        this.setState({ lectureLevel: value });
        break;
      case "interest":
        this.setState({ lectureInterest: value });
        break;
      case "speed":
        this.setState({ lectureSpeed: value });
        break;
      default:
    }
  };

  handleChangeSurveyAdmin1 = message => {
    this.setState({ surveyAdminMessage1: message });
  };

  handleChangeSurveyAdmin2 = message => {
    this.setState({ surveyAdminMessage2: message });
  };

  getLectureLevel = () => {
    const { lectureLevel } = this.state;
    const { formatMessage } = this.props.intl;
    switch (lectureLevel) {
      case 0:
        return null;
      case 1:
        return formatMessage({
          id: "ID_FREE_TRIAL_SURVEY_STEP1_LEVEL_ITEM1"
        });
      case 2:
        return formatMessage({
          id: "ID_FREE_TRIAL_SURVEY_STEP1_LEVEL_ITEM2"
        });
      case 3:
        return formatMessage({
          id: "ID_FREE_TRIAL_SURVEY_STEP1_LEVEL_ITEM3"
        });
      default:
    }
  };

  getLectureInterest = () => {
    const { lectureInterest } = this.state;
    const { formatMessage } = this.props.intl;
    switch (lectureInterest) {
      case 0:
        return null;
      case 1:
        return formatMessage({
          id: "ID_FREE_TRIAL_SURVEY_STEP1_INTEREST_ITEM1"
        });
      case 2:
        return formatMessage({
          id: "ID_FREE_TRIAL_SURVEY_STEP1_INTEREST_ITEM2"
        });
      case 3:
        return formatMessage({
          id: "ID_FREE_TRIAL_SURVEY_STEP1_INTEREST_ITEM3"
        });
      default:
    }
  };

  getLectureSpeed = () => {
    const { lectureSpeed } = this.state;
    const { formatMessage } = this.props.intl;
    switch (lectureSpeed) {
      case 0:
        return null;
      case 1:
        return formatMessage({
          id: "ID_FREE_TRIAL_SURVEY_STEP1_SPEED_ITEM1"
        });
      case 2:
        return formatMessage({
          id: "ID_FREE_TRIAL_SURVEY_STEP1_SPEED_ITEM2"
        });
      case 3:
        return formatMessage({
          id: "ID_FREE_TRIAL_SURVEY_STEP1_SPEED_ITEM3"
        });
      default:
    }
  };

  handleSubmitSurvey = () => {
    if (!this.isSurveyEnabled()) {
      return;
    }
    const { surveyAdminMessage1, surveyAdminMessage2 } = this.state;
    const { formatMessage } = this.props.intl;
    const { reservationId } = this.props;

    const level = formatMessage({ id: "ID_FREE_TRIAL_SURVEY_STEP1_LEVEL" });
    const interest = formatMessage({
      id: "ID_FREE_TRIAL_SURVEY_STEP1_INTEREST"
    });
    const speed = formatMessage({ id: "ID_FREE_TRIAL_SURVEY_STEP1_SPEED" });
    const input1 = formatMessage({
      id: "ID_FREE_TRIAL_SURVEY_STEP1_INPUT1"
    });
    const input2 = formatMessage({
      id: "ID_FREE_TRIAL_SURVEY_STEP1_INPUT2"
    });

    const values = {
      [level]: this.getLectureLevel(),
      [interest]: this.getLectureInterest(),
      [speed]: this.getLectureSpeed(),
      [input1]: surveyAdminMessage1,
      [input2]: surveyAdminMessage2
    };
    request.postSurvey({
      email: this.props.email,
      values: JSON.stringify(values),
      reservationId: reservationId
    });

    this.setState({ step: 2 });
  };

  /* Feedback */

  handleChangeScore = score => {
    this.setState({ score: score });
  };

  handleChangeFeedbackTutor = message => {
    this.setState({ feedbackTutorMessage: message });
  };

  handleChangeFeedbackAdmin = message => {
    this.setState({ feedbackAdminMessage: message });
  };

  isFeedbackEnabled = () => {
    const { score, feedbackTutorMessage } = this.state;
    return score > 0 && feedbackTutorMessage.length > 0;
  };

  handleSubmitFeedback = () => {
    if (!this.isFeedbackEnabled()) {
      return;
    }
    const { score, feedbackTutorMessage, feedbackAdminMessage } = this.state;
    const { reservationId, tutorEmail, isFreeTrial } = this.props;
    // const { formatMessage } = this.props.intl;
    const params = {
      rating: { score: score, comment: feedbackTutorMessage },
      id: reservationId,
      tutor: tutorEmail,
      adminMessage: feedbackAdminMessage
    };

    this.props.handleFreeTrialSurvey(false);

    request
      .postFeedbackFromStudentWizLive(params)
      .then(() => {
        if (isFreeTrial) {
          showFreeTrialSubmitPopup();
        } else {
          showPopUp(
            <PopUp.OneButton
              intl={this.props.intl}
              titleId="ID_FREE_TRIAL_SURVEY_SUBMIT_TITLE"
              subtitleId="ID_FEEDBACK_SUBMIT_DESCRIPTION"
              buttonNameId="ID_BUILDER_LIVE_ACCESS_OK"
            />
          );
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const {
      step,
      lectureLevel,
      lectureInterest,
      lectureSpeed,
      score
    } = this.state;
    const {
      handleChange,
      handleChangeSurveyAdmin1,
      handleChangeSurveyAdmin2,
      handleSubmitSurvey,
      handleChangeScore,
      handleChangeFeedbackTutor,
      handleChangeFeedbackAdmin,
      handleSubmitFeedback
    } = this;
    const { isFreeTrial } = this.props;
    const isSurveyEnabled = this.isSurveyEnabled();
    const isFeedbackEnabled = this.isFeedbackEnabled();
    return (
      <View
        // Survey
        step={step}
        lectureLevel={lectureLevel}
        lectureInterest={lectureInterest}
        lectureSpeed={lectureSpeed}
        surveySubmitEnabled={isSurveyEnabled}
        handleChangeSurveyAdmin1={handleChangeSurveyAdmin1}
        handleChangeSurveyAdmin2={handleChangeSurveyAdmin2}
        isSurveyEnabled={isSurveyEnabled}
        // Feedback
        score={score}
        handleChange={handleChange}
        handleSubmitSurvey={handleSubmitSurvey}
        handleSubmitFeedback={handleSubmitFeedback}
        handleChangeScore={handleChangeScore}
        handleChangeFeedbackTutor={handleChangeFeedbackTutor}
        handleChangeFeedbackAdmin={handleChangeFeedbackAdmin}
        isFeedbackEnabled={isFeedbackEnabled}
        isFreeTrial={isFreeTrial}
      />
    );
  }
}
export default connect(
  state => ({
    email: state.userinfo.email
  }),
  {}
)(injectIntl(Container));
