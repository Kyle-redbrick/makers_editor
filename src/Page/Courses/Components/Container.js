import React from "react";
import styled from "@emotion/styled";

const Self = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;

  @media screen and (max-width: 1169px){
    width: 88.33vw;
    max-width: unset;
  }
`;

const Container = ({ children, ...props }) => {
  return <Self {...props}>{children}</Self>;
};

export default Container;
