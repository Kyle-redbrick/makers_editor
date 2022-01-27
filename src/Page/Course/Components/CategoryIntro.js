import React, { useCallback } from "react";
import noop from "lodash/noop";
import styled from "@emotion/styled";

const Line = styled.div`
  margin-bottom: 15px;
  padding: 14px 22px 14px;
  color: #ffffff;
  font-size: 20px;
  display: none;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.38px;
  &:not(:last-child) {
    margin-right: 10px;
  }
  ${(props) =>
    props.active &&
    `
    display: block;
  `}
  `;

const CategoryIntro = ({ active, categoryId = "", children, onClick = noop, ...props }) => {

  const handleClick = useCallback(
    () => {
      onClick(categoryId);
    },
    [onClick]
  );

  return (
    <Line {...props} active={active} onClick={handleClick}>
      {children}
    </Line>
  );
};

export default CategoryIntro;