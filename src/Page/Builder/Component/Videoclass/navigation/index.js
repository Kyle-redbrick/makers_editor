import React, { Component } from "react";
import { connect } from "react-redux";
import closeImg from "../../../../../Image/icon-close_list.svg";
import backImg from "../../../../../Image/icon-back_list.svg";
import completeImg from "../../../../../Image/builder/mission-complete.svg";
import "./index.scss";

export const grade1 = {
  "열리지 않는 문": ["클릭하면 흔들리는 문 코딩하기"],
  "수상한 가구들": [
    "작동하는 시계 코딩하기",
    "클릭하면 말풍선이 뜨는 시계 코딩하기",
    "클릭하면 말풍선이 뜨는 책상 코딩하기"
  ],
  "반응이 없는 가구들": [
    "클릭해도 열리지 않는 서류 가방 코딩하기",
    "클릭하면 불이 켜지는 램프 코딩하기"
  ],
  "숨겨진 열쇠는 어디에?": [
    "숨겨진 은색 열쇠 코딩하기",
    "클릭하면 그림이 사라지는 액자 코딩하기",
    "열쇠가 나오는 액자 코딩하기",
    "액자 속에서 발견한 은색 열쇠 코딩하기"
  ],
  "쓸모가 없는 열쇠?": [
    "마우스로 움직이는 은색 열쇠 코딩하기",
    "문에 맞지 않는 은색 열쇠 코딩하기"
  ],
  "서류 가방을 여는 열쇠": [
    "가방을 열면 없어지는 은색 열쇠 코딩하기",
    "가방을 여는 은색 열쇠 코딩하기",
    "열리는 서류 가방 코딩하기"
  ],
  "진짜 열쇠가 나타났다!": [
    "가방을 열면 보이는 황금 열쇠 코딩하기",
    "튀어나오는 황금 열쇠 코딩하기",
    "마우스로 움직이는 황금 열쇠 코딩하기"
  ],
  "드디어 열린 문": [
    "황금 열쇠로 열리는 문 코딩하기",
    "열린 문밖으로 나가도록 코딩하기"
  ],
  "배경 음악 재생하기": ["배경 음악 재생하기"],
  "효과음 재생하기": ["효과음 재생하기"]
};

export const grade2 = {
  "몬텐노의 금고": [
    "활활 타오르는 벽난로 코딩하기",
    "멋진 정물화가 그려진 액자 코딩하기",
    "알쏭달쏭한 그림이 그려진 액자 코딩하기"
  ],
  "수납장에는 무엇이 들어있을까?": [
    "수상한 수납장 코딩하기",
    "힌트 카드가 나오는 수납장 코딩하기"
  ],
  "첫 번째 힌트 카드": [
    "숨겨진 힌트 카드 코딩하기",
    "수납장에서 발견한 힌트 카드 코딩하기",
    "다시 수납장에 들어가는 힌트 카드 코딩하기"
  ],
  "책상에서 단서 찾기": [
    "책상 위를 살펴볼 수 있도록 코딩하기",
    "원래 장소로 돌아오도록 코딩하기"
  ],
  "알쏭달쏭한 수첩의 내용": [
    "바늘이 돌아가는 나침반 코딩하기",
    "책상 위를 밝히는 촛대 코딩하기",
    "힌트가 적힌 수첩 코딩하기"
  ],
  "보석함에 들어 있는 것은?": [
    "두드린 횟수가 저장되는 보석함 코딩하기",
    "두드린 횟수를 말해주는 보석함 코딩하기",
    "5번 두드리면 열리는 보석함 코딩하기",
    "힌트 카드가 나오는 보석함 코딩하기"
  ],
  "두 번째 힌트 카드": [
    "숨겨진 힌트 카드 코딩하기",
    "보석함에서 발견한 힌트 카드 코딩하기",
    "클릭하면 사라지는 힌트 카드 코딩하기"
  ],
  "금고의 비밀번호": ["비밀번호를 요구하는 금고 코딩하기"],
  "금고를 열어라": [
    "비밀번호를 맞추면 열리는 금고 코딩하기",
    "성공 장면으로 바뀌도록 코딩하기",
    "틀린 비밀번호를 입력하면 흔들리는 금고 코딩하기"
  ],
  "배경 음악과 효과음 재생하기": ["배경 음악 재생하기", "효과음 재생하기"]
};

