import React from "react";
import ocaImg from "./Image/oca.png";
import startTongImg from "./Image/startTong.png";
import startTongMobileImg from "./Image/startTong-mobile.png";
import endTongImg from "./Image/endTong.png";
import endTongMobileImg from "./Image/endTong-mobile.png";
import "./index.scss";

export default props => {
  const {
    currentQuestion,
    result,
    isBackButtonHidden,
    onClickStart,
    onClickChoice,
    onClickBack,
    onClickRetry,
    onClickFreeTrial,
    onClickShareKakao,
    onClickShareFacebook
  } = props;

  let contents;
  if (result) {
    contents = (
      <ResultPage
        result={result}
        onClickRetry={onClickRetry}
        onClickFreeTrial={onClickFreeTrial}
        onClickShareKakao={onClickShareKakao}
        onClickShareFacebook={onClickShareFacebook}
      />
    );
  } else if (currentQuestion) {
    contents = (
      <QuestionPage
        question={currentQuestion}
        isBackButtonHidden={isBackButtonHidden}
        onClickChoice={onClickChoice}
        onClickBack={onClickBack}
      />
    );
  } else {
    contents = <StartPage onClickStart={onClickStart} />;
  }

  return <div className="mycodingstyle">{contents}</div>;
};

function StartPage(props) {
  const { onClickStart } = props;
  return (
    <div className="mycodingstyle_contents mycodingstyle_contents-start">
      <div className="mycodingstyle_btn" onClick={onClickStart}>
        시작하기
      </div>
      <img className="mycodingstyle_img" src={startTongImg} alt="startTong" />
      <img
        className="mycodingstyle_img mycodingstyle_img-mobile"
        src={startTongMobileImg}
        alt="startTongMobile"
      />
    </div>
  );
}

function QuestionPage(props) {
  const { question, isBackButtonHidden, onClickChoice, onClickBack } = props;
  return (
    <>
      {isBackButtonHidden || (
        <div className="mycodingstyle_backBtn" onClick={onClickBack}>
          뒤로가기
        </div>
      )}
      <div className="mycodingstyle_contents mycodingstyle_contents-question">
        <div className="mycodingstyle_subtitle">
          <div className="mycodingstyle_subtitle_decorator" />
          <div className="mycodingstyle_subtitle_text">나는 어떤 개발자?</div>
        </div>
        <div className="mycodingstyle_title">{question.title}</div>
        <div className="mycodingstyle_contents_choices">
          <div className="mycodingstyle_contents_choice mycodingstyle_contents_choice-left">
            <div
              className="mycodingstyle_contents_choice_bubble"
              onClick={() => {
                onClickChoice(0);
              }}
            >
              <img src={question.choices[0].imgSrc} alt="choice-left" />
              <div className="mycodingstyle_contents_choice_bubble_title">
                A{`\n`}
                {question.choices[0].title}
              </div>
              <div className="mycodingstyle_contents_choice_bubble_arrow" />
            </div>
          </div>
          <div className="mycodingstyle_contents_character">
            <img src={ocaImg} alt="character" />
          </div>
          <div className="mycodingstyle_contents_choice mycodingstyle_contents_choice-right">
            <div
              className="mycodingstyle_contents_choice_bubble"
              onClick={() => {
                onClickChoice(1);
              }}
            >
              <div className="mycodingstyle_contents_choice_bubble_title">
                B{`\n`}
                {question.choices[1].title}
              </div>
              <img src={question.choices[1].imgSrc} alt="choice-left" />
              <div className="mycodingstyle_contents_choice_bubble_arrow" />
            </div>
          </div>
        </div>
        <div className="mycodingstyle_contents_choices mycodingstyle_contents_choices-mobile">
          <div className="mycodingstyle_contents_choice">
            <div
              className="mycodingstyle_contents_choice_bubble"
              onClick={() => {
                onClickChoice(0);
              }}
            >
              <img src={question.choices[0].imgSrc} alt="choice-left" />
              <div className="mycodingstyle_contents_choice_bubble_choiceId">
                A
              </div>
              <div className="mycodingstyle_contents_choice_bubble_title">
                {question.choices[0].title}
              </div>
            </div>
          </div>
          <div className="mycodingstyle_contents_choice">
            <div
              className="mycodingstyle_contents_choice_bubble"
              onClick={() => {
                onClickChoice(1);
              }}
            >
              <img src={question.choices[1].imgSrc} alt="choice-left" />
              <div className="mycodingstyle_contents_choice_bubble_choiceId">
                B
              </div>
              <div className="mycodingstyle_contents_choice_bubble_title">
                {question.choices[1].title}
              </div>
            </div>
          </div>
          <div className="mycodingstyle_contents_character">
            <img src={ocaImg} alt="character" />
          </div>
        </div>
      </div>
    </>
  );
}

function ResultPage(props) {
  const {
    result,
    onClickRetry,
    onClickFreeTrial
    // onClickShareKakao,
    // onClickShareFacebook
  } = props;
  return (
    <>
      <div className="mycodingstyle_retryBtn" onClick={onClickRetry}>
        다시 해보기
      </div>
      <div className="mycodingstyle_contents mycodingstyle_contents-result">
        <img className="mycodingstyle_img" src={endTongImg} alt="endTong" />
        <img
          className="mycodingstyle_img mycodingstyle_img-mobile"
          src={endTongMobileImg}
          alt="endTongMobile"
        />
        <div className="mycodingstyle_contents_result">
          <div className="mycodingstyle_contents_result_left">
            <img src={result.imgSrc} alt="result" />
          </div>
          <div className="mycodingstyle_contents_result_right">
            <div className="mycodingstyle_contents_result_title">
              {`너는 ${result.title}이구나!`}
            </div>
            <div className="mycodingstyle_contents_result_description">
              {result.description}
            </div>
          </div>
        </div>
        <div className="mycodingstyle_btn" onClick={onClickFreeTrial}>
          무료 게임 코딩 신청하기
        </div>
        {/* <div className="mycodingstyle_btn_desciption">
          무료 게임 만들기 신청 및 완료 시,{`\n`}아이패드 지급 이벤트 자동 응모
        </div>
        <div className="mycodingstyle_shares">
          <img
            className="mycodingstyle_share"
            src={shareKakaoImg}
            alt="kakao"
            onClick={onClickShareKakao}
          />
          <img
            className="mycodingstyle_share"
            src={shareFacebookImg}
            alt="facebook"
            onClick={onClickShareFacebook}
          />
        </div>
        <div className="mycodingstyle_shares_description">
          친구에게 공유하면 당첨확률 UP!
        </div> */}
      </div>
    </>
  );
}
