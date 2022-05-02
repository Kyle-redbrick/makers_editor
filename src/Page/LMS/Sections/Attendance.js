import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


// import moment from "moment";
import { getInventoryCards } from "../api";
import { InventoryCard } from "../../../models";

import Title from "../Components/Title";

import { COLOR } from "../Constants";
import "./Attendance.scss";

const Self = styled.div`
  flex: 1;
  padding-bottom: 100px;
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
width: 350px;
max-width: 100%;
background: white;
border: 1px solid #a0a096;
font-family: Arial, Helvetica, sans-serif;
line-height: 1.125em;
`;


const Attendance = ({ ...props }) => {
  const [value, onChange] = useState(new Date());

  // const [cards, setCards] = useState([]);

  // useEffect(() => {
  //   init();
  // }, []);

  // const init = async () => {
  //   const _cards = await getInventoryCards({ userId: 1 });
  //   setCards(_cards.map((card) => new InventoryCard(card)));
  // };

  return (
    <Self {...props}>
      <Calendar className={CardCreatedAt} value={value} showWeekNumbers={false} />
    </Self>
  );
};

export default Attendance;
