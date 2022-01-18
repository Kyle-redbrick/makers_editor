import React from "react";

import Layout from "../../Common/Component/Layout";
import Container from "./Components/Container";

import Intro from "./Sections/Intro";
import Course from "./Sections/Course";

const View = props => {  
  return (
    <Layout>
      <Container>
        <Intro />
        {props.courses.map(course => (
          <Course key={course.id} item={course} />
        ))}
      </Container>
    </Layout>
  );
}

export default View;