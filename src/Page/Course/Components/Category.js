import React, { useCallback } from "react";
import noop from "lodash/noop";
import styled from "@emotion/styled";

const Self = styled.div`
  margin: 30px 0 15px;
  border: solid 2px rgba(255, 255, 255, 0.3);
  border-radius: 27.5px;
  padding: 14px 22px 14px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.38px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  

  &:not(:last-child) {
    margin-right: 10px;
  }

  ${(props) =>
    props.active &&
    `
      background-color: #ff6f44;
      border-color: #ff6f44;
  `}

  @media screen and (max-width: 1169px) {
    height: 42px;
    line-height: 42px;
    padding: 0 16.5px 0 17.5px;
    margin: 0 0 10px;
    border: solid 1.5px rgba(255, 255, 255, 0.2);
    border-radius: 21px;
    font-size: 15px;
  }
`;

const Category = ({ active, categoryId = "", children, onClick = noop, ...props }) => {
  const handleClick = useCallback(
    () => {
      onClick(categoryId);
      console.log(children);
    },
    [onClick]
  );

  return (
    <Self {...props} active={active} onClick={handleClick}>
      {children}
    </Self>
  );
};

export default Category;
