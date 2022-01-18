import React from "react";
import styled from "@emotion/styled";

const Self = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 1;
  color: #fff;

  @media screen and (max-width: 1169px) {
    width: 88.33%;
    margin: 19.5px auto;
  }
`;

const Title = ({ children, ...props }) => {
  return <Self {...props}>{children}</Self>;
};

export default Title;
