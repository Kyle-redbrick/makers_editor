import React from "react";
import styled from "@emotion/styled";
import Container from "../Components/Container";

import LectureItem from "../Components/LectureItem";

const Self = styled.div`
  width: 100%;
  padding-bottom: 19.5px;

  @media screen and (max-width: 1169px) { 
    width: 88.33vw;
    margin: 19.5px auto 0;
  }
`;

const Lectures = ({ items, projects, curriculum, ...props }) => {
  return (
    <Self {...props}>
      <Container>
        {projects && projects.map((project)=> (
          <LectureItem key={project.id} project={project}/>
        ))}
      </Container>
    </Self>
  );
};

export default Lectures;
