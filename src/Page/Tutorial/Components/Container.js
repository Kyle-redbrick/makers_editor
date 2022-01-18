import React from "react";
import styled from "@emotion/styled";

const Self = styled.div`
  width: 100%;
  max-width: 770px;
  margin: 0 auto;
  padding-bottom: 60.5px;

  @media screen and (max-width: 1169px){
    max-width: unset;
    padding-bottom: 10px;
  }
`;

const Container = ({ children, ...props }) => {
  return <Self {...props}>{children}</Self>;
};

export default Container;
