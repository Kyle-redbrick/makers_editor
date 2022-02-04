import React from "react";
import styled from "@emotion/styled";
import {FormattedMessage} from "react-intl";

import { IMAGE } from "./../Constants/Images";
import { COLOR } from "./../Constants";

const Self = styled.div`
  position: relative;
  width: 430px;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.5);
  background-color: #1c1c1c;
  border-radius: 16px;
`;

const Content = styled.div`
  padding: 30px 20px 40px;
  text-align: center;
`

const ConfirmButton = styled.button`
  width: 370px;
  height: 50px;
  border-radius: 10px;
  background-color: ${COLOR.ORANGE};
  border: none;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
  letter-spacing: 0.38px;
  cursor: pointer;
  color: #fff;

  &:focus {
    outline: none;
  }
`

const CancelButton = styled.button`
  width: 370px;
  height: 50px;
  border-radius: 10px;
  background-color: #1c1c1c;
  border: none;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
  letter-spacing: 0.38px;
  cursor: pointer;
  color: #ef7851;

  &:focus {
    outline: none;
  }
`

const AlertIcon = styled.img`
  width: 100px;
  height: 100px;
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
  border: 0;
`

const AlertMessage = styled.div`
  padding: 20px 30px 10px;
  margin: 10px 0 20px 0;
`

const AlertPopup = ({ message, onSubmit, ...props }) => {
  const { dismiss } = props;
  return (
    <Self>
      <Content>
        <AlertIcon src={IMAGE.ICON_ALERT} />
        <AlertMessage>{message}</AlertMessage>
        <ConfirmButton onClick={async () => {
          const result = await onSubmit();
          if (result.success) {
            dismiss()
          }
        }}><FormattedMessage id="ID_QNA_ALERT_CONFIRM" /></ConfirmButton>
        <CancelButton onClick={() => dismiss()}><FormattedMessage id="ID_QNA_ALERT_CANCEL" /></CancelButton>
      </Content>
    </Self>
  );
};

export default AlertPopup;
