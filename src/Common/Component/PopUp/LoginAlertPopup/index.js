import React, { Component } from "react";
import "./index.scss";
import styled from "@emotion/styled";



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
  background-color: #ff6f44;
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
`;

const AlertMessage = styled.div`
  padding: 20px 30px 10px;
  margin: 10px 0 20px 0;
`;
const LoginAlertPopup = ({ message, onSubmit, ...props }) => {
  const { dismiss } = props;
  return (
    <Self>
      <Content>
        <AlertMessage>You need to log in to proceed.</AlertMessage>
        <ConfirmButton onClick={async () => {
          // const result = await onSubmit();
          // if (result.success) {
          dismiss();
          //}
        }}>확인</ConfirmButton>
        <CancelButton onClick={() => dismiss()}>취소</CancelButton>
      </Content>
    </Self>
  );
}

export default LoginAlertPopup;