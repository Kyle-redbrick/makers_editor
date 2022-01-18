import React, { useCallback } from "react";
import noop from "lodash/noop";
import styled from "@emotion/styled";

const Self = styled.div`
  margin-bottom: 30px;
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

  &:not(:last-child) {
    margin-right: 10px;
  }

  ${(props) =>
    props.active &&
    `
      background-color: #ff6f44;
      border-color: #ff6f44;
  `}

  @media screen and (max-width: 1169px){
    padding: 12px 17px 12px;
    margin-bottom: 10px;
    font-size: 15px;
    white-space: nowrap;
    border-radius: 21px;
    border: solid 1.5px rgba(255, 255, 255, 0.2);
    display: inline-block;
  }
`;

const Category = ({ active, categoryId = "", children, onClick = noop, ...props }) => {
  const handleClick = useCallback(
    () => {
      onClick(categoryId);
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
