import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Calendar from 'react-calendar';
import { COLOR } from "../Constants";
import nextArrow from "../../../Image/btn_right_arrow.svg"
import prevArrow from "../../../Image/btn_left_arrow.svg"

import "./Calendar.scss";

const Self = styled.div`
  padding-left:30px;
  flex: 1;
  padding-bottom: 100px;
`;


const Attendance = ({ ...props }) => {
  const [value, onChange] = useState(new Date());
  console.log(value.getDate()+1)
  const test = "Tue May 04 2022 09:16:24 GMT+0900 (Korean Standard Time"

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
      <Calendar  
        calendarType={"US"}
        prevLabel={<img src={prevArrow}/>}
        nextLabel={<img src={nextArrow} />}
        value={[value,new Date().setDate(2)]} defaultView={"month"}
        prev2Label={""}
        next2Label={""}
        showNeighboringMonth={false}
        showFixedNumberOfWeeks={false}
        />
    </Self>
  );
};

export default Attendance;
