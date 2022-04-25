import React, { memo, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import Title from "../Components/Title";
import { IMAGE } from "./../Constants/Images";
import { getLmsCourses } from "../api";
import LectureComponent from "./../Components/Lecture";


const Self = styled.div`
  flex: 1;
  padding-bottom: 100px;

  @media screen and (max-width: 1169px){
    width: 88.33vw;
    margin: 0 auto;
    padding-bottom: 50px;
  }
`;

const TitleText = styled.div`
  @media screen and (max-width: 1169px){
    display: none;
  }
`

const TitleProgressWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 1169px){
    justify-content: space-between;
  }
`;

const TitleProgressPercent = styled.div`
  font-size: 24px;
  line-height: 1;
  color: #fff;
  width: 80px;

  @media screen and (max-width: 1169px){
    margin-right: 21px;
    width: auto;
    max-width: 80px;
  }
`;

const TitleProgressBackground = styled.div`
  width: 400px;
  height: 40px;
  padding: 10px;
  border-radius: 16px;
  background-color: #1c1c1c;

  @media screen and (max-width: 1169px){
    width: calc(100% - 55px - 21px);
  }
`;

const TitleProgress = styled.div`
  width: 380px;
  height: 20px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.1);

  @media screen and (max-width: 1169px){
    width: 100%;
  }
`;

const TitleProgressBar = styled.div`
  width: ${(props) => props.value}%;
  height: 20px;
  border-radius: 6px;
  background-color: #ff7d3a;
`;

const ProjectCardsWrap = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const CoursePage = ({ email, ...props }) => {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(
    () => {
      init();
    },
    [email]
  );

  const init = async () => {
    const courses = await getLmsCourses();    
    console.log("course!!!!!!",courses)

    setProgress(courses.net_progress);
    setCourses(courses.list);
  };

  const onWindowFocus = useCallback(init, []);
  useEffect(() => {
    window.addEventListener("focus", onWindowFocus);
    return () => {
      window.removeEventListener("focus", onWindowFocus);
    }
  }, [onWindowFocus]);

  return (
    <Self {...props}>

      <Title styled={{ paddingTop: '4px' }}>
        <TitleText>{"Mission Progress"}</TitleText>
        <TitleProgressWrap>
          <TitleProgressPercent>
            {progress}%
          </TitleProgressPercent>
          <TitleProgressBackground>
            <TitleProgress>
              <TitleProgressBar value={progress} />
            </TitleProgress>
          </TitleProgressBackground>
        </TitleProgressWrap>
      </Title>

      {
        <ProjectCardsWrap>
          {courses.map((course, index) => (
            <LectureComponent course={course} key={index} />
          ))}
        </ProjectCardsWrap>
      }

    </Self>
  );
};

export default connect((state) => ({ email: state.userinfo.email }))(CoursePage);