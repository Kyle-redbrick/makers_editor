import React, { Component } from "react";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";
// import OnlineCampForm from "./OnlineCampForm";
import View from "./View";

const onlineCamps = [
  {
    type: "blockStory",
    title: "블록 코딩으로 스토리 앱 만들기",
    rounds: [
      { dateInfo: "2020.11.06 금요일 14:00~16:00" },
      { dateInfo: "2020.11.07 토요일 14:00~16:00" }
    ]
  },
  {
    type: "blockGame",
    title: "블록 코딩으로 나의 첫 게임 만들기",
    rounds: [{ dateInfo: "2020.11.07 토요일 14:00~18:00" }]
  },
  {
    type: "textStory",
    title: "텍스트 코딩으로 스토리 앱 만들기",
    rounds: [
      { dateInfo: "2020.11.06 금요일 16:00~18:00" },
      { dateInfo: "2020.11.08 일요일 14:00~16:00" }
    ]
  },
  {
    type: "textGame",
    title: "텍스트 코딩으로 스토리 앱 만들기",
    rounds: [{ dateInfo: "2020.11.07 토요일 14:00~18:00" }]
  }
];

class Container extends Component {
  onClickApplyOnlineCamp = onlineCamp => {
    this.showOnlineCampFormFor(onlineCamp);
  };
  showOnlineCampFormFor = onlineCamp => {
    const popupOption = {
      dismissButton: false,
      dismissOverlay: true,
      defaultPadding: false,
      mobileFullscreen: true
      // scrollable: true
    };
    // showPopUp(<OnlineCampForm onlineCamp={onlineCamp} />, popupOption);
    showPopUp(
      <PopUp.OneButton title={"마감되었습니다."} buttonName={"확인"} />,
      popupOption
    );
  };

  render() {
    return (
      <View
        onlineCamps={onlineCamps}
        onClickApplyOnlineCamp={this.onClickApplyOnlineCamp}
      />
    );
  }
}
export default Container;
