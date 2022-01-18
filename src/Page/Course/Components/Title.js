import React from "react";
import styled from "@emotion/styled";

const Self = styled.div`
  font-size: 36px;
  font-weight: bold;
  line-height: 1.11;
  letter-spacing: normal;
  color: #ffffff;

  @media screen and (max-width: 1169px) {
    width: 88.33vw;
    margin: 0 auto;
    font-size: 22px;
    line-height: 1.11;
  }
`;

const Title = ({ children, ...props }) => {
  return <Self {...props}>{children}</Self>;
};

export default Title;
