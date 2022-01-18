import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "@emotion/styled";
import IMAGE from "../Constants/Images";

const Self = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  border-radius: 16px;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.5);
  background-color: #1c1c1c;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

const Title = styled.div`
  margin: 10px;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.44;
  text-align: center;
  color: #ffffff;
`

const SubTitle = styled.div`
  font-size: 14px;
  line-height: 1.86;
  text-align: center;
  color: #ffffff;
`

const Button = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #ff6f44;
  border: none;
  line-height: 1.5;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
`

const AlertPopup = ({ dismiss }) => {
  return (
    <Self>
      <Image src={IMAGE.ICON_ALERT} alt="alert" />
      <Title><FormattedMessage id="ID_COURSE_DETAIL_ALERT_POPUP_TITLE" /></Title>
      <SubTitle><FormattedMessage id="ID_COURSE_DETAIL_ALERT_POPUP_SUBTITLE" /></SubTitle>
      <Button type="button" onClick={dismiss}><FormattedMessage id="ID_COURSE_DETAIL_ALERT_POPUP_CONFIRM" /></Button>
    </Self>
  );
};

export default AlertPopup;
