import React from "react";
import styled from "@emotion/styled";

import Container from "../Components/Container";
import Title from "../Components/Title";

const Self = styled.div`
  width: 100%;  
  padding-bottom: 39.5px;
`;

const Comment = styled.div`
  padding-left: 75px;
  font-size: 16px;
  line-height: 1.56;
  color: #fff;
`

const Image = styled.div`
  width: 60px;
  height: 60px;
  border: solid 1px rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  background-color: green;
  margin-right: 15px;
`

const Name = styled.div`
  font-size: 15px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
`

const NameWrap = styled.div``

const Nickname = styled.div`
  font-size: 13px;
  font-weight: 500;
  line-height: 1.15;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 7px;
`

const ProducerWrap = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const Producer = ({ ...props }) => {
  return (
    <Self {...props}>
      <Container>
        <Title>제작자의 한 마디</Title>
        <ProducerWrap>
          <Image />
          <NameWrap>
            <Nickname>칭호 들어가는 곳</Nickname>
            <Name>네모네모</Name>
          </NameWrap>
        </ProducerWrap>
        <Comment>좀비 바이러스가 휩쓸어 버린 학교, 과연 당신은 생존할 수 있을까? 독극물과 좀비로 뒤덮인 복도를 달려 백신을 손에 넣어라! 내가 만들어가는 좀비 서바이벌 게임!</Comment>
      </Container>
    </Self>
  );
};

export default Producer;
