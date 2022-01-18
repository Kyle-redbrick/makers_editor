import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "@emotion/styled";

import Container from "../Components/Container";
import Title from "../Components/Title";

import GameItem from "../Components/GameItem";

const Self = styled.div`
  width: 100%;  
  padding-bottom: 39.5px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 370px);
  grid-column-gap: 30px;

  @media screen and (max-width: 1169px){
    width: 94.165vw;
    overflow-x: auto;
    margin-left: 5.835vw;
    grid-template-columns: repeat(2, 88.33vw);
    grid-column-gap: 10px;
  }
`;

const Games = ({ items, ...props }) => {
  return (
    <Self {...props}>
      <Container>
        <Title><FormattedMessage id="ID_COURSE_DETAIL_FRIEND_GAME" /></Title>
        <Row>
          {items.map((item) => <GameItem key={item.id} item={item} />)}
        </Row>
      </Container>
    </Self>
  );
};

export default Games;
