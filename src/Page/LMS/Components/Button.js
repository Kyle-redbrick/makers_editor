import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledButton = styled.button`
  width: ${(props) => props.width || 130}px;
  height: ${(props) => props.height || 40}px;
  border-radius: 10px;
  background-color: #5b5b5b;
  border: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  color: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export const LinkButton = ({ children, to, ...props }) => {
  return (
    <Link to={to}>
      <StyledButton {...props}>{children}</StyledButton>
    </Link>
  );
};

export default Button;
