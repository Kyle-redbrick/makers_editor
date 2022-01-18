import React from "react";
import styled from "@emotion/styled";

const Self = styled.div`
  margin-bottom: 10px;
  color: #ff6f44;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  letter-spacing: 0.8px;

  @media screen and (max-width: 1169px) {
    width: 88.33vw;
    margin: 0 auto 5px;
    font-size: 14px;
    letter-spacing: 0.58px;
  }
`;

const TitleLabel = ({ children, ...props }) => {
  return <Self {...props}>{children}</Self>;
};

export default TitleLabel;
