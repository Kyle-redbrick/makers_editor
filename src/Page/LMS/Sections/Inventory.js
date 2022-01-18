import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
// import moment from "moment";
import { getInventoryCards } from "../api";
import { InventoryCard } from "../../../models";

import Title from "../Components/Title";

import { COLOR } from "./../Constants";

const Self = styled.div`
  flex: 1;
  padding-bottom: 100px;
`;

const Row = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(4, 1fr);
`;

const StyledCard = styled.div`
  height: 269px;
  border-radius: 16px;
  border: solid 2px rgba(255, 255, 255, 0.1);
  background-color: #262626;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 20px;
`;

const CardBody = styled.div``;

const NewCardText = styled.div`
  font-size: 10px;
  font-weight: bold;
  line-height: 1;
  letter-spacing: 2px;
  text-align: center;
  color: ${COLOR.ORANGE};
`;

const CardIcon = styled.img`
  width: 100%;
`;

const CardTitle = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.11;
  text-align: center;
  color: #fff;
`;

const CardCreatedAt = styled.div`
  margin-top: 10px;
  font-size: 10px;
  font-weight: bold;
  line-height: 1;
  letter-spacing: 2px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
`;

const Card = ({ card }) => {
  return (
    <StyledCard>
      <CardIcon alt={card.card.title} src={card.card.icon} />
      <CardBody>
        {!card.read && <NewCardText>NEW</NewCardText>}
        <CardTitle>{card.card.title}</CardTitle>
        <CardCreatedAt>{card.formattedCreatedAt()}</CardCreatedAt>
      </CardBody>
    </StyledCard>
  );
};

const Inventory = ({ ...props }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const _cards = await getInventoryCards({ userId: 1 });
    setCards(_cards.map((card) => new InventoryCard(card)));
  };

  return (
    <Self {...props}>
      <Title>나의 인벤토리</Title>

      <Row>
        {cards.map((card, index) => (
          <Card card={card} key={index} />
        ))}
      </Row>
    </Self>
  );
};

export default Inventory;
