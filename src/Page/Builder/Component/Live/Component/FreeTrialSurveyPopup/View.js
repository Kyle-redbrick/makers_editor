import React, { Component } from "react";
import Rating from "react-rating";
import { CircleCheckbox } from "../../../../../../Common/Component/Checkbox";
import { FormattedMessage } from "react-intl";

import starImageOff from "../../../../../../Image/btn-star-normal.svg";
import starImageOn from "../../../../../../Image/btn-star-selected.svg";

import "./index.scss";

export default class FreeTrialSurveyPopup extends Component {
  render() {
    const {
      step,
      lectureLevel,
      lectureInterest,
      lectureSpeed,
      isSurveyEnabled,
      score,
      handleChangeSurveyAdmin1,
      handleChangeSurveyAdmin2,
      handleChange,
      handleSubmitSurvey,
      handleSubmitFeedback,
      handleChangeScore,
      handleChangeFeedbackTutor,
      handleChangeFeedbackAdmin,
      isFeedbackEnabled,
      isFreeTrial
    } = this.props;

    return (
      <div className="FreeTrialSurveyPopup--Outer">
        <div className="FreeTrialSurveyPopup--Overlay" />
        <div className="FreeTrialSurveyPopup--Inner">
          {isFreeTrial ? (
            <div className="FreeTrialSurveyPopup--Step">
              <div className={`Step1--${step === 1 ? "Doing" : "Done"}`}>
                <p />
                <label>
                  <FormattedMessage id={"ID_FREE_TRIAL_SURVEY_STEP1"} />
                </label>
              </div>
              <div className={`Step2--${step === 2 ? "Doing" : "Ready"}`}>
                <p />
                <label>
                  <FormattedMessage id={"ID_FREE_TRIAL_SURVEY_STEP2"} />
                </label>
              </div>
            </div>
          ) : (
            <div className="FreeTrialSurveyPopup--Step">
              <div className="NoFreeTrial">
                <p />
                <label>
                  <FormattedMessage id={"ID_FREE_TRIAL_SURVEY_STEP2"} />
                </label>
              </div>
            </div>
          )}
          {/* Free Trial Survey  */}
          {step === 1 && (
            <div className="FreeTrialSurveyPopup--SurveyBody">
              <div className="FreeTrialSurveyPopup--Title">
                <p>
                  <FormattedMessage id={"ID_FREE_TRIAL_SURVEY_STEP1_TITLE"} />
                </p>
              </div>
              <div className="FreeTrialSurveyPopup--Content">
                <div className="FreeTrialSurveyPopup--Content--RadioItem">
                  <p className="FreeTrialSurveyPopup--Content--Title">
                    <FormattedMessage id={"ID_FREE_TRIAL_SURVEY_STEP1_LEVEL"} />
                    <span className="Required">*</span>
                  </p>
                  <div className="FreeTrialSurveyPopup--Content--Row">
                    <div className="FreeTrialSurveyPopup--Content--RowItem">
                      <CircleCheckbox
                        name={"level"}
                        value={1}
                        checked={lectureLevel === 1}
                        handleChange={handleChange}
                        isRadioBtn={true}
                      />
                      <label className="FreeTrialSurveyPopup--Content--RowItemLabel">
                        <FormattedMessage
                          id={"ID_FREE_TRIAL_SURVEY_STEP1_LEVEL_ITEM1"}
                        />
                      </label>
                    </div>
                    <div className="FreeTrialSurveyPopup--Content--RowItem">
                      <CircleCheckbox
                        name={"level"}
                        value={2}
                        checked={lectureLevel === 2}
                        handleChange={handleChange}
                        isRadioBtn={true}
                      />
                      <label className="FreeTrialSurveyPopup--Content--RowItemLabel">
                        <FormattedMessage
                          id={"ID_FREE_TRIAL_SURVEY_STEP1_LEVEL_ITEM2"}
                        />
                      </label>
                    </div>
                    <div className="FreeTrialSurveyPopup--Content--RowItem">
                      <CircleCheckbox
                        name={"level"}
                        value={3}
                        checked={lectureLevel === 3}
                        handleChange={handleChange}
                        isRadioBtn={true}
                      />
                      <label className="FreeTrialSurveyPopup--Content--RowItemLabel">
                        <FormattedMessage
                          id={"ID_FREE_TRIAL_SURVEY_STEP1_LEVEL_ITEM3"}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="FreeTrialSurveyPopup--Content--RadioItem">
                  <p className="FreeTrialSurveyPopup--Content--Title">
                    <FormattedMessage
                      id={"ID_FREE_TRIAL_SURVEY_STEP1_INTEREST"}
                    />
                    <span className="Required">*</span>
                  </p>
                  <div className="FreeTrialSurveyPopup--Content--Row">
                    <div className="FreeTrialSurveyPopup--Content--RowItem">
                      <CircleCheckbox
                        name={"interest"}
                        value={1}
                        checked={lectureInterest === 1}
                        handleChange={handleChange}
                        isRadioBtn={true}
                      />
                      <label className="FreeTrialSurveyPopup--Content--RowItemLabel">
                        <FormattedMessage
                          id={"ID_FREE_TRIAL_SURVEY_STEP1_INTEREST_ITEM1"}
                        />
                      </label>
                    </div>
                    <div className="FreeTrialSurveyPopup--Content--RowItem">
                      <CircleCheckbox
                        name={"interest"}
                        value={2}
                        checked={lectureInterest === 2}
                        handleChange={handleChange}
                        isRadioBtn={true}
                      />
                      <label className="FreeTrialSurveyPopup--Content--RowItemLabel">
                        <FormattedMessage
                          id={"ID_FREE_TRIAL_SURVEY_STEP1_INTEREST_ITEM2"}
                        />
                      </label>
                    </div>
                    <div className="FreeTrialSurveyPopup--Content--RowItem">
                      <CircleCheckbox
                        name={"interest"}
                        value={3}
                        checked={lectureInterest === 3}
                        handleChange={handleChange}
                        isRadioBtn={true}
                      />
                      <label className="FreeTrialSurveyPopup--Content--RowItemLabel">
                        <FormattedMessage
                          id={"ID_FREE_TRIAL_SURVEY_STEP1_INTEREST_ITEM3"}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="FreeTrialSurveyPopup--Content--RadioItem">
                  <p className="FreeTrialSurveyPopup--Content--Title">
                    <FormattedMessage id={"ID_FREE_TRIAL_SURVEY_STEP1_SPEED"} />
                    <span className="Required">*</span>
                  </p>
                  <div className="FreeTrialSurveyPopup--Content--Row">
                    <div className="FreeTrialSurveyPopup--Content--RowItem">
                      <CircleCheckbox
                        name={"speed"}
                        value={1}
                        checked={lectureSpeed === 1}
                        handleChange={handleChange}
                        isRadioBtn={true}
                      />
                      <label className="FreeTrialSurveyPopup--Content--RowItemLabel">
                        <FormattedMessage
                          id={"ID_FREE_TRIAL_SURVEY_STEP1_SPEED_ITEM1"}
                        />
                      </label>
                    </div>
                    <div className="FreeTrialSurveyPopup--Content--RowItem">
                      <CircleCheckbox
                        name={"speed"}
                        value={2}
                        checked={lectureSpeed === 2}
                        handleChange={handleChange}
                        isRadioBtn={true}
                      />
                      <label className="FreeTrialSurveyPopup--Content--RowItemLabel">
                        <FormattedMessage
                          id={"ID_FREE_TRIAL_SURVEY_STEP1_SPEED_ITEM2"}
                        />
                      </label>
                    </div>
                    <div className="FreeTrialSurveyPopup--Content--RowItem">
                      <CircleCheckbox
                        name={"speed"}
                        value={3}
                        checked={lectureSpeed === 3}
                        handleChange={handleChange}
                        isRadioBtn={true}
                      />
                      <label className="FreeTrialSurveyPopup--Content--RowItemLabel">
                        <FormattedMessage
                          id={"ID_FREE_TRIAL_SURVEY_STEP1_SPEED_ITEM3"}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="FreeTrialSurveyPopup--Content--Spacing" />

                <div>
                  <p className="FreeTrialSurveyPopup--Content--Title">
                    <FormattedMessage
                      id={"ID_FREE_TRIAL_SURVEY_STEP1_INPUT1"}
                    />
                  </p>
                  <div className="FreeTrialSurveyPopup--Content--Text">
                    <FormattedMessage
                      id={"ID_FREE_TRIAL_SURVEY_STEP1_INPUT1_HINT"}
                    >
                      {placeholder => (
                        <textarea
                          placeholder={placeholder}
                          onChange={e => {
                            handleChangeSurveyAdmin1(e.target.value);
                          }}
                        />
                      )}
                    </FormattedMessage>
                  </div>
                </div>

                <div>
                  <p className="FreeTrialSurveyPopup--Content--Title">
                    <FormattedMessage
                      id={"ID_FREE_TRIAL_SURVEY_STEP1_INPUT2"}
                    />
                  </p>
                  <FormattedMessage
                    id={"ID_FREE_TRIAL_SURVEY_STEP1_INPUT2_HINT"}
                  >
                    {placeholder => (
                      <textarea
                        placeholder={placeholder}
                        onChange={e => {
                          handleChangeSurveyAdmin2(e.target.value);
                        }}
                      />
                    )}
                  </FormattedMessage>
                </div>
              </div>
              <div className="FreeTrialSurveyPopup--Send">
                <button
                  className={`FreeTrialSurveyPopup--Send--${
                    isSurveyEnabled ? "Enable" : "Disable"
                  }`}
                  onClick={handleSubmitSurvey}
                >
                  <FormattedMessage id={"ID_FREE_TRIAL_SURVEY_STEP1_SEND"} />
                </button>
              </div>
            </div>
          )}
          {/* Feedback  */}
          {step === 2 && (
            <div className={"FreeTrialSurveyPopup--FeedbackBody"}>
              <div className="FreeTrialSurveyPopup--Title">
                <p>
                  <FormattedMessage id={"ID_FREE_TRIAL_SURVEY_STEP2_TITLE"} />
                </p>
              </div>
              <div className="FreeTrialSurveyPopup--Content">
                <div className="FreeTrialSurveyPopup--Content--StarItem">
                  <p className="FreeTrialSurveyPopup--Content--Title">
                    <FormattedMessage
                      id={"ID_FREE_TRIAL_SURVEY_STEP2_RATING"}
                    />
                    <span className="Required">*</span>
                  </p>

                  <div className="rating">
                    <Rating
                      initialRating={score}
                      emptySymbol={
                        <img
                          src={starImageOff}
                          className="rating_star"
                          alt="star-img"
                        />
                      }
                      fullSymbol={
                        <img
                          src={starImageOn}
                          className="rating_star"
                          alt="star-img"
                        />
                      }
                      onChange={score => {
                        handleChangeScore(score);
                      }}
                    />
                  </div>
                </div>

                <div className="FreeTrialSurveyPopup--Content--Spacing" />

                <div>
                  <p className="FreeTrialSurveyPopup--Content--Title">
                    <FormattedMessage
                      id={"ID_FREE_TRIAL_SURVEY_STEP2_INPUT1"}
                    />
                    <span className="Required">*</span>
                  </p>
                  <div className="FreeTrialSurveyPopup--Content--Text">
                    <FormattedMessage
                      id={"ID_FREE_TRIAL_SURVEY_STEP2_INPUT1_HINT"}
                    >
                      {placeholder => (
                        <textarea
                          maxLength={400}
                          placeholder={placeholder}
                          onChange={e => {
                            handleChangeFeedbackTutor(e.target.value);
                          }}
                        />
                      )}
                    </FormattedMessage>
                  </div>
                </div>

                <div>
                  <p className="FreeTrialSurveyPopup--Content--Title">
                    <FormattedMessage
                      id={"ID_FREE_TRIAL_SURVEY_STEP2_INPUT2"}
                    />
                  </p>
                  <FormattedMessage
                    id={"ID_FREE_TRIAL_SURVEY_STEP2_INPUT2_HINT"}
                  >
                    {placeholder => (
                      <textarea
                        maxLength={400}
                        placeholder={placeholder}
                        onChange={e => {
                          handleChangeFeedbackAdmin(e.target.value);
                        }}
                      />
                    )}
                  </FormattedMessage>
                </div>
              </div>

              <div className="FreeTrialSurveyPopup--SendButton--Spacing"></div>

              <div className="FreeTrialSurveyPopup--Send">
                <button
                  className={`FreeTrialSurveyPopup--Send--${
                    isFeedbackEnabled ? "Enable" : "Disable"
                  }`}
                  onClick={handleSubmitFeedback}
                >
                  <FormattedMessage id={"ID_FREE_TRIAL_SURVEY_STEP2_SEND"} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
