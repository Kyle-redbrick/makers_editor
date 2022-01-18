import React from "react";
import styled from "@emotion/styled";

const Self = styled.h2`
  padding: 20px 0 19.5px;
  border-bottom: solid 1px rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 19.5px;
  font-size: 30px;
  font-weight: bold;
  line-height: 1.33;
  color: #fff;

  ${(props) => props.hidden && `display: none;`}
`;


const Title = ({ children, hidden, ...props }) => {
  return (
    <Self hidden={hidden} {...props}>
      {children}
    </Self>
  );
};

export default Title;
