import React from "react";
import { injectIntl } from "react-intl";
import styled from "@emotion/styled";
import Container from "../Components/Container";

import { LearnNow } from "../../../Common/Component/Button/Learn";
import IMAGE from "./../Constants/Images";

const Self = styled.div`
  width: 100%;
`;

const Categories = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.11;
  color: rgba(255, 255, 255, 0.5);

  @media screen and (max-width: 1169px) {
    font-size: 14px;
    line-height: 1.29;
    margin-bottom: 20px;
    text-align: center;

    ${(props) => props.fixed && 
    `
    display: none;
    ` 
    }
  }
`;

const Desc = styled.div`
  border-top: solid 1px rgba(255, 255, 255, 0.2);
  font-size: 16px;
  line-height: 1.56;
  color: #fff;
  padding: 19.5px 0;

  @media screen and (max-width: 1169px) { 
    width: 88.33vw;
    margin: 0 auto;
  }
`;

const Icon = styled.div`
  width: 83px;
  height: 83px;
  margin-right: 17px;
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

  @media screen and (max-width: 1169px) {
    position: absolute;
    top: -30px;
    width: 60px;
    height: 60px;
    margin-right: 0;

    ${(props) => props.fixed && 
    `
    position: relative;
    top: 0;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    `
    }
  }
`;

const Image = styled.div`
  position: relative;
  width: 100%;
  max-width: 1334px;
  height: 330px;
  margin: 0 auto;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;

  @media screen and (max-width: 1169px) {
    width: auto;
    height: 56.11vw;
  }
`;

const ImageBlurLeft = styled.div`
  position: absolute;
  left: 0;
  width: 82px;
  height: 330px;
  background-image: linear-gradient(to right, #000000, rgba(0, 0, 0, 0));
`

const ImageBlurRight = styled.div`
  position: absolute;
  right: 0;
  width: 82px;
  height: 330px;
  transform: rotate(-180deg);
  background-image: linear-gradient(to right, #000000, rgba(0, 0, 0, 0));
`

const IntroDesc = styled.div`
  ${(props) =>
    props.fixed &&
    `
    margin-top: 123px;
  `}
`;

const IntroHeader = styled.div`
  ${(props) =>
    props.fixed &&
    `
    position: fixed;
    width: 100%;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    z-index: 22;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    @media screen and (max-width: 1169px) {
      top: 0;
      padding: 0;
      border: none;
    }
  `}
`;

const Row = styled.div`
  display: flex;
  padding: 20px 0;
  align-items: center;

  @media screen and (max-width: 1169px) {
    position: relative;
    flex-direction: column;
    padding: 45px 0 20px;

    ${(props) => 
      props.fixed &&
      `
      height: 50px;
      padding: 0 21px;
      flex-direction: row;
      align-items: center;
      box-shadow: inset 0 -1px 0 0 rgba(255, 255, 255, 0.1);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      background-color: rgba(0, 0, 0, 0.8);
      `
    }
  }
`;

const Title = styled.h3`
  font-size: 30px;
  font-weight: bold;
  line-height: 1.33;
  color: #fff;
  margin-bottom: 3px;

  @media screen and (max-width: 1169px) {
    font-size: 22px;
    line-height: 1.09;
    margin-bottom: 5px;
    text-align: center;

    ${(props) => props.fixed && 
    `
    font-size: 13px;
    margin-bottom: 0;
    text-align: left;
    max-width: calc(100vw - 42px - 20px - 26.94vw - 10px);
    overflow-y: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    `
    }
  }
`;

const TitleWrap = styled.div`
  flex: 1;
`;

function getShortcutProject(lecture) {
  const projects = (lecture && lecture.projects) || [];

  for(let project of projects) {
    if(!project.myProject) {
      return project;
    }
    if(project.myProject.completedMissionNum < project.totalMissionNum) {
      return project;
    }
    if(!project.myProject.completedAt) {
      return project;
    }
  }

  return projects[0];
}

const Intro = ({ fixed, lecture, ...props }) => {
  const shortcutProject = getShortcutProject(lecture);
  return (
    <Self {...props}>
      <Image image={lecture.heroUrl}>
        <ImageBlurLeft />
        <ImageBlurRight />
      </Image>
      <IntroHeader fixed={fixed}>
        <Container>
          <Row fixed={fixed}>
            <Icon type={lecture.type} fixed={fixed}/>
            <TitleWrap>
              <Title fixed={fixed}>{lecture.title}</Title>
              <Categories fixed={fixed}>{lecture && lecture.course && `${lecture.course.title} | ${lecture.course.displayType} | ${props.intl.formatMessage({ id: "ID_PROJECT_TITLE" })} ${lecture.numberString}`}</Categories>
            </TitleWrap>
            {/* {shortcutProject && <LearnNow id={shortcutProject.id} fixed={fixed} lectureId={lecture.id} />} */}
          </Row>
        </Container>
      </IntroHeader>
      <IntroDesc fixed={fixed}>
        <Container>
          <Desc>{lecture.introduction}</Desc>
        </Container>
      </IntroDesc>
    </Self>
  );
};

export default injectIntl(Intro);
