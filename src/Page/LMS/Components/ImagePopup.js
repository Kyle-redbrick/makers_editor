import React from "react";
import styled from "@emotion/styled";

const Self = styled.div`
  position: relative;
  width: 889px;
  height: auto;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.5);
  background-color: #1c1c1c;
  border-radius: 16px;
`;

const Content = styled.div`
  padding: 30px 20px 40px;
  text-align: center;
`
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const ImagePopup = ({ value }) => {
  return (
    <Self>
      <Content>
        <Image src={value.toDreamclassS3URL()} alt={value} />
      </Content>
    </Self>
  );
};

export default ImagePopup;
