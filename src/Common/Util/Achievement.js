import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "@emotion/styled";
import store from "../Store";
import * as userInfoActions from "../Store/Reducer/UserInfo";
import { notify } from "./Notification";
import * as Popup from "../Component/PopUp";
import IntroPopup from "../../Page/CourseDetail/Components/IntroPopup";

export const LEARNING_COMPLETE_ACHIEVEMENT_ID_LIST = [
  "learning_oobc_c1",
  "learning_js_c1",
  "learning_python_c1"
]

const Container = styled.div`
  margin: 15px 10px;
`

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
`

const Message = styled.p`
  margin-bottom: 6px;
  white-space: pre-line !important;
`

const RewardPoint = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #ff6f44;
  margin-bottom: 10px;
`

const DreamPoint = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5)
`

const Msg = ({ achievement, dreamPoint }) => {
  const { rewardPoint, localized } = achievement;

  return (
    <Container>
      <Title>{localized[0] ? localized[0].reachedTitle : ""}</Title>
      <Message>{localized[0] ? localized[0].message : ""}</Message>
      <RewardPoint>{`${rewardPoint} `}<FormattedMessage id="ID_ACHIVEMENT_BITS" /></RewardPoint>
      <DreamPoint><FormattedMessage id="ID_ACHIVEMENT_TEXT" />{`${dreamPoint} `}<FormattedMessage id="ID_ACHIVEMENT_BITS" /></DreamPoint>
    </Container>
  )
}

/**
 * 서버에서 업적 달성 시 현재 서버 코드들이 response 보내는 format이 제각각이라 body에 넣지 못하고 header에 넣어서 보냄
 * header에 plain text로 보낼 수 없기 때문에 서버에서 base64로 encoding 해서 보냄
 * 클라이언트에서 해당 data를 사용하기 위해서 decoding 하고 parsing에서 사용하고 있음
 */

const handleResponse = res => {
  let achievements = res.headers.get("achievements")
  if (achievements && achievements.length > 0) {
    achievements = decodingParser(achievements);
    const { reachedAchievements, dreamPoint } = achievements;

    reachedAchievements.forEach(achievement => {
      updateUserDreamPoint(achievement.rewardPoint)
      if(LEARNING_COMPLETE_ACHIEVEMENT_ID_LIST.includes(achievement.id)) {
        Popup.showPopUp(<IntroPopup url="/lms" type={achievement.id}/>, {
          dismissButton: false,
          dismissOverlay: true,
          defaultPadding: false,
          darkmode: true,
          mobileFullscreen: true,
          overflow: true,
        });  
      }

      notify(
        <Msg achievement={achievement} dreamPoint={dreamPoint} />,
        {
          position: 'bottom-right',
          autoClose: 5000
        })
    });
  }
}

const decodingParser = data => {
  const json = Buffer.from(data, 'base64').toString('utf8');
  return JSON.parse(json);
}

const updateUserDreamPoint = rewardPoint => {
  const dreamPoint = getUserDreamPoint()
  store.dispatch(userInfoActions.updateUserInfo({ dreamPoint: dreamPoint + rewardPoint }))
}

const getUserDreamPoint = () => {
  return selectUserDreamPoint(store.getState())
}

const selectUserDreamPoint = state => {
  return state.userinfo.dreamPoint
}

export default {
  handleResponse,
  decodingParser
}