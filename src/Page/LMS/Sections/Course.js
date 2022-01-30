import React, { memo, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";

// import Button from "../Components/Button";
import Title from "../Components/Title";

// import { COLOR } from "./../Constants";

import { IMAGE } from "./../Constants/Images";

import { getMyCourseSummary } from "../api";
import { Course, Lecture/*, Project*/ } from "../../../models";

import LectureComponent from "./../Components/Lecture";

const PROJECT_LEVEL_ELEMENTARY = "basic";
// const PROJECT_LEVEL_BASIC = "basic";
// const PROJECT_LEVEL_ADVANCED = "advenced";
// const PROJECT_LEVEL_ADVANCED_JS = "advenced";
// const PROJECT_LEVEL_MASTERTY = "masterty";


const PROJECT_LEVELS = [
  {
    grade: 1,
    level: PROJECT_LEVEL_ELEMENTARY,
    title: "초보자 프로젝트",
  },
  // {
  //   grade: 2,
  //   level: PROJECT_LEVEL_BASIC,
  //   title: "숙련자 프로젝트",
  // },
  // {
  //   grade: 3,
  //   level: PROJECT_LEVEL_ADVANCED,
  //   title: "전문가 프로젝트",
  // },
];

const initLevels = () => {
  const _levels = new Map();
  _levels.set(PROJECT_LEVEL_ELEMENTARY, []);
  // _levels.set(PROJECT_LEVEL_BASIC, []);
  // _levels.set(PROJECT_LEVEL_ADVANCED, []);
  // _levels.set(PROJECT_LEVEL_ADVANCED_JS, []);
  // _levels.set(PROJECT_LEVEL_MASTERTY, []);
  return _levels;
};

const Self = styled.div`
  flex: 1;
  padding-bottom: 100px;

  @media screen and (max-width: 1169px){
    width: 88.33vw;
    margin: 0 auto;
    padding-bottom: 50px;
  }
`;

const TitleIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${(props) =>
    props.type === "javascript" &&
    `
      background-image: url(${IMAGE.ICON_JS});
  `}

  ${(props) =>
    props.type === "python" &&
    `
      background-image: url(${IMAGE.ICON_PYTHON});
  `}

  ${(props) =>
    props.type === "oobc" &&
    `
      background-image: url(${IMAGE.ICON_PUZZLE});
  `}

  @media screen and (max-width: 1169px){
    display: none;
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

const CourseInfo = styled.div`
  padding-bottom: 19.5px;
`;

// const CourseInfoTitle = styled.div`
//   font-size: 16px;
//   line-height: 1.56;
//   color: #fff;

//   @media screen and (max-width: 1169px){
//     margin-bottom: 10px;
//   }
// `;

const CourseInfoDesc = styled.div`
  font-size: 16px;
  line-height: 1.56;
  color: rgba(255, 255, 255, 0.5);
  word-wrap: break-word;
  white-space: pre-wrap;
`;

const ProjectWrap = styled.div`
  border-top: solid 1px rgba(255, 255, 255, 0.2);
  padding-top: 17.5px;
  padding-bottom: 39.5px;
`;

const ProjectGrade = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  margin-bottom: 30px;
`;

const Star = styled.div`
  height: 23px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 10px;

  ${(props) =>
    props.grade === 1 &&
    `
      width: 24px;
      background-image: url(${IMAGE.ICON_STAR_1});
  `}

  ${(props) =>
    props.grade === 2 &&
    `
      width: 52px;
      background-image: url(${IMAGE.ICON_STAR_2});
  `}

  ${(props) =>
    props.grade === 3 &&
    `
      width: 80px;
      background-image: url(${IMAGE.ICON_STAR_3});
  `}
`;

const ProjectCardsWrap = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const ProjectComponent = memo(({ grade, lectures = [], title }) => {
  return (
    <ProjectWrap>
      <ProjectGrade>
        {/* <Star grade={grade} />
        {title} */}
      </ProjectGrade>

      <ProjectCardsWrap>
        {lectures.map((lecture, index) => (
          <LectureComponent lecture={lecture} key={index} />
        ))}
      </ProjectCardsWrap>
    </ProjectWrap>
  );
});

const CoursePage = ({ courseId, email, ...props }) => {
  const [course, setCourse] = useState({});
  // const [lectures, setLectures] = useState([]);
  const [levels, setLevels] = useState(initLevels());

  useEffect(
    () => {
      init();
    },
    [courseId, email]
  );

  const init = async () => {
    const _levels = initLevels();
    const course = await getMyCourseSummary({ courseId, email });
    course.lectures.forEach((lecture) => {
      const _lectures = _levels.get(lecture.level);
      _lectures.push(new Lecture(lecture));
      _levels.set(lecture.level, _lectures);
    });

    setLevels(_levels);
    // setLectures(_lectures);
    setCourse(new Course(course));
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
        <TitleIcon type={course.type} />
        <TitleText>{course.title}</TitleText>
        <TitleProgressWrap>
          <TitleProgressPercent>
            {course.progress}%
          </TitleProgressPercent>
          <TitleProgressBackground>
            <TitleProgress>
              <TitleProgressBar value={course.progress} />
            </TitleProgress>
          </TitleProgressBackground>
        </TitleProgressWrap>
      </Title>

      <CourseInfo>
        {/* <CourseInfoTitle>블럭코딩을 활용한 앱 크리에이터 주니어 과정</CourseInfoTitle> */}
        <CourseInfoDesc>
          {course.introduction}
        </CourseInfoDesc>
      </CourseInfo>

      {PROJECT_LEVELS.map((PROJECT_LEVEL) => (
        <ProjectComponent
          key={PROJECT_LEVEL.grade}
          grade={PROJECT_LEVEL.grade}
          lectures={levels.get(PROJECT_LEVEL.level)}
          title={PROJECT_LEVEL.title}
        />
      ))}
    </Self>
  );
};

export default connect((state) => ({ email: state.userinfo.email }))(CoursePage);