export const grade3 = {
  "주변을 둘러보자": [
    "열리지 않는 문 코딩하기",
    "모니터 코딩하기",
    "바닥 입구 코딩하기"
  ],
  "충전 기계에서 배터리 찾기": [
    "신호보내는 충전 기계 코딩하기",
    "기계 뒤에서 발견한 배터리 코딩하기",
    "마우스로 움직이는 배터리 코딩하기"
  ],
  "배터리 연결하기": [
    "전원이 들어온 상태를 저장하는 로봇 코딩하기 ",
    "전원이 들어온 로봇 코딩하기",
    "움직일 수 있는 로봇 코딩하기",
    "말하는 로봇 코딩하기"
  ],
  "사라진 건전지": ["사용 불가능한 배터리 코딩하기", "없어진 배터리 코딩하기"],
  "지하로 내려간 로봇": ["바닥으로 보낸 로봇 코딩하기", "준비된 로봇 코딩하기"],
  "비상 방어 시스템 작동!": [
    "돌아다니는 미사일 코딩하기",
    "계속 나타나는 미사일 코딩하기",
    "여러 개의 미사일 코딩하기"
  ],
  "스위치를 향해 가는 로봇": [
    "오른쪽 키로 움직이는 로봇 코딩하기",
    "키를 누르지 않으면 멈추는 로봇 코딩하기"
  ],
  "미사일에 맞은 로봇": [
    "여러 개의 미사일에 닿는 로봇 코딩하기",
    "미사일에 닿은 로봇 코딩하기"
  ],
  "스위치의 정체는?": [
    "로봇과 닿은 스위치 코딩하기",
    "문이 열리는 순간 코딩하기"
  ],
  "배경 음악과 효과음 재생하기": ["배경 음악 재생하기", "효과음 재생하기"]
};
const coures = [
  "게임 제작으로 마스터하는 프로그래밍 개념 (기본)",
  "게임 제작으로 마스터하는 프로그래밍 개념 (유형)",
  "게임 제작으로 마스터하는 프로그래밍 개념 (심화)"
];
class Navigation extends Component {
  handleInteraction = e => {
    this.props.handleInteraction();
  };
  render() {
    const {
      isOpen,
      toggleNav,
      maxOcpLevel,
      currentOcpLevel,
      currentStageNum,
      stages,
      classTitle
    } = this.props;
    let data, courseTitle;
    if (classTitle.startsWith("초급")) {
      data = grade1;
      courseTitle = coures[0];
    }
    if (classTitle.startsWith("중급")) {
      data = grade2;
      courseTitle = coures[1];
    }
    if (classTitle.startsWith("고급")) {
      data = grade3;
      courseTitle = coures[2];
    }
    let currentMission = 0;
    for (let i = 0; i < currentStageNum; i++) {
      if (stages[i].type === "CODE") {
        currentMission++;
      }
    }
    let footer = document.querySelector(".ocpView_footer_nav_title");
    if (
      footer &&
      data[Object.keys(data)[currentOcpLevel - 1]] &&
      data[Object.keys(data)[currentOcpLevel - 1]][currentMission]
    ) {
      footer.innerHTML = `mission ${currentMission + 1}.${
        data[Object.keys(data)[currentOcpLevel - 1]][currentMission]
      }`;
    }
    let isFromWizclass =
      this.props.email === "multicampus01@wizschool.io" ||
      this.props.email === "multicampus02@wizschool.io" ||
      this.props.email === "multicampus03@wizschool.io" ||
      this.props.email === "dream01@wizschool.io" ||
      this.props.email === "dream02@wizschool.io" ||
      this.props.email === "dream03@wizschool.io";
    return (
      <div className={`vc_navigation ${isOpen && "vc_navigation_on"}`}>
        <div
          className="vc_navigation_content"
          onClick={this.handleInteraction}
          onScroll={this.handleInteraction}
        >
          {isFromWizclass ? (
            <div className="vc_navigation_wizclass">
              <div className="vc_navigation_header">
                <img
                  className="vc_navigation_back"
                  src={backImg}
                  alt="close"
                  onClick={() => {
                    window.location.replace("https://wizclass.com/");
                  }}
                />
                <div className="vc_navigation_layers">
                  {`${courseTitle}  >  step ${currentOcpLevel}  >  mission ${currentMission +
                    1}`}
                </div>
                <img
                  className="close__header"
                  src={closeImg}
                  alt="close"
                  onClick={toggleNav}
                />
              </div>
              <div className="vc_navigation_title">{courseTitle}</div>
            </div>
          ) : (
            <img
              className="vc_navigation_close"
              src={closeImg}
              alt="close"
              onClick={toggleNav}
            />
          )}

          {Object.keys(data).map((k, i) => {
            return (
              <div key={i}>
                <div className="vc_navigation_step_name">
                  Step {i + 1} : {k}
                  {maxOcpLevel > i + 1 && <span>스텝 완료</span>}
                </div>
                {data[k].map((v, j) => {
                  return (
                    <div
                      key={j}
                      className={`vc_navigation_mission ${currentOcpLevel ===
                        i + 1 &&
                        j === currentMission &&
                        "vc_navigation_mission_current"}`}
                    >
                      <span className="mission">Mission {j + 1}</span>
                      {v}
                      {maxOcpLevel > i + 1 && (
                        <img src={completeImg} alt="complete" />
                      )}

                      {maxOcpLevel === i + 1 &&
                        (j < currentMission && (
                          <img src={completeImg} alt="complete" />
                        ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="vc_navigation_empty" onClick={toggleNav} />
      </div>
    );
  }
}

export default connect(
  state => ({
    email: state.userinfo.email
  }),
  {}
)(Navigation);
