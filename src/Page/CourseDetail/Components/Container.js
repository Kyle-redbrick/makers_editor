import React from "react";
import styled from "@emotion/styled";

const Self = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
`;

const Container = ({ children, ...props }) => {
  return <Self {...props}>{children}</Self>;
};

export default Container;
